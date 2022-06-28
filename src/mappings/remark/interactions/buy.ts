/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CallHandlerContext } from '../../types/contexts'
import assert from 'assert'
import { getEventBase } from '../utils/common'
import { RmrkEvent, RmrkInteraction, RmrkNFT } from '../../../model'

export async function buy(rmrkObject: Array<string>, ctx: CallHandlerContext): Promise<void> {
    const nftId = rmrkObject[3]
    const eventBase = await getEventBase(ctx)
    const nft = await ctx.store.get(RmrkNFT, {
        where: { id: nftId },
        relations: { currentOwner: true, collection: true },
    })
    assert(nft)
    const reciever = eventBase.caller!
    const prevPrice = nft.price
    nft.price = 0n
    nft.currentOwner = reciever
    nft.updatedAt = eventBase.timestamp
    const event = new RmrkEvent({
        ...eventBase,
        interaction: RmrkInteraction.BUY,
        nft: nft,
        info: prevPrice,
    })
    await ctx.store.save(nft)
    await ctx.store.save(event)
    ctx.log.debug(`Sold nft : ${nft.id}`)
}
