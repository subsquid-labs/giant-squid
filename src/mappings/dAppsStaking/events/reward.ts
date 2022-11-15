import { assertNotNull, EventHandlerContext, toHex } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import { encodeEvm, encodeId } from '../../../common/helpers'
import { DAppContract, Era, Reward, RewardReceiver } from '../../../model'
import { DappsStakingRewardEvent } from '../../../types/events'
import { getOrCreateStaker } from '../../util/entities'

export interface EventData {
    amount: bigint
    account: Uint8Array
    smartContract: Uint8Array
    era: number
}

function getEventData(ctx: EventHandlerContext<Store>): EventData {
    const event = new DappsStakingRewardEvent(ctx)
    if (event.isV4) {
        const [account, smartContract, era, amount] = event.asV4
        return {
            account,
            amount,
            smartContract: smartContract.value,
            era,
        }
    }
    ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
    try {
        const [account, smartContract, era, amount] = ctx._chain.decodeEvent(ctx.event)
        return {
            account,
            amount,
            smartContract: smartContract.value,
            era,
        }
    } catch {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleReward(ctx: EventHandlerContext<Store>) {
    ctx.log.debug(`REWARD CALL ${ctx.event.call?.name}`)
    const data = getEventData(ctx as EventHandlerContext<Store>)

    const era = assertNotNull(await ctx.store.get(Era, data.era.toString()))
    const staker = await getOrCreateStaker(ctx, encodeId(data.account))
    const contract = assertNotNull(await ctx.store.get(DAppContract, encodeEvm(data.smartContract)))

    let receiverType: RewardReceiver

    if (contract.developerId === staker.id) {
        era.totalAppsRewardsReceived += data.amount
        receiverType = RewardReceiver.DAPP
    } else {
        era.totalStakerRewardsReceived += data.amount
        receiverType = RewardReceiver.STAKER
    }

    staker.totalReward += data.amount

    const reward = new Reward({
        id: ctx.event.id,
        account: staker.stash,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.event.extrinsic?.hash,
        amount: data.amount,
        era,
        staker,
        receiverType,
        contract,
    })

    ctx.log.debug(`[REWARD] ${reward.id} ${staker.id} ${reward.contract} ${reward.amount}`)

    staker.stash.lastUpdateBlock = ctx.block.height
    await ctx.store.save(staker.stash)
    await ctx.store.save(staker)
    await ctx.store.save(era)
    await ctx.store.save(reward)
}
