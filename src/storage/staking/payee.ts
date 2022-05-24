import { decodeId, encodeId } from '../../common/helpers'
import { PayeeTypeRaw } from '../../types/custom/stakingData'
import { StakingPayeeStorage } from '../../types/generated/storage'
import * as v9110 from '../../types/generated/v9110'
import { StorageContext } from '../../types/generated/support'
import { UnknownVersionError } from '../../common/errors'

async function getStorageData(
    ctx: StorageContext,
    account: Uint8Array
): Promise<{ payee: string; account?: Uint8Array } | undefined> {
    const storage = new StakingPayeeStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV0) {
        const { __kind, value } = await storage.getAsV0(account)
        return {
            payee: __kind,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            account: value!,
        }
    } else if (storage.isV9110) {
        const data = await storage.getAsV9110(account)
        return {
            payee: data.__kind,
            account: (data as v9110.RewardDestination_Account).value,
        }
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

const storageCache: {
    hash?: string
    values: Map<string, Payee>
} = {
    values: new Map(),
}

export interface Payee {
    payee: PayeeTypeRaw
    account?: string
}

export async function getPayee(ctx: StorageContext, account: string): Promise<Payee | undefined> {
    if (storageCache.hash !== ctx.block.hash) {
        storageCache.hash = ctx.block.hash
        storageCache.values.clear()
    }

    const key = account
    let value = storageCache.values.get(key)

    if (!value) {
        const u8 = decodeId(account)
        if (!u8) return undefined

        const data = await getStorageData(ctx, u8)
        if (!data) return undefined

        value = {
            payee: data.payee as PayeeTypeRaw,
            account: data.account ? encodeId(data.account) : undefined,
        }

        storageCache.values.set(key, value)
    }

    return value
}
