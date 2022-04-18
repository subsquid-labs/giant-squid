import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Chain, Token } from '../model'
import { Manager } from './Manager'
import { networkRegistry } from '@subsquid/archive-registry'

class ChainManager extends Manager<Chain> {
    async get(ctx: EventHandlerContext, id: string, data?: Partial<Chain>): Promise<Chain> {
        let chain = await ctx.store.findOne(Chain, id, { cache: true })

        if (!chain) {
            const chainInfo = networkRegistry.networks.find((ch) => ch.name === id)
            if (!chainInfo) {
                throw new Error(`Chain [${id}] not found in registry!`)
            }

            chain = new Chain({
                id,
                token: new Token({ symbol: chainInfo.tokens[0] }),
                paraId: +chainInfo.parachainId,
                relayChain:
                    chainInfo.relayChain && chainInfo.relayChain !== id
                        ? await this.get(ctx, chainInfo.relayChain)
                        : null,
                ...data,
            })

            await ctx.store.insert(Chain, chain)
        }

        return chain
    }
}

export const chainManager = new ChainManager()
