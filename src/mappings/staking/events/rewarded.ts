import { EventHandlerContext, toHex } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/tools'
import { StakingPayoutStakersCall } from '../../../types/kusama/calls'
import { StakingRewardedEvent, StakingRewardEvent } from '../../../types/kusama/events'
import { Call, Event } from '../../../types/kusama/support'
import { BlockContext, EventContext } from '../../types/contexts'
import { ActionData } from '../../types/data'

interface EventData {
    amount: bigint
    accountId: string
}

function getRewardedEventData(ctx: BlockContext, event: Call): EventData {
    const data = new StakingRewardedEvent(ctx, event)

    if (data.isV9090) {
        const [account, amount] = data.asV9090
        return {
            accountId: encodeId(account),
            amount,
        }
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

function getRewardEventData(ctx: EventContext, event: Event): EventData | undefined {
    const data = new StakingRewardEvent(ctx)

    if (data.isV1020) {
        return undefined
    } else if (data.isV1050) {
        const [account, amount] = data.asV1050
        return {
            accountId: encodeId(account),
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface CallData {
    era: number
    validatorId: string
}

function getCallData(ctx: BlockContext, call: Call): CallData {
    const data = new StakingPayoutStakersCall(ctx, call)

    if (data.isV1058) {
        const { validatorStash, era } = data.asV1058
        return {
            validatorId: encodeId(validatorStash),
            era,
        }
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function processRewarded(
    ctx: EventHandlerContext<
        unknown,
        {
            event: {
                args: true
                call: { args: true }
                extrinsic: { hash: true }
            }
        }
    >
): RewardData | undefined {
    const reward =
        ctx.event.name === 'Staking.Reward' ? getRewardEventData(ctx, ctx.event) : getRewardedEventData(ctx, ctx.event)
    if (!reward) return undefined

    const payout = ctx.event.call?.name === 'Staking.payout_stakers' ? getCallData(ctx, ctx.event.call) : undefined

    return {
        id: ctx.event.id,
        extrinsicHash: ctx.event.extrinsic?.hash,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        stashId: reward.accountId,
        amount: reward.amount,
        validatorId: payout?.validatorId,
        era: payout?.era,
    }
}

export interface RewardData extends ActionData {
    amount: bigint
    stashId: string
    validatorId?: string
    era?: number
}

// export async function saveReward(ctx: EventHandlerContext, data: RewardData): Reward {
//     const { accountId, amount } = data

//     // const staker = await getOrCreateStaker(ctx, 'Stash', accountId)
//     // if (!staker && isStorageCorrupted(ctx)) return
//     // assert(staker != null, `Missing staking info for ${accountId}`)

//     // const account = staker.payee
//     // assert(account != null, `Payee is null for staker ${staker.id}`)

//     // staker.totalReward = saturatingSumBigInt(staker.totalReward, amount)
//     // if (staker.payeeType === PayeeType.Staked) staker.activeBond = saturatingSumBigInt(staker.activeBond, amount)

//     await ctx.store.save(staker)

//     return {
//         ...getMeta(data),
//         accountId,
//         amount: data.amount,
//     }
// }
