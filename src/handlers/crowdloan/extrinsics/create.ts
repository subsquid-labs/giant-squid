import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { CreateData } from '../../../types/custom/crowdloanData'
import { getParachain } from '../../../common/parachain'
import config from '../../../config'
import { Crowdloan, CrowdloanStatus } from '../../../model'
import * as calls from '../../../types/generated/calls'

function getCallData(ctx: ExtrinsicHandlerContext): CreateData {
    const event = new calls.CrowdloanCreateCall(ctx)
    if (event.isV9110) {
        return event.asV9110
    } else {
        return event.asLatest
    }
}

export async function saveCreateCall(ctx: ExtrinsicHandlerContext, data: CreateData) {
    const parachain = await getParachain(ctx.store, data.index)

    const crowdloan = new Crowdloan({ id: `${data.index}-${ctx.block.height}` })

    crowdloan.cap = data.cap
    crowdloan.end = BigInt(data.end)
    crowdloan.firstPeriod = BigInt(data.firstPeriod)
    crowdloan.lastPeriod = BigInt(data.lastPeriod)
    crowdloan.parachain = parachain
    crowdloan.chainName = config.chainName
    crowdloan.contributors = []
    crowdloan.raised = 0n
    crowdloan.blockNumber = BigInt(ctx.block.height)
    crowdloan.status = CrowdloanStatus.CREATED

    await ctx.store.save(crowdloan)
}

export async function handleCreate(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    await saveCreateCall(ctx, data)
}
