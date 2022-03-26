import { decodeID, encodeID } from '../../../common/helpers'
import config from '../../../config'
import { Payee, PayeeType } from '../../../types/custom/stakingData'
import { StakingPayeeStorage } from '../../../types/generated/storage'
import { StorageContext } from '../../../types/generated/support'

async function getStorageData(
    ctx: StorageContext,
    account: Uint8Array
): Promise<{ payee: string; account: Uint8Array | null } | undefined> {
    const storage = new StakingPayeeStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV13) {
        const { __kind, value } = await storage.getAsV13(account)
        return {
            payee: __kind,
            account: value,
        }
    }

    return undefined
}

const storageCache: {
    hash?: string
    values: Record<string, Payee | undefined>
} = {
    values: {},
}

export async function getPayee(ctx: StorageContext, account: string): Promise<Payee | undefined> {
    if (storageCache.hash !== ctx.block.hash) {
        storageCache.hash = ctx.block.hash
        storageCache.values = {}
    }

    if (!storageCache.values[account]) {
        const u8 = decodeID(account, config.prefix)
        if (!u8) return undefined

        const data = await getStorageData(ctx, u8)
        if (!data) return undefined

        storageCache.values[account] = {
            payee: data.payee as PayeeType,
            account: data.account ? encodeID(data.account, config.prefix) : null,
        }
    }

    return storageCache.values[account]
}
