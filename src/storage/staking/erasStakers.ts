import { UnknownVersionError } from '../../common/errors'
import { decodeId, encodeId } from '../../common/tools'
import { StakingErasStakersStorage, StakingStakersStorage } from '../../types/generated/storage'
import { StorageContext } from '../../types/generated/support'

interface StorageData {
    total: bigint
    own: bigint
    others: { who: Uint8Array; value: bigint }[]
}

async function getErasStakersData(
    ctx: StorageContext,
    keys: [era: number, account: Uint8Array][]
): Promise<StorageData[] | undefined> {
    const storage = new StakingErasStakersStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV0) {
        return await storage.getManyAsV0(keys)
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

        const decodedAccount = decodeId(account)
        if (!decodedAccount) return undefined

        const data = (await getErasStakersData(ctx, [[era || 0, decodedAccount]]))?.[0]
        if (!data) return undefined

        return {
            total: data.total,
            own: data.own,
            nominators: data.others.map((nominator) => {
                return {
                    id: encodeId(nominator.who),
                    vote: nominator.value,
                }
            }),
        }
    },
    getMany: async (ctx: StorageContext, keys: ErasStakersArgs[]) => {
        if (keys.length === 0) return []

        const eraStakers: [number, Uint8Array][] = keys.map((k) => [k[1] || 0, decodeId(k[0])])

        const data = await getErasStakersData(ctx, eraStakers)
        if (!data) return undefined

        return data.map((v) => ({
            total: v.total,
            own: v.own,
            nominators: v.others.map((n) => ({
                id: encodeId(n.who),
                vote: n.value,
            })),
        }))
    },
}
