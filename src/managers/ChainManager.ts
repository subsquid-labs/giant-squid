import { EventHandlerContext } from '@subsquid/substrate-processor'
import config from '../config'
import chains from '../chains'
import { Chain, Token } from '../model'
import { Manager } from './Manager'

class ChainManager extends Manager<Chain> {
    async get(ctx: EventHandlerContext, id: string, data?: Partial<Chain>): Promise<Chain> {
        let chain = await ctx.store.findOne(Chain, id, { cache: true })

        if (!chain) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const chainInfo = chains.find((ch) => ch.name === id)!

            chain = new Chain({
                id,
                token: new Token(chainInfo.tokens[0]),
                paraId: chainInfo.paraId,
                relayChain: chainInfo.relay ? await this.get(ctx, chainInfo.relay) : null,
                ...data,
            })

            await ctx.store.insert(Chain, chain)
        }

        return chain
    }

    async getParachain(ctx: EventHandlerContext, id: number, data?: Partial<Chain>): Promise<Chain | undefined> {
        const chainInfo = chains.find((ch) => ch.paraId === id && ch.relay === config.chainName)
        if (!chainInfo) return undefined

        return await this.get(ctx, chainInfo.name, data)
    }
}

export const chainManager = new ChainManager()
