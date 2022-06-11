import assert from 'assert'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/helpers'
import { PayeeType, Reward, Staker } from '../../../model'
import { StakingRewardedEvent, StakingRewardEvent } from '../../../types/generated/events'
import { EventContext, EventHandlerContext } from '../../types/contexts'
import { ActionData } from '../../types/data'
import { getMeta } from '../../util/actions'

interface EventData {
    amount: bigint
    account: Uint8Array
}

function getRewardedEventData(ctx: EventContext): EventData {
    const event = new StakingRewardedEvent(ctx)

    if (event.isV9090) {
        const [account, amount] = event.asV9090
        return {
            account,
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

function getRewardEventData(ctx: EventHandlerContext): EventData | undefined {
    const event = new StakingRewardEvent(ctx)

    if (event.isV0) {
        const [account, amount] = event.asV0
        return {
            account,
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleRewarded(ctx: EventHandlerContext, old = false) {
    const data = old ? getRewardEventData(ctx) : getRewardedEventData(ctx)
    if (!data) return

    await saveReward(ctx, {
        id: ctx.event.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.event.extrinsic?.hash,
        accountId: encodeId(data.account),
        amount: data.amount,
    })
}

export const handleReward = (ctx: EventHandlerContext) => {
    return handleRewarded(ctx, true)
}

export interface RewardData extends ActionData {
    amount: bigint
    accountId: string
}

export async function saveReward(ctx: EventHandlerContext, data: RewardData) {
    const { accountId, amount } = data

    const staker = await ctx.store.get(Staker, {
        where: {
            payeeId: accountId,
        },
        relations: ['payee'],
    })
    assert(staker != null, `Missing staking info for ${accountId}`)

    const account = staker.payee
    assert(account != null, `Payee is null for staker ${staker.id}`)

    staker.totalReward += amount
    if (staker.payeeType === PayeeType.Staked) staker.activeBond += amount

    await ctx.store.save(staker)

    await ctx.store.insert(
        new Reward({
            ...getMeta(data),
            account,
            amount: data.amount,
        })
    )
}
