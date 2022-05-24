import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'

export function isAlreadyHandled(ctx: ExtrinsicHandlerContext) {
    return ctx.block.events.find(
        (event) =>
            event.extrinsicId === ctx.extrinsic.id &&
            (event.name === 'staking.Bonded' || event.name === 'staking.Unbonded')
    )
}
