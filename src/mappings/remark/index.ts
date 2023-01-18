// import { CallHandlerContext } from '../types/contexts'
// import { SystemRemarkCall } from '../../types/generated/calls'
// import { RmrkInteraction } from '../../model/generated/_rmrkInteraction'
// import consts from './utils/consts'
// import * as InteractionsMaps from './interactions'

// async function handleRemark(ctx: CallHandlerContext): Promise<void> {
//     const rmrkStr = new SystemRemarkCall(ctx).asV1020.remark.toString()
//     try {
//         const rmrkObject = rmrkStr.split('::')
//         if (!consts.RMRK_PREFIXES.some((prefix) => rmrkObject[0] === prefix)) {
//             ctx.log.debug(`NOT RMRKv1 message : ${rmrkStr}`)
//             return
//         }
//         // Looking for interaction
//         switch (rmrkObject[1]) {
//             case RmrkInteraction.BUY:
//                 await InteractionsMaps.buy(rmrkObject, ctx)
//                 break
//             case RmrkInteraction.CHANGEISSUER:
//                 await InteractionsMaps.changeIssuer(rmrkObject, ctx)
//                 break
//             case RmrkInteraction.CONSUME:
//                 await InteractionsMaps.consume(rmrkObject, ctx)
//                 break
//             case RmrkInteraction.EMOTE:
//                 await InteractionsMaps.emote(rmrkObject, ctx)
//                 break
//             case RmrkInteraction.LIST:
//                 await InteractionsMaps.list(rmrkObject, ctx)
//                 break
//             case RmrkInteraction.MINT:
//                 await InteractionsMaps.mint(rmrkObject, ctx)
//                 break
//             case RmrkInteraction.MINTNFT:
//                 await InteractionsMaps.mintNFT(rmrkObject, ctx)
//                 break
//             case RmrkInteraction.SEND:
//                 await InteractionsMaps.send(rmrkObject, ctx)
//                 break
//             default:
//                 ctx.log.debug(`Wrong RMRK interaction : ${rmrkStr}`)
//                 break
//         }
//     } catch (e) {
//         ctx.log.error(e as string)
//         ctx.log.error(`Unable to decode string : ${rmrkStr}`)
//         //throw e
//     }
// }
// export default { handleRemark }
