import { StakingPayeeStorage } from '../../types/generated/storage'
import { BlockContext as StorageContext } from '../../types/generated/support'
import { UnknownVersionError } from '../../common/errors'
import { decodeId, encodeId } from '../../common/tools'

export interface StorageData {
    dest: 'Account' | 'Staked' | 'Stash' | 'Controller' | 'None'
    accountId?: string
}

async function getStorageData(ctx: StorageContext, ids: string[]): Promise<StorageData[] | undefined> {
    const storage = new StakingPayeeStorage(ctx)
    if (!storage.isExists) return undefined

    const normalizedIds = ids.map((id) => decodeId(id))
    if (storage.isV1020) {
        return await storage.asV1020.getMany(normalizedIds).then((data) =>
            data?.map((p) => ({
                dest: p.__kind,
                accountId: p.__kind === 'Account' ? encodeId(p.value) : undefined,
            }))
        )
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export interface Payee {
    dest: 'Staked' | 'Stash' | 'Controller' | 'None' | 'Account'
    accountId?: string
}

export const payee = {
    async get(ctx: StorageContext, stashId: string): Promise<Payee | undefined> {
        const data = await getStorageData(ctx, [stashId])
        if (!data) return undefined

        return data[0]
    },
    async getMany(ctx: StorageContext, stashIds: string[]): Promise<Payee[] | undefined> {
        const data = await getStorageData(ctx, stashIds)
        if (!data) return undefined

        return data
    },
}
