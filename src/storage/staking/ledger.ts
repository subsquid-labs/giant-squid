import { UnknownVersionError } from '../../common/errors'
import { decodeId } from '../../common/helpers'
import { DappsStakingLedgerStorage } from '../../types/generated/storage'
import { StorageContext } from '../../types/generated/support'

interface StorageData {
    staked: bigint
}

async function getStorageData(
    ctx: StorageContext,
    account: Uint8Array[]
): Promise<(StorageData | undefined)[] | undefined> {
    const storage = new DappsStakingLedgerStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV4) {
        const data = await storage.getManyAsV4(account)
        if (!data) return undefined

        return data.map((d) => ({
            staked: d,
        }))
    } else if (storage.isV12) {
        const data = await storage.getManyAsV12(account)
        if (!data) return undefined

        return data.map((d) => ({
            staked: d.locked,
        }))
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export interface Ledger {
    staked: bigint
}

export const ledger = {
    get: async (ctx: StorageContext, account: string): Promise<Ledger | undefined> => {
        const u8 = decodeId(account)
        if (!u8) return undefined

        const data = await getStorageData(ctx, [u8])
        if (!data || !data[0]) return undefined

        return data[0]
    },
    getMany: async (ctx: StorageContext, accounts: string[]): Promise<(Ledger | undefined)[] | undefined> => {
        if (accounts.length === 0) return []

        const u8s = accounts.map((a) => decodeId(a))

        const data = await getStorageData(ctx, u8s)
        if (!data) return undefined

        return data
    },
}
