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

async function getStakersData(ctx: StorageContext, keys: Uint8Array[]): Promise<StorageData[] | undefined> {
    const storage = new StakingStakersStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV1020) {
        return await storage.getManyAsV1020(keys)
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

async function getErasStakersData(
    ctx: StorageContext,
    keys: [era: number, account: Uint8Array][]
): Promise<StorageData[] | undefined> {
    const storage = new StakingErasStakersStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV1050) {
        return await storage.getManyAsV1050(keys)
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

interface EraStaker {
    total: bigint
    own: bigint
    nominators: { id: string; vote: bigint }[]
}

type ErasStakersArgs = [account: string, era?: number]

export const erasStakers = {
    get: async (ctx: StorageContext, ...args: ErasStakersArgs): Promise<EraStaker | undefined> => {
        const [account, era] = args

        const decodedAccount = decodeId(account, config.prefix)
        if (!decodedAccount) return undefined

        const data = ((await getErasStakersData(ctx, [[era || 0, decodedAccount]])) ||
            (await getStakersData(ctx, [decodedAccount])))?.[0]
        if (!data) return undefined

        return {
            total: data.total,
            own: data.own,
            nominators: data.others.map((nominator) => {
                return {
                    id: encodeId(nominator.who, config.prefix),
                    vote: nominator.value,
                }
            }),
        }
    },
    getMany: async (ctx: StorageContext, keys: ErasStakersArgs[]) => {
        const eraStakers: [number, Uint8Array][] = keys.map((k) => [k[1] || 0, decodeId(k[0], config.prefix)])
        const stakers: Uint8Array[] = keys.map((k) => decodeId(k[0], config.prefix))

        const data = (await getErasStakersData(ctx, eraStakers)) || (await getStakersData(ctx, stakers))
        if (!data) return undefined

        return data.map((v) => ({
            total: v.total,
            own: v.own,
            nominators: v.others.map((n) => ({
                id: encodeId(n.who, config.prefix),
                vote: n.value,
            })),
        }))
    },
}
