import { EventHandlerContext } from '@subsquid/substrate-processor'
import chains from '../chains'
import { Parachain } from '../model'
import { Manager } from './Manager'

class ParachainManager extends Manager<Parachain> {
    async get(ctx: EventHandlerContext, id: string): Promise<Parachain> {
        let chain = await ctx.store.findOne(Parachain, id, { cache: true })

        if (!chain) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const chainInfo = chains.find((ch) => ch.paraId === Number(id))!

            chain = new Parachain({
                id,
                name: chainInfo.name,
                paraId: chainInfo.paraId,
                relayChain: chainInfo.relay,
            })

            await ctx.store.insert(Parachain, chain)
        }

        return chain
    }
}

export const chainManager = new ParachainManager(Parachain)
