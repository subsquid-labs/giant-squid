import { FundInfo } from '../../../types/custom/crowdloanData'
import { CrowdloanFundsStorage } from '../../../types/generated/storage'
import { StorageContext } from '../../../types/generated/support'

async function getStorageData(ctx: StorageContext, paraId: number): Promise<FundInfo | undefined> {
    const storage = new CrowdloanFundsStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV9110) {
        return await storage.getAsV9110(paraId)
    }

    return undefined
}

const storageCache: {
    hash?: string
    values: Record<number, FundInfo | undefined>
} = {
    values: {},
}

export async function getFunds(ctx: StorageContext, paraId: number): Promise<FundInfo | undefined> {
    if (storageCache.hash !== ctx.block.hash) {
        storageCache.hash = ctx.block.hash
        storageCache.values = {}
    }

    if (!storageCache.values[paraId]) {
        storageCache.values[paraId] = await getStorageData(ctx, paraId)
    }

    return storageCache.values[paraId]
}
