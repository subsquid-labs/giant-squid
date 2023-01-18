// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { CallHandlerContext } from '../../types/contexts'
// import assert from 'assert'
// import { getEventBase } from '../utils/common'
// import { RmrkEvent, RmrkInteraction, RmrkNFT } from '../../../model'

// export async function list(rmrkObject: Array<string>, ctx: CallHandlerContext): Promise<void> {
//     const [nftId, price] = rmrkObject.slice(3)
//     const eventBase = await getEventBase(ctx)
//     const nft = await ctx.store.get(RmrkNFT, {
//         where: { id: nftId },
//         relations: { currentOwner: true, collection: true },
//     })
//     assert(nft)
//     nft.price = BigInt(price)
//     nft.updatedAt = eventBase.timestamp
//     const event = new RmrkEvent({
//         ...eventBase,
//         interaction: nft.price > 0n ? RmrkInteraction.LIST : RmrkInteraction.UNLIST,
//         nft: nft,
//         info: nft.price,
//     })
//     await ctx.store.save(nft)
//     await ctx.store.save(event)
//     ctx.log.debug(`(un)Listed nft : ${nft.id}`)
// }
