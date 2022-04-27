import { decodeID, encodeID } from '../../common/helpers'
import config from '../../config'
import { Ledger, LedgerData } from '../../types/custom/stakingData'
import { StakingLedgerStorage } from '../../types/generated/storage'
import { StorageContext } from '../../types/generated/support'

async function getStorageData(ctx: StorageContext, account: Uint8Array): Promise<LedgerData | undefined> {
    const storage = new StakingLedgerStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV1020) {
        return await storage.getAsV1020(account)
    } else if (storage.isV1050) {
        return await storage.getAsV1050(account)
    } else if (storage.isV1058) {
        return await storage.getAsV1058(account)
    }

    return undefined
}

const storageCache: {
    hash?: string
    values: Record<string, Ledger | undefined>
} = {
    values: {},
}

export async function getLedger(ctx: StorageContext, account: string): Promise<Ledger | undefined> {
    if (storageCache.hash !== ctx.block.hash) {
        storageCache.hash = ctx.block.hash
        storageCache.values = {}
    }

    if (!storageCache.values[account]) {
        const u8 = decodeID(account, config.prefix)
        if (!u8) return undefined

        const data = await getStorageData(ctx, u8)
        if (!data) return undefined

        const stash = encodeID(data.stash, config.prefix)
        if (!stash) return undefined

        storageCache.values[account] = {
            stash,
            active: data.active,
        }
    }

    return storageCache.values[account]
}
