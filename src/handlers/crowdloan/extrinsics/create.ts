import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { getOrCreate } from '../../../common/helpers'
import { CreateData } from '../../../types/custom/crowdloanData'
import { getOrCreateParachain } from '../../../common/parachain'
import config from '../../../config'
import { Crowdloan, CrowdloanStatus, Parachain } from '../../../model'
import * as calls from '../../../types/generated/calls'

function getCallData(ctx: ExtrinsicHandlerContext): CreateData {
    const event = new calls.CrowdloanCreateCall(ctx)
    if (event.isV9010) {
        return event.asV9010
    } else {
        return event.asLatest
    }
}

function getCrowdloanNum(parachain: Parachain, blockNumber: bigint) {
    const crowdloanIndex = parachain.crowdloans.findIndex((crowdloan) => crowdloan.blockNumber === blockNumber)

    return crowdloanIndex >= 0 ? crowdloanIndex + 1 : parachain.crowdloans.length + 1
}

export async function saveCreateCall(ctx: ExtrinsicHandlerContext, data: CreateData) {
    const parachain = await getOrCreateParachain(ctx.store, data.index)

    const crowdloanNum = getCrowdloanNum(parachain, BigInt(ctx.block.height))
    const crowdloan = await getOrCreate(ctx.store, Crowdloan, {
        id: `${data.index}-${crowdloanNum}`,
    })

    crowdloan.cap ??= data.cap
    crowdloan.end ??= BigInt(data.end)
    crowdloan.firstPeriod ??= BigInt(data.firstPeriod)
    crowdloan.lastPeriod ??= BigInt(data.lastPeriod)
    crowdloan.parachain ??= parachain
    crowdloan.chainName ??= config.chainName
    crowdloan.contributors ??= []
    crowdloan.raised ??= 0n
    crowdloan.blockNumber ??= BigInt(ctx.block.height)
    crowdloan.status ??= CrowdloanStatus.Created

    await ctx.store.save(crowdloan)
}

export async function handleCreate(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)
    await saveCreateCall(ctx, data)
}
