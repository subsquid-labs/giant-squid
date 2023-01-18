import { decodeHex, toHex } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../common/errors'
import { decodeId, encodeId } from '../../common/tools'
import { StakingBondedStorage } from '../../types/generated/storage'
import { BlockContext as StorageContext } from '../../types/generated/support'

async function getStorageData(ctx: StorageContext, ids: string[]): Promise<(string | undefined)[] | undefined> {
    const storage = new StakingBondedStorage(ctx)
    if (!storage.isExists) return undefined

    const normalizedIds = ids.map((id) => decodeId(id))
    if (storage.isV1020) {
        return await storage.asV1020
            .getMany(normalizedIds)
            .then((cIds) => cIds.map((id) => (id ? encodeId(id) : undefined)))
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export const bonded = {
    async get(ctx: StorageContext, stashId: string) {
        return await this.getMany(ctx, [stashId]).then((data) => data?.[0])
    },
    async getMany(ctx: StorageContext, stashIds: string[]) {
        const data = await getStorageData(ctx, stashIds)
        if (!data) return undefined

        return data
    },
}
