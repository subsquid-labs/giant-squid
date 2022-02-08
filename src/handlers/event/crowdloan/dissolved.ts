import { EventHandlerContext } from "@subsquid/substrate-processor";
import { getParachain } from "../../../common/parachain";
import { DissolvedData } from "../../../common/types/crowdloanData";
import { Crowdloan } from "../../../model";
import { CrowdloanDissolvedEvent } from "../../../types/events";

function getEventData(ctx: EventHandlerContext): DissolvedData {
    const event = new CrowdloanDissolvedEvent(ctx)

    if (event.isV9110) {
        return {
            index: event.asV9110
        }
    }
    else {
        return {
            index: event.asLatest
        }
    }
}

export async function dissolveCrowdloan(ctx: EventHandlerContext, data: DissolvedData) {
    const parachain = await getParachain(ctx.store, `${data.index}`)

    const lastCrowdloan = parachain.crowdloans[parachain.crowdloans.length - 1]

    await ctx.store.remove(lastCrowdloan)
}

export async function handleDissolved(ctx: EventHandlerContext) {
    const data = getEventData(ctx)

    await dissolveCrowdloan(ctx, data)
}


