import { UnknownVersionError } from '../../common/errors'
import { decodeId, encodeId } from '../../common/helpers'
import config from '../../config'
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
        const u8 = decodeId(account, config.prefix)
        if (!u8) return undefined

        const data = await getStorageData(ctx, [u8])
        if (!data || !data[0]) return undefined

        return {
            stash: encodeId(data[0].stash, config.prefix),
            active: data[0].active,
        }
    },
    getMany: async (ctx: StorageContext, accounts: string[]) => {
        const u8s = accounts.map((a) => decodeId(a, config.prefix))

        const data = await getStorageData(ctx, u8s)
        if (!data) return undefined

        return data.map((d) => (d ? { stash: encodeId(d.stash, config.prefix), active: d.active } : undefined))
    },
}
