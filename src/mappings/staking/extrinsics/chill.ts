import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { saveChillCall } from '../utils/savers'

export async function handleChill(ctx: ExtrinsicHandlerContext) {
    await saveChillCall(ctx)
}
