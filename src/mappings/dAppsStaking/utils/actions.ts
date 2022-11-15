import { CommonHandlerContext, EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import assert from 'assert'
import { BondType, DAppContract } from '../../../model'
import { ActionData } from '../../types/data'
import { getOrCreateStaker, getOrCreateStakeState } from '../../util/entities'
import { saveBond } from './savers'

export async function processStakeChange(
    ctx: EventHandlerContext<Store, { event: { extrinsic: { hash: true } } }>,
    stakerId: string,
    contractAddress: string,
    type: BondType,
    amount: bigint,
    addToUnbonding?: Boolean
) {
    const [contract, staker] = await Promise.all([
        ctx.store.get(DAppContract, contractAddress),
        getOrCreateStaker(ctx, stakerId),
    ])
    assert(contract, 'Stake on unexisting contract')
    const stakeState = await getOrCreateStakeState(ctx, staker, contract)

    const plusAmount = type === BondType.Bond ? amount : -amount
    contract.activeStake += plusAmount
    stakeState.stakeVolume += plusAmount
    staker.activeBond += plusAmount

    if (addToUnbonding) staker.unbondindVolume += amount

    staker.stash.lastUpdateBlock = ctx.block.height
    await ctx.store.save(staker.stash)
    await ctx.store.save(staker)
    await ctx.store.save(contract)
    await ctx.store.save(stakeState)
    await saveBond(ctx, staker, contract, type, amount)
}
