import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { saveChillCall } from '../base/savers'

export async function handleBond(ctx: ExtrinsicHandlerContext) {
    await saveChillCall(ctx)
}
