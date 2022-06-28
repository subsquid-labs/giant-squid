import { UnknownVersionError } from '../../common/errors'
import { decodeId, encodeId } from '../../common/tools'
import { CommonHandlerContext } from '../../mappings/types/contexts'
import { StakingLedgerStorage } from '../../types/generated/storage'
import { BlockContext } from '../../types/generated/support'

interface StorageData {
    stash: Uint8Array
    total: bigint
    active: bigint
}

async function getStorageData(
    ctx: BlockContext,
    accounts: Uint8Array[]
): Promise<(StorageData | undefined)[] | undefined> {
    const storage = new StakingLedgerStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV13) {
        return await storage.getManyAsV13(accounts)
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export interface Ledger {
    stash: string
    active: bigint
}

export const ledger = {
    get: async (ctx: BlockContext, account: string): Promise<Ledger | undefined> => {
        const u8 = decodeId(account)
        if (!u8) return undefined

        const data = await getStorageData(ctx, [u8])
        if (!data || !data[0]) return undefined

        return {
            stash: encodeId(data[0].stash),
            active: data[0].active,
        }
    },
    getMany: async (ctx: BlockContext, accounts: string[]): Promise<(Ledger | undefined)[] | undefined> => {
        if (accounts.length === 0) return []

        const u8s = accounts.map((a) => decodeId(a))

        const data = await getStorageData(ctx, u8s)
        if (!data) return undefined

        return data.map((d) => (d ? { stash: encodeId(d.stash), active: d.active } : undefined))
    },
}
