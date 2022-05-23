import { UnknownVersionError } from '../../common/errors'
import { decodeId, encodeId } from '../../common/helpers'
import config from '../../config'
import { StakingErasStakersStorage } from '../../types/generated/storage'
import { StorageContext } from '../../types/generated/support'

interface StorageData {
    total: bigint
    own: bigint
    others: { who: Uint8Array; value: bigint }[]
}

async function getErasStakersData(
    ctx: StorageContext,
    account: Uint8Array,
    era: number
): Promise<StorageData | undefined> {
    const storage = new StakingErasStakersStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV0) {
        return await storage.getAsV0(era, account)
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

const storageCache: {
    hash?: string
    values: Map<string, CurrentEra>
} = {
    values: new Map(),
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
        storageCache.values.clear()
    }

    const key = `${era}-${account}`
    let value = storageCache.values.get(key)

    if (!value) {
        const decodedAccount = decodeId(account, config.prefix)
        if (!decodedAccount) return undefined

        const data = await getErasStakersData(ctx, decodedAccount, era)
        if (!data) return undefined

        value = {
            total: data.total,
            own: data.own,
            nominators: data.others.map((nominator) => {
                return {
                    id: encodeId(nominator.who, config.prefix),
                    vote: nominator.value,
                }
            }),
        }

        storageCache.values.set(key, value)
    }

    return value
}
