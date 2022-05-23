import { UnknownVersionError } from '../../common/errors'
import { decodeId, encodeId } from '../../common/helpers'
import { LedgerData } from '../../types/custom/stakingData'
import { StakingLedgerStorage } from '../../types/generated/storage'
import { StorageContext } from '../../types/generated/support'

async function getStorageData(
    ctx: StorageContext,
    account: Uint8Array[]
): Promise<(LedgerData | undefined)[] | undefined> {
    const storage = new StakingLedgerStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV1020) {
        return await storage.getManyAsV1020(account)
    } else if (storage.isV1050) {
        return await storage.getManyAsV1050(account)
    } else if (storage.isV1058) {
        return await storage.getManyAsV1058(account)
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export const ledger = {
    get: async (ctx: StorageContext, account: string) => {
        const u8 = decodeId(account)
        if (!u8) return undefined

        const data = await getStorageData(ctx, [u8])
        if (!data || !data[0]) return undefined

        return {
            stash: encodeId(data[0].stash),
            active: data[0].active,
        }
    },
    getMany: async (ctx: StorageContext, accounts: string[]) => {
        if (accounts.length === 0) return []

        const u8s = accounts.map((a) => decodeId(a))

        const data = await getStorageData(ctx, u8s)
        if (!data) return undefined

        return data.map((d) => (d ? { stash: encodeId(d.stash), active: d.active } : undefined))
    },
}
