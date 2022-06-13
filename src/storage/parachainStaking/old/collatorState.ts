import { UnknownVersionError } from '../../../common/errors'
import { decodeId, encodeId } from '../../../common/tools'
import { ParachainStakingCollatorState2Storage } from '../../../types/generated/storage'
import { StorageContext } from '../../../types/generated/support'

interface StorageData {
    bond: bigint
    topNominators: {
        owner: Uint8Array
        amount: bigint
    }[]
    bottomNominators: {
        owner: Uint8Array
        amount: bigint
    }[]
}

async function getStorageData(ctx: StorageContext, account: Uint8Array): Promise<StorageData | undefined> {
    const storage = new ParachainStakingCollatorState2Storage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV900) {
        return await storage.getAsV900(account)
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

const storageCache: {
    hash?: string
    values: Map<string, CollatorState>
} = {
    values: new Map(),
}

interface CollatorState {
    id: string
    bond: bigint
    topNominators: {
        id: string
        amount: bigint
    }[]
    bottomNominators: {
        id: string
        amount: bigint
    }[]
}

export async function getCollatorState(ctx: StorageContext, account: string): Promise<CollatorState | undefined> {
    if (storageCache.hash !== ctx.block.hash) {
        storageCache.hash = ctx.block.hash
        storageCache.values.clear()
    }

    const key = account
    let value = storageCache.values.get(account)

    if (!value) {
        const u8 = decodeId(account)

        const data = await getStorageData(ctx, u8)
        if (!data) return undefined

        value = {
            id: account,
            bond: data.bond,
            topNominators: data.topNominators.map((delegation) => ({
                id: encodeId(delegation.owner),
                amount: delegation.amount,
            })),
            bottomNominators: data.bottomNominators.map((delegation) => ({
                id: encodeId(delegation.owner),
                amount: delegation.amount,
            })),
        }

        storageCache.values.set(key, value)
    }

    return value
}
