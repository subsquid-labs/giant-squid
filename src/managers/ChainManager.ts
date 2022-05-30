import { EventHandlerContext } from '@subsquid/substrate-processor'
import chains from '../chains'
import config from '../config'
import { Parachain } from '../model'
import { Manager } from './Manager'

type ParaId = `${number}`

class ParachainManager extends Manager<Parachain> {
    async get(ctx: EventHandlerContext, id: ParaId): Promise<Parachain>
    async get(ctx: EventHandlerContext, ids: ParaId[]): Promise<Parachain[]>
    async get(ctx: EventHandlerContext, idOrIds: ParaId | ParaId[]) {
        const ids = Array.isArray(idOrIds) ? idOrIds : [idOrIds]
        const parachains = await super.get(ctx, ids)

        const idsWithoutChains = ids.filter((id) => parachains.findIndex((pc) => pc.id === id))
        parachains.push(
            ...(await ctx.store.save(
                Parachain,
                idsWithoutChains.map(
                    (id) =>
                        new Parachain({
                            id: id,
                            paraId: Number(id),
                        })
                )
            ))
        )

        return Array.isArray(idOrIds) ? parachains : parachains[0]
    }
}

export const chainManager = new ParachainManager(Parachain)
