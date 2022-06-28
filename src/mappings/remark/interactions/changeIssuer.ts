import { RmrkCollection, RmrkEvent, RmrkInteraction } from '../../../model'
import { CallHandlerContext } from '../../types/contexts'
import { getOrCreateAccount } from '../../util/entities'
import { getEventBase } from '../utils/common'
import assert from 'assert'

export async function changeIssuer(rmrkObject: Array<string>, ctx: CallHandlerContext): Promise<void> {
    const [collectionId, recipient] = rmrkObject.slice(3)
    const eventBase = await getEventBase(ctx)
    const collection = await ctx.store.get(RmrkCollection, collectionId)
    assert(collection)
    const newOwner = await getOrCreateAccount(ctx, recipient)
    collection.currentOwner = newOwner
    const event = new RmrkEvent({
        ...eventBase,
        interaction: RmrkInteraction.CHANGEISSUER,
        collection: collection,
    })
    await ctx.store.save(collection)
    await ctx.store.save(event)
    ctx.log.debug(`Changed collection's owner : ${collection.id}`)
}
