import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Parachain, Crowdloan } from '../model'
import { Manager } from './Manager'
import { chainManager } from './ChainManager'

interface CrowdloanData {
    paraId: number
    fundIndex: number
    end: number
    firstPeriod: number
    lastPeriod: number
    cap: bigint
}

class CrowdloanManager extends Manager<Crowdloan> {
    async getByParaId(ctx: EventHandlerContext, paraId: number): Promise<Crowdloan | undefined> {
        return await ctx.store
            .createQueryBuilder(Crowdloan, 'crowdloan')
            .innerJoin(Parachain, 'parachain', 'crowdloan.parachain_id = parachain.id')
            .where('parachain.id = :id', { id: paraId.toString() })
            .andWhere('crowdloan.end > :height', { height: ctx.block.height })
            .cache(true)
            .getOne()
    }

    async create(ctx: EventHandlerContext, data: CrowdloanData) {
        const { fundIndex, end, firstPeriod, lastPeriod, cap, paraId } = data

        const id = `${paraId}-${fundIndex}`

        const crowdloan = new Crowdloan({
            id,
            cap,
            raised: 0n,
            end: end,
            lastPeriod: lastPeriod,
            firstPeriod: firstPeriod,
            blockNumber: ctx.block.height,
            parachain: await chainManager.get(ctx, `${paraId}`),
            createdAt: new Date(ctx.block.timestamp),
        })

        await ctx.store.insert(Crowdloan, crowdloan)

        return crowdloan
    }
}

export const crowdloanManager = new CrowdloanManager(Crowdloan)
