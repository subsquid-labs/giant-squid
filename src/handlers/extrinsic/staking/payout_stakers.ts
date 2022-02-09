import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { encodeID } from '../../../common/helpers'
import { PayoutData } from '../../../common/types/stakingData'
import config from '../../../config'
import { Reward } from '../../../model'
import { StakingPayoutStakersCall } from '../../../types/calls'

function getCallData(ctx: ExtrinsicHandlerContext): PayoutData {
    const call = new StakingPayoutStakersCall(ctx)

    if (call.isV0) {
        const { validatorStash, era } = call.asV0
        return {
            validator: validatorStash,
            era,
        }
    } else {
        const { validatorStash, era } = call.asLatest
        return {
            validator: validatorStash,
            era,
        }
    }
}

export async function savePauoutStakersCall(ctx: ExtrinsicHandlerContext, data: PayoutData) {
    const rewards = await ctx.store.find(Reward, {
        where: [
            {
                extrinisicHash: ctx.extrinsic.hash,
            },
        ],
    })

    for (const reward of rewards) {
        reward.blockNumber ??= BigInt(ctx.block.height)
        reward.date ??= new Date(ctx.event.blockTimestamp)
        reward.name ??= ctx.event.name
        reward.chainName ??= config.chainName

        reward.era ??= data.era
        reward.validator ??= encodeID(data.validator, config.chainName)
    }

    await ctx.store.save(rewards)
}

export async function handlePauoutStakers(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await savePauoutStakersCall(ctx, data)
}
