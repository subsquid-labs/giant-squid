import { UnknownVersionError } from '../../common/errors'
import { StakingActiveEraStorage } from '../../types/generated/storage'
import { BlockContext } from '../../types/generated/support'

interface StorageData {
    index: number
    timestamp: bigint | undefined
}

async function getStorageData(ctx: BlockContext): Promise<StorageData | undefined> {
    const storage = new StakingActiveEraStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV0) {
        const data = await storage.getAsV0()
        if (!data) return undefined
        return {
            index: data.index,
            timestamp: data.start,
        }
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

const storageCache: {
    hash?: string
    value?: ActiveEra
} = {}

interface ActiveEra {
    index: number
    timestamp: number | undefined
}

export async function getActiveEra(ctx: BlockContext): Promise<ActiveEra | undefined> {
    if (storageCache.hash !== ctx.block.hash) {
        storageCache.hash = ctx.block.hash
        delete storageCache.value
    }

    if (!storageCache.value) {
        const data = await getStorageData(ctx)
        if (!data) return undefined

        storageCache.value = {
            index: data.index,
            timestamp: Number(data.timestamp),
        }
    }

    return storageCache.value
}
