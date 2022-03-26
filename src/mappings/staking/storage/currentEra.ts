import { StakingCurrentEraStorage } from '../../../types/generated/storage'
import { StorageContext } from '../../../types/generated/support'

async function getStorageData(ctx: StorageContext): Promise<number | undefined> {
    const storage = new StakingCurrentEraStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV0) {
        return await storage.getAsV0()
    }

    return undefined
}

const storageCache: {
    hash?: string
    value?: number
} = {}

export async function getCurrentEra(ctx: StorageContext): Promise<number | undefined> {
    if (storageCache.hash !== ctx.block.hash) {
        storageCache.hash = ctx.block.hash
    }

    if (!storageCache.value) {
        storageCache.value = await getStorageData(ctx)
    }

    return storageCache.value
}
