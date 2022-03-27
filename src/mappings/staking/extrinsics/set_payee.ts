import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { handleSetController } from './set_controller'

export async function handleSetPayee(ctx: ExtrinsicHandlerContext) {
    await handleSetController(ctx)
}
