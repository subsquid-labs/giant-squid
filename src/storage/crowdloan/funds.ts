import { UnknownVersionError } from '../../common/errors'
import { CrowdloanFundsStorage } from '../../types/generated/storage'
import { StorageContext } from '../../types/generated/support'

async function getStorageData(ctx: StorageContext, paraId: number): Promise<FundInfo | undefined> {
    const storage = new CrowdloanFundsStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV9010) {
        return await storage.getAsV9010(paraId)
    } else if (storage.isV9111) {
        return await storage.getAsV9111(paraId)
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

const storageCache: {
    hash?: string
    values: Map<string, FundInfo>
} = {
    values: new Map(),
}

export interface FundInfo {
    raised: bigint
    end: number
    cap: bigint
    firstPeriod: number
    lastPeriod: number
    trieIndex: number
}

export async function getFunds(ctx: StorageContext, paraId: number): Promise<FundInfo | undefined> {
    if (storageCache.hash !== ctx.block.hash) {
        storageCache.hash = ctx.block.hash
        storageCache.values.clear()
    }

    const key = paraId.toString()
    let value = storageCache.values.get(key)

    if (!value) {
        const data = await getStorageData(ctx, paraId)
        if (!data) return undefined

        value = data
        storageCache.values.set(key, value)
    }

    return value
}
