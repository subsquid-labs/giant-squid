import { UnknownVersionError } from '../../common/errors'
import { decodeId, encodeId, isStorageCorrupted } from '../../common/tools'
import { CommonHandlerContext } from '../../mappings/types/contexts'
import { StakingLedgerStorage } from '../../types/generated/storage'
import { BlockContext as StorageContext } from '../../types/generated/support'

interface StorageData {
    stash: string
    active: bigint
}

async function getStorageData(
    ctx: StorageContext,
    accounts: string[]
): Promise<(StorageData | undefined)[] | undefined> {
    const storage = new StakingLedgerStorage(ctx)
    if (!storage.isExists) return undefined

    const u8s = accounts.map((a) => decodeId(a))

    try {
        if (storage.isV1020) {
            return await storage.asV1020
                .getMany(u8s)
                .then((data) =>
                    data.map((ledger) => ledger && { active: ledger.active, stash: encodeId(ledger.stash) })
                )
        } else if (storage.isV1050) {
            return await storage.asV1050
                .getMany(u8s)
                .then((data) =>
                    data.map((ledger) => ledger && { active: ledger.active, stash: encodeId(ledger.stash) })
                )
        } else if (storage.isV1058) {
            return await storage.asV1058
                .getMany(u8s)
                .then((data) =>
                    data.map((ledger) => ledger && { active: ledger.active, stash: encodeId(ledger.stash) })
                )
        } else {
            throw new UnknownVersionError(storage.constructor.name)
        }
    } catch (e) {
        if (isStorageCorrupted(ctx as CommonHandlerContext)) {
            console.log(e)
            return undefined
        } else {
            throw e
        }
    }
}

export interface Ledger {
    stash: string
    active: bigint
}

export const ledger = {
    async get(ctx: StorageContext, controllerId: string): Promise<Ledger | undefined> {
        return await this.getMany(ctx, [controllerId]).then((data) => data?.[0])
    },
    async getMany(ctx: StorageContext, controllerIds: string[]): Promise<(Ledger | undefined)[] | undefined> {
        const data = await getStorageData(ctx, controllerIds)
        if (!data) return undefined

        return data
    },
}
