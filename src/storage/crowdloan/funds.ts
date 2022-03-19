import { EventHandlerContext } from '@subsquid/substrate-processor'
import { FundInfo } from '../../types/custom/crowdloanData'
import { CrowdloanFundsStorage } from '../../types/generated/storage'

async function getStorageData(ctx: EventHandlerContext, paraId: number): Promise<FundInfo | undefined> {
    const storage = new CrowdloanFundsStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV9110) {
        return await storage.getAsV9110(paraId)
    }

    return undefined
}

const storageCache: {
    hash?: string
    value?: FundInfo
} = {}

export async function getFunds(ctx: EventHandlerContext, paraId: number): Promise<FundInfo | undefined> {
    if (ctx.block.hash === storageCache.hash) return storageCache.value

    return await getStorageData(ctx, paraId)
}
