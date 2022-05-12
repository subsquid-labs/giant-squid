import { UnknownVersionError } from '../../../common/errors'
import { decodeId, encodeId } from '../../../common/helpers'
import {
    ParachainStakingNominatorState2Storage,
    ParachainStakingNominatorStateStorage,
} from '../../../types/generated/storage'
import { StorageContext } from '../../../types/generated/support'

interface StorageData {
    nominations: {
        owner: Uint8Array
        amount: bigint
    }[]
    total: bigint
}

async function getOldStorageData(ctx: StorageContext, account: Uint8Array): Promise<StorageData | undefined> {
    const storage = new ParachainStakingNominatorStateStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV49) {
        return await storage.getAsV49(account)
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

async function getStorageData(ctx: StorageContext, account: Uint8Array): Promise<StorageData | undefined> {
    const storage = new ParachainStakingNominatorState2Storage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV900) {
        return await storage.getAsV900(account)
    } else if (storage.isV200) {
        return await storage.getAsV200(account)
    } else if (storage.isV1001) {
        const data = await storage.getAsV1001(account)
        if (!data) return

        return {
            ...data,
            nominations: data.delegations,
        }
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

const storageCache: {
    hash?: string
    values: Map<string, NominatorState>
} = {
    values: new Map(),
}

interface NominatorState {
    id: string
    bond: bigint
    nominations: {
        id: string
        amount: bigint
    }[]
}

export async function getNominatorState(ctx: StorageContext, account: string): Promise<NominatorState | undefined> {
    if (storageCache.hash !== ctx.block.hash) {
        storageCache.hash = ctx.block.hash
        storageCache.values.clear()
    }

    const key = account
    let value = storageCache.values.get(account)

    if (!value) {
        const u8 = decodeId(account)

        const data = (await getStorageData(ctx, u8)) || (await getOldStorageData(ctx, u8))
        if (!data) return undefined

        value = {
            id: account,
            bond: data.total,
            nominations: data.nominations.map((delegation) => ({
                id: encodeId(delegation.owner),
                amount: delegation.amount,
            })),
        }

        storageCache.values.set(key, value)
    }

    return value
}
