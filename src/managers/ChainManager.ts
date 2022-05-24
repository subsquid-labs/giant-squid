import { EventHandlerContext } from '@subsquid/substrate-processor'
import chains from '../chains'
import config from '../config'
import { Parachain } from '../model'
import { Manager } from './Manager'

class ParachainManager extends Manager<Parachain> {
    async get(ctx: EventHandlerContext, id: string): Promise<Parachain>
    async get(ctx: EventHandlerContext, ids: string[]): Promise<Parachain[]>
    async get(ctx: EventHandlerContext, idOrIds: string | string[]) {
        const ids = Array.isArray(idOrIds) ? idOrIds : [idOrIds]
        const parachains = await super.get(ctx, ids)

        const idsWithoutChains = ids.filter((id) => parachains.findIndex((pc) => pc.id === id))
        parachains.push(
            ...chains
                .filter((c) => idsWithoutChains.includes(String(c.paraId)) && c.relay === config.chainName)
                .map(
                    (c) =>
                        new Parachain({
                            id: String(c.paraId),
                            name: c.name,
                            paraId: c.paraId,
                            relayChain: c.relay,
                        })
                )
        )

        await ctx.store.insert(Parachain, parachains)

        return Array.isArray(idOrIds) ? parachains : parachains[0]
    }
}

export const chainManager = new ParachainManager(Parachain)
