import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import chains from '../chains'
import config from '../config'
import { Parachain } from '../model'
import { Manager } from './Manager'
import { CommonHandlerContext } from './types'

type ParaId = `${number}`

class ParachainManager extends Manager<Parachain> {
    async get(ctx: CommonHandlerContext, id: ParaId): Promise<Parachain>
    async get(ctx: CommonHandlerContext, ids: ParaId[]): Promise<Parachain[]>
    async get(ctx: CommonHandlerContext, idOrIds: ParaId | ParaId[]) {
        const ids = Array.isArray(idOrIds) ? idOrIds : [idOrIds]
        const parachains = await super.get(ctx, ids)

        const idsWithoutChains = ids.filter((id) => parachains.findIndex((pc) => pc.id === id))
        const newParachains = idsWithoutChains.map(
            (id) =>
                new Parachain({
                    id: id,
                    paraId: Number(id),
                })
        )
        await ctx.store.save(newParachains)
        parachains.push(...newParachains)

        return Array.isArray(idOrIds) ? parachains : parachains[0]
    }
}

export const chainManager = new ParachainManager(Parachain)
