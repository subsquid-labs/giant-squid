// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { CallHandlerContext } from '../../types/contexts'
// import { RmrkCollection, RmrkEvent } from '../../../model'
// import { getEventBase } from '../utils/common'
// import { RmrkInteraction, RmrkNFT } from '../../../model/generated'
// import assert from 'assert'

// interface MintNFTData {
//     collection: string
//     instance: string
//     name: string
//     transferable: number
//     sn: string
//     metadata: string
// }

// export async function mintNFT(rmrkObject: Array<string>, ctx: CallHandlerContext): Promise<void> {
//     const payloadStr = decodeURIComponent(rmrkObject[3])
//     const payload = JSON.parse(payloadStr) as MintNFTData
//     const eventBase = await getEventBase(ctx)
//     const collection = await ctx.store.get(RmrkCollection, payload.collection)
//     assert(collection)
//     const id = `${ctx.block.height}-${collection.id}-${payload.instance}-${payload.sn}`
//     const nft = new RmrkNFT({
//         name: payload.name!,
//         instance: payload.instance!,
//         sn: payload.sn!,
//         id: id,
//         issuer: eventBase.account?.id,
//         currentOwner: eventBase.account,
//         metadata: payload.metadata,
//         createdAt: eventBase.timestamp,
//         updatedAt: eventBase.timestamp,
//         collection: collection,
//         blockNumber: eventBase.blockNumber,
//         price: 0n,
//         burned: false,
//         transferable: payload.transferable,
//     })
//     const event = new RmrkEvent({
//         ...eventBase,
//         interaction: RmrkInteraction.MINTNFT,
//         nft: nft,
//         collection: collection,
//     })
//     await ctx.store.save(nft)
//     await ctx.store.save(event)
//     ctx.log.debug(`Saved nft : ${nft.id}`)
// }
