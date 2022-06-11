import assert from 'assert'
import { saturatingSumBigInt } from '../../../common/helpers'
import { Bond, BondType } from '../../../model'
import { CommonHandlerContext } from '../../types/contexts'
import { ActionData } from '../../types/data'
import { getMeta } from '../../util/actions'
import { getOrCreateStaker } from '../../util/entities'

export interface BondData extends ActionData {
    amount: bigint
    accountId: string
    type: BondType
    success: boolean
}

export async function saveBond(ctx: CommonHandlerContext, data: BondData) {
    const { accountId, amount, success, type } = data

    const staker = await getOrCreateStaker(
        ctx,
        type === BondType.Bond ? { stashId: accountId } : { controllerId: accountId }
    )
    assert(staker != null, `Missing staking info for ${accountId}`)

    const account = type === BondType.Bond ? staker.stash : staker.controller

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
            success,
            staker,
        })
    )
}
