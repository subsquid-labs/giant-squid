import { CommonHandlerContext, EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { Bond, BondType, DAppContract, Staker } from '../../../model'

export async function saveBond(
    ctx: EventHandlerContext<Store, { event: { extrinsic: { hash: true } } }>,
    staker: Staker,
    contract: DAppContract,
    type: BondType,
    amount: bigint
) {
    const bond = new Bond({
        id: ctx.event.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.event.extrinsic?.hash,
        staker: staker,
        account: staker.stash,
        amount,
        type,
        contract,
    })
    ctx.log.debug(`[BOND] ${bond.id} ${bond.account.id} ${contract.id} ${amount}`)
    await ctx.store.save(bond)
}
