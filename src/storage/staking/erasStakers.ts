import { UnknownVersionError } from '../../common/errors'
import { decodeId, encodeId } from '../../common/helpers'
import config from '../../config'
import { StakingErasStakersStorage, StakingStakersStorage } from '../../types/generated/storage'
import { StorageContext } from '../../types/generated/support'

interface StorageData {
    total: bigint
    own: bigint
    others: { who: Uint8Array; value: bigint }[]
}

async function getStakersData(ctx: StorageContext, account: Uint8Array): Promise<StorageData | undefined> {
    const storage = new StakingStakersStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV1020) {
        return await storage.getAsV1020(account)
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

async function getErasStakersData(
    ctx: StorageContext,
    account: Uint8Array,
    era: number
): Promise<StorageData | undefined> {
    const storage = new StakingErasStakersStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV1050) {
        return await storage.getAsV1050(era, account)
    } else if (storage.isV9111) {
        return await storage.getAsV9111([era, account])
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

const storageCache: {
    hash?: string
    value: Map<string, CurrentEra>
} = {
    value: new Map(),
}

interface CurrentEra {
    total: bigint
    own: bigint
    nominators: { id: string; vote: bigint }[]
}

export async function getErasStakers(
    ctx: StorageContext,
    account: string,
    era: number
): Promise<CurrentEra | undefined> {
    if (storageCache.hash !== ctx.block.hash) {
        storageCache.hash = ctx.block.hash
        storageCache.value.clear()
    }

    const key = account

    if (!storageCache.value.has(key)) {
        const decodedAccount = decodeId(account, config.prefix)
        if (!decodedAccount) return undefined

        const data = (await getErasStakersData(ctx, decodedAccount, era)) || (await getStakersData(ctx, decodedAccount))
        if (!data) return undefined

        storageCache.value.set(key, {
            total: data.total,
            own: data.own,
            nominators: data.others.map((nominator) => {
                return {
                    id: encodeId(nominator.who, config.prefix),
                    vote: nominator.value,
                }
            }),
        })
    }

    return storageCache.value.get(key)
}
