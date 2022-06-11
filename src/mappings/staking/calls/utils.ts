import assert from 'assert'
import { saturatingSumBigInt } from '../../../common/helpers'
import { Bond, BondType, Staker } from '../../../model'
import { CommonHandlerContext } from '../../types/contexts'
import { ActionData } from '../../types/data'
import { getMeta } from '../../util/actions'

export interface BondData extends ActionData {
    amount: bigint
    accountId: string
    type: BondType
    success: boolean
}

export async function saveBond(ctx: CommonHandlerContext, data: BondData) {
    const { accountId, amount, success, type } = data

    let staker: Staker | undefined
    if (type === BondType.Bond) {
        staker = await ctx.store.get(Staker, {
            where: {
                stashId: accountId,
            },
            relations: ['stash'],
        })
    } else {
        staker = await ctx.store.findOne(Staker, {
            where: {
                controllerId: accountId,
            },
            relations: ['controller'],
        })
    }
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
