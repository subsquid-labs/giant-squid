import { UnknownVersionError } from '../../common/errors'
import { CrowdloanFundsStorage } from '../../types/generated/storage'
import { BlockContext } from '../../types/generated/support'

async function getStorageData(ctx: BlockContext, paraId: number): Promise<FundInfo | undefined> {
    const storage = new CrowdloanFundsStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV9110) {
        return await storage.getAsV9110(paraId)
    } else if (storage.isV9180) {
        const data = await storage.getAsV9180(paraId)
        if (!data) return undefined
        return {
            ...data,
            trieIndex: data.fundIndex,
        }
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

export async function getFunds(ctx: BlockContext, paraId: number): Promise<FundInfo | undefined> {
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
