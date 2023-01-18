// import { RmrkEvent, RmrkInteraction, RmrkNFT } from '../../../model'
// import { CallHandlerContext } from '../../types/contexts'
// import { getOrCreateAccount } from '../../util/entities'
// import { getEventBase } from '../utils/common'
// import assert from 'assert'

// export async function send(rmrkObject: Array<string>, ctx: CallHandlerContext): Promise<void> {
//     const [nftId, recipient] = rmrkObject.slice(3)
//     const eventBase = await getEventBase(ctx)
//     const nft = await ctx.store.get(RmrkNFT, {
//         where: { id: nftId },
//         relations: { currentOwner: true, collection: true },
//     })
//     assert(nft)
//     const reciever = await getOrCreateAccount(ctx, recipient)
//     nft.price = 0n
//     nft.currentOwner = reciever
//     nft.updatedAt = eventBase.timestamp
//     const event = new RmrkEvent({
//         ...eventBase,
//         interaction: RmrkInteraction.SEND,
//         nft: nft,
//     })
//     await ctx.store.save(nft)
//     await ctx.store.save(event)
//     ctx.log.debug(`Sent nft : ${nft.id}`)
// }
