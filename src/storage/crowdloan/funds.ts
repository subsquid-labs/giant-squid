import { UnknownVersionError } from '../../common/errors'
import { CrowdloanFundsStorage } from '../../types/generated/storage'
import { BlockContext as StorageContext } from '../../types/generated/support'

interface StorageData {
    raised: bigint
    end: number
    cap: bigint
    firstPeriod: number
    lastPeriod: number
    fundIndex: number
}

async function getStorageData(
    ctx: StorageContext,
    paraIds: number[]
): Promise<(StorageData | undefined)[] | undefined> {
    const storage = new CrowdloanFundsStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV9110) {
        const data = await storage.asV9110.getMany(paraIds)

        return data.map(
            (fund) =>
                fund && {
                    fundIndex: fund.trieIndex,
                    ...fund,
                }
        )
    } else if (storage.isV9180) {
        const data = await storage.asV9180.getMany(paraIds)
        if (!data) return undefined
        return data
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export interface FundInfo {
    raised: bigint
    end: number
    cap: bigint
    firstPeriod: number
    lastPeriod: number
    fundIndex: number
}

export const funds = {
    async get(ctx: StorageContext, paraId: number) {
        return await this.getMany(ctx, [paraId]).then((data) => data?.[0])
    },
    async getMany(ctx: StorageContext, paraIds: number[]): Promise<(FundInfo | undefined)[] | undefined> {
        const data = await getStorageData(ctx, paraIds)
        if (!data) return undefined

        return data
    },
}
