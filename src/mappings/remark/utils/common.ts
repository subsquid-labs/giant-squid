// import { RmrkEvent } from '../../../model'
// import { CallHandlerContext } from '../../types/contexts'
// import { getOriginAccountId } from '../../../common/tools'
// import { getOrCreateAccount } from '../../util/entities'

// export async function getEventBase(ctx: CallHandlerContext): Promise<RmrkEvent> {
//     const callerId = getOriginAccountId(ctx.call.origin)
//     const caller = callerId ? await getOrCreateAccount(ctx, callerId) : undefined
//     return new RmrkEvent({
//         id: ctx.call.id,
//         blockNumber: ctx.block.height,
//         timestamp: new Date(ctx.block.timestamp),
//         account: caller,
//     })
// }
