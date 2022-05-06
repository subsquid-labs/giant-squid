import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { saveChillCall } from '../base/savers'

export async function handleChill(ctx: ExtrinsicHandlerContext) {
    await saveChillCall(ctx)
}
