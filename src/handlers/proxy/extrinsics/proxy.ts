import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { CreateData } from '../../../common/types/crowdloanData'
import { saveCreateCall } from '../../crowdloan/extrinsics/create'

const CROWDLOAN_CREATE = '0x4900'
const PROXY_CALL_DATA = 2

/**
 * Temporary solution. Will be removed with new archive release.
 * Now it handles only 'crowdloan.create' calls.
 */
function getCallData(ctx: ExtrinsicHandlerContext): CreateData | undefined {
    const { callIndex, args } = ctx.extrinsic.args[PROXY_CALL_DATA].value as {
        callIndex: string
        args: {
            index: number
            cap: string
            end: number
            first_period: number
            last_period: number
        }
    }

    if (callIndex !== CROWDLOAN_CREATE) return undefined

    return {
        index: args.index,
        cap: BigInt(args.cap),
        firstPeriod: args.first_period,
        lastPeriod: args.last_period,
        end: args.end,
    }
}

/**
 * Due to bug or error some extrinsics with 'crowdloan.create' call
 * don't have 'crowdloan.Created' event, but have 'system.ExtrinsicSuccess',
 * so it needs to be handled
 */
function isCrowdloanCreateValid(ctx: ExtrinsicHandlerContext): boolean {
    const extrinsicEvents = ctx.block.events.filter((event) => event.extrinsicId === ctx.extrinsic.id)

    return extrinsicEvents.find((event) => event.name === 'crowdloan.Created') !== undefined
}

export async function handleProxy(ctx: ExtrinsicHandlerContext) {
    if (!isCrowdloanCreateValid(ctx)) return

    const data = getCallData(ctx)
    if (!data) return

    await saveCreateCall(ctx, data)
}
