import { decodeID } from '../../../common/helpers'
import config from '../../../config'
import { DappsStakingLedgerStorage } from '../../../types/generated/storage'
import { StorageContext } from '../../../types/generated/support'

async function getStorageData(ctx: StorageContext, account: Uint8Array): Promise<bigint | undefined> {
    const storage = new DappsStakingLedgerStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV4) {
        return await storage.getAsV4(account)
    } else if (storage.isV12) {
        return (await storage.getAsV12(account)).locked

    }
    return undefined
}

const storageCache: {
    hash?: string
    values: Record<string, bigint | undefined>
} = {
    values: {},
}

export async function getLedger(ctx: StorageContext, account: string): Promise<bigint | undefined> {
    if (storageCache.hash !== ctx.block.hash) {
        storageCache.hash = ctx.block.hash
        storageCache.values = {}
    }

    if (!storageCache.values[account]) {
        const u8 = decodeID(account, config.prefix)
        if (!u8) return undefined

        const data = await getStorageData(ctx, u8)

        storageCache.values[account] = data
    }

    return storageCache.values[account]
}
