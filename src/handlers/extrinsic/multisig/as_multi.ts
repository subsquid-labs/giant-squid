import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { saveCreateCall } from '../crowdloan/create'

const AS_MULTI_CALL_DATA = 3

/**
 * Temporary solution. Will be removed with new archive release.
 * Now it handles only 'crowdloan.create' calls.
 */
function getCallData(ctx: ExtrinsicHandlerContext) {
    const hex = ctx.extrinsic.args[AS_MULTI_CALL_DATA].value
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { __kind, value } = (ctx._chain as any).jsonCodec.scaleCodec.decodeBinary(
        ctx._chain.description.call,
        hex
    ) as {
        __kind: string
        value: {
            __kind: string
            index: number
            cap: string
            end: number
            firstPeriod: number
            lastPeriod: number
        }
    }

    if (__kind !== 'Crowdloan' || value.__kind !== 'create') return undefined

    return {
        index: value.index,
        cap: BigInt(value.cap),
        firstPeriod: value.firstPeriod,
        lastPeriod: value.lastPeriod,
        end: value.end,
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

export async function handleAsMulti(ctx: ExtrinsicHandlerContext) {
    if (!isCrowdloanCreateValid(ctx)) return

    const data = getCallData(ctx)
    if (!data) return

    await saveCreateCall(ctx, data)
}
