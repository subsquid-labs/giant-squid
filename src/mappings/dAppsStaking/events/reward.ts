import { assertNotNull, EventHandlerContext, toHex } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import { encodeEvm, encodeId } from '../../../common/helpers'
import { Era, Reward, RewardReciever } from '../../../model'
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
    const data = getEventData(ctx as EventHandlerContext<Store>)

    const era = assertNotNull(await ctx.store.get(Era, data.era.toString()))
    const staker = await getOrCreateStaker(ctx, encodeId(data.account))

    let recieverType: RewardReciever
    switch (ctx.event.call?.name) {
        case 'claim_staker':
            era.totalStakerRewardsRecieved += data.amount
            recieverType = RewardReciever.STAKER
            break
        case 'claim_dapp':
            era.totalAppsRewardsRecieved += data.amount
            recieverType = RewardReciever.DAPP
        default:
            throw new Error('Wrong call')
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
        recieverType,
    })

    await ctx.store.save(reward)
}
