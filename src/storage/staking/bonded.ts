import { UnknownVersionError } from '../../common/errors'
import { decodeId, encodeId } from '../../common/tools'
import { StakingBondedStorage } from '../../types/generated/storage'
import { BlockContext } from '../../types/generated/support'

async function getStorageData(
    ctx: BlockContext,
    accounts: Uint8Array[]
): Promise<(Uint8Array | undefined)[] | undefined> {
    const storage = new StakingBondedStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV0) {
        return await storage.getManyAsV0(accounts)
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export const bonded = {
    get: async (ctx: BlockContext, account: string) => {
        const u8 = decodeId(account)

        const data = await getStorageData(ctx, [u8])
        if (!data || !data[0]) return undefined

        return encodeId(data[0])
    },
    getMany: async (ctx: BlockContext, accounts: string[]) => {
        if (accounts.length === 0) return []

        const u8s = accounts.map((a) => decodeId(a))

        const data = await getStorageData(ctx, u8s)
        if (!data) return undefined

        return data.map((d) => (d ? encodeId(d) : undefined))
    },
}
