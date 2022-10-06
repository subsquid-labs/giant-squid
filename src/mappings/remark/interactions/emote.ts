/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CallHandlerContext } from '../../types/contexts'
import { RmrkEvent } from '../../../model'
import { getEventBase } from '../utils/common'
import { RmrkEmote, RmrkInteraction, RmrkNFT } from '../../../model/generated'
import assert from 'assert'

export async function emote(rmrkObject: Array<string>, ctx: CallHandlerContext): Promise<void> {
    const [nftId, emotionSym] = rmrkObject.slice(3)
    const eventBase = await getEventBase(ctx)
    const nft = await ctx.store.get(RmrkNFT, nftId)
    assert(nft)
    const id = `${nftId}-${emotionSym}`
    let emotion = await ctx.store.get(RmrkEmote, {
        where: { id: nftId },
        relations: { nft: true },
    })
    if (emotion) {
        emotion.active = !emotion.active
        emotion.count += 1
    } else {
        emotion = new RmrkEmote({
            id: id,
            nft: nft,
            caller: eventBase.account!,
            value: emotionSym,
            active: true,
            count: 1,
        })
    }
    emotion.lastEmotion = eventBase.timestamp

    const event = new RmrkEvent({
        ...eventBase,
        interaction: RmrkInteraction.EMOTE,
        nft: nft,
        emotion: emotion,
    })
    await ctx.store.save(emotion)
    await ctx.store.save(event)
    ctx.log.debug(`Saved emotion : ${emotion.id}`)
}
