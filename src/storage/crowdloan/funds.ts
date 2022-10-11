import { UnknownVersionError } from '../../common/errors'
import { CrowdloanFundsStorage } from '../../types/kusama/storage'
import { BlockContext as StorageContext } from '../../types/kusama/support'

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

    if (storage.isV9010) {
        const data = await storage.getManyAsV9010(paraIds)

        return data.map(
            (fund) =>
                fund && {
                    fundIndex: fund.trieIndex,
                    ...fund,
                }
        )
    } else if (storage.isV9111) {
        const data = await storage.getManyAsV9111(paraIds)
        if (!data) return undefined
        return data.map(
            (fund) =>
                fund && {
                    fundIndex: fund.trieIndex,
                    ...fund,
                }
        )
    } else if (storage.isV9180) {
        return storage.getManyAsV9180(paraIds)
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
    async getAll(ctx: StorageContext): Promise<FundInfo[] | undefined> {
        const storage = new CrowdloanFundsStorage(ctx)
        if (!storage.isExists) return undefined

        if (storage.isV9010) {
            const data = await storage.getAllAsV9010()

            return data.map(
                (fund) =>
                    fund && {
                        fundIndex: fund.trieIndex,
                        ...fund,
                    }
            )
        } else if (storage.isV9111) {
            const data = await storage.getAllAsV9111()
            if (!data) return undefined
            return data.map(
                (fund) =>
                    fund && {
                        fundIndex: fund.trieIndex,
                        ...fund,
                    }
            )
        } else if (storage.isV9180) {
            return storage.getAllAsV9180()
        } else {
            throw new UnknownVersionError(storage.constructor.name)
        }
    },
}
