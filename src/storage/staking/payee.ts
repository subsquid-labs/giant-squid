import { StakingPayeeStorage } from '../../types/kusama/storage'
import { BlockContext as StorageContext } from '../../types/kusama/support'
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
        return await storage.getManyAsV1020(normalizedIds).then((data) =>
            data?.map((p) => ({
                dest: p.__kind,
                accountId: p.value ? encodeId(p.value) : undefined,
            }))
        )
    } else if (storage.isV9111) {
        await storage.getManyAsV1020(normalizedIds).then((data) =>
            data?.map((p) => ({
                dest: p.__kind,
                accountId: p.value ? encodeId(p.value) : undefined,
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
    async getMany(ctx: StorageContext, stashIds: string[]): Promise<Payee[] | undefined> {
        const data = await getStorageData(ctx, stashIds)
        if (!data) return undefined

        return data
    },
}
