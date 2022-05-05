import { decodeId, encodeId } from '../../common/helpers'
import config from '../../config'
import { StakingBondedStorage } from '../../types/generated/storage'
import { StorageContext } from '../../types/generated/support'

async function getStorageData(ctx: StorageContext, account: Uint8Array): Promise<Uint8Array | undefined> {
    const storage = new StakingBondedStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV1020) {
        return await storage.getAsV1020(account)
    }

    return undefined
}

const storageCache: {
    hash?: string
    values: Record<string, string | undefined>
} = {
    values: {},
}

export async function getBonded(ctx: StorageContext, account: string): Promise<string | undefined> {
    if (storageCache.hash !== ctx.block.hash) {
        storageCache.hash = ctx.block.hash
        storageCache.values = {}
    }

    if (!storageCache.values[account]) {
        const u8 = decodeId(account, config.prefix)
        if (!u8) return undefined

        const data = await getStorageData(ctx, u8)
        if (!data) return undefined

        storageCache.values[account] = encodeId(data, config.prefix) || undefined
    }

    return storageCache.values[account]
}
