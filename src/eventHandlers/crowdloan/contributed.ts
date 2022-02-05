import { EventHandlerContext } from "@subsquid/substrate-processor"
import * as events from "../../types/events"

import config from "../../config"
import { encodeID, getOrCreate } from "../../common/helpers"
import { ContributedData } from "../../common/mapping/crowdloanData"
import { Crowdloan } from "../../model"

function getContributedEvent(ctx: EventHandlerContext): ContributedData {
    let event = new events.CrowdloanContributedEvent(ctx)
    if (event.isV9110) {
        let [account, paraId, amount] = event.asV9110
        return {
            account: encodeID(account, config.chainName),
            paraId,
            amount
        }
    }
    else
    {
        let [account, paraId, amount] = event.asLatest
        return {
            account: encodeID(account, config.chainName),
            paraId,
            amount
        }
    }
}


export async function handleContributed(ctx: EventHandlerContext) {
    const data = getContributedEvent(ctx)

    const crowdloan = await getOrCreate(ctx.store, Crowdloan, `${data.paraId}`)

    if (!crowdloan.contributors)
        crowdloan.contributors = []
    if (crowdloan.contributors.indexOf(data.account) < 0)
        crowdloan.contributors.push(data.account)
    crowdloan.raised = 0n

    await ctx.store.save(crowdloan);
}