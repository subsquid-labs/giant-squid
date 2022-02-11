import { EventHandlerContext } from '@subsquid/substrate-processor'
import { encodeID, getOrCreate, populateMeta } from '../../../common/helpers'
import { RewardData } from '../../../common/types/stakingData'
import config from '../../../config'
import { Reward } from '../../../model'

export async function saveRewardEvent(ctx: EventHandlerContext, data: RewardData) {
    const id = ctx.event.id

    const reward = await getOrCreate(ctx.store, Reward, {
        eventId: id,
    })

    populateMeta(ctx, reward)

    reward.name ??= ctx.event.name
    reward.chainName ??= config.chainName

    reward.account ??= encodeID(data.account, config.chainName)
    reward.amount ??= data.amount

    ctx.store.save(reward)
}
