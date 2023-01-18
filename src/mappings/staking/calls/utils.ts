import assert from 'assert'
import { saturatingSumBigInt } from '../../../common/tools'
import { Bond, BondType } from '../../../model'
import storage from '../../../storage'
import { CommonHandlerContext } from '../../types/contexts'
import { ActionData } from '../../types/data'
import { getMeta } from '../../util/actions'
import { getOrCreateAccount, getOrCreateStaker } from '../../util/entities'

export interface BondData extends ActionData {
    amount: bigint
    accountId: string
    type: BondType
    success: boolean
}

export async function saveBond(ctx: CommonHandlerContext, data: BondData) {
    const { accountId, amount, success, type } = data

    let stashId =
        type === BondType.Bond ? accountId : await storage.staking.ledger.get(ctx, accountId).then((l) => l?.stash)
    if (!stashId) return

    const staker = await getOrCreateStaker(ctx, stashId)
    assert(staker != null, `Missing staking info for ${stashId}`)

    const account = await getOrCreateAccount(ctx, accountId)

    if (success) {
        staker.activeBond = saturatingSumBigInt(staker.activeBond, type === BondType.Bond ? amount : amount * -1n)

        ctx.store.save(staker)
    }

    await ctx.store.insert(
        new Bond({
            ...getMeta(data),
            account,
            type,
            amount,
            staker,
        })
    )
}
