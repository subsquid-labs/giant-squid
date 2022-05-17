import { decodeId, encodeId } from '../../common/helpers'
import config from '../../config'
import { StakingBondedStorage } from '../../types/generated/storage'
import { StorageContext } from '../../types/generated/support'

async function getStorageData(
    ctx: StorageContext,
    accounts: Uint8Array[]
): Promise<(Uint8Array | undefined)[] | undefined> {
    const storage = new StakingBondedStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV1020) {
        return await storage.getManyAsV1020(accounts)
    }

    return undefined
}

export const bonded = {
    get: async (ctx: StorageContext, account: string) => {
        const u8 = decodeId(account, config.prefix)

        const data = await getStorageData(ctx, [u8])
        if (!data || !data[0]) return undefined

        return encodeId(data[0], config.prefix)
    },
    getMany: async (ctx: StorageContext, accounts: string[]) => {
        const u8s = accounts.map((a) => decodeId(a, config.prefix))

        const data = await getStorageData(ctx, u8s)
        if (!data) return undefined

        return data.map((d) => (d ? encodeId(d, config.prefix) : undefined))
    },
}
