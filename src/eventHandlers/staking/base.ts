import { EventHandlerContext } from "@subsquid/substrate-processor"
import { encodeID, getOrCreate } from "../../common/helpers"
import { RewardData } from "../../common/mapping/stakingData"
import config from "../../config"
import { Reward } from "../../model"

export async function saveRewardEvent(ctx: EventHandlerContext, data: RewardData) {
    const id = `${ctx.event.id}`

    const stake = await getOrCreate(ctx.store, Reward, id)

    stake.blockNumber ??= BigInt(ctx.block.height)
    stake.extrinisicHash ??= ctx.extrinsic?.hash
    stake.date ??= new Date(ctx.event.blockTimestamp)
    stake.name ??= ctx.event.name
    stake.chainName ??= config.chainName

    stake.account ??= encodeID(data.account, config.chainName)
    stake.amount ??= data.amount

    ctx.store.save(stake)
}