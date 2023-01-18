// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { CallHandlerContext } from '../../types/contexts'
// import { RmrkCollection, RmrkEvent } from '../../../model'
// import { getOrCreateAccount } from '../../util/entities'
// import { getEventBase } from '../utils/common'
// import { RmrkInteraction } from '../../../model/generated'

// interface MintData {
//     name: string
//     max: number
//     issuer: string
//     symbol: string
//     id: string
//     metadata: string
// }

// export async function mint(rmrkObject: Array<string>, ctx: CallHandlerContext): Promise<void> {
//     const payloadStr = decodeURIComponent(rmrkObject[3])
//     const payload = JSON.parse(payloadStr) as MintData
//     const account = await getOrCreateAccount(ctx, payload.issuer!)
//     const collection = new RmrkCollection({
//         name: payload.name!,
//         max: payload.max!,
//         symbol: payload.symbol!,
//         id: payload.id!,
//         issuer: payload.issuer!,
//         currentOwner: account,
//         metadata: payload.metadata,
//         createdAt: new Date(ctx.block.timestamp),
//     })
//     const eventBase = await getEventBase(ctx)
//     const event = new RmrkEvent({
//         ...eventBase,
//         interaction: RmrkInteraction.MINT,
//         collection: collection,
//     })
//     await ctx.store.save(collection)
//     await ctx.store.save(event)
//     ctx.log.debug(`Saved collection : ${collection.id}`)
// }
