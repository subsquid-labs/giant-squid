import { EventHandlerContext } from '@subsquid/substrate-processor'
import config from '../config'
import { Chain, Contributor, Crowdloan } from '../model'
import { Manager } from './Manager'
import { chainManager } from './ChainManager'
import * as modules from '../mappings'

export class CrowdloanManager extends Manager<Crowdloan> {
    async get(ctx: EventHandlerContext, id: number, data?: Partial<Crowdloan>): Promise<Crowdloan> {
        let crowdloan = await ctx.store
            .createQueryBuilder(Crowdloan, 'crowdloan')
            .innerJoin(Chain, 'parachain', 'crowdloan.parachain_id = parachain.id')
            .where('parachain.para_id = :id', { id })
            .andWhere('crowdloan.end > :height', { height: ctx.block.height })
            .cache(true)
            .getOne()

        if (crowdloan) return crowdloan

        const fundInfo = await modules.crowdloan.storage.getFunds(ctx, id)

        const { trieIndex, end, firstPeriod, lastPeriod, cap } = fundInfo || {
            trieIndex: 0,
            end: 0,
            firstPeriod: 0,
            lastPeriod: 0,
            cap: 0n,
        }

        crowdloan = await ctx.store.findOne(Crowdloan, `${id}-${trieIndex}`, { cache: true })

        if (!crowdloan) {
            crowdloan = new Crowdloan({
                id: `${id}-${trieIndex}`,
                cap,
                raised: 0n,
                end: BigInt(end),
                lastPeriod: BigInt(lastPeriod),
                firstPeriod: BigInt(firstPeriod),
                blockNumber: BigInt(ctx.block.height),
                parachain: await chainManager.getParachain(ctx, Number(id)),
                chain: await chainManager.get(ctx, config.chainName),
                ...data,
            })

            await ctx.store.insert(Crowdloan, crowdloan)
        }

        return crowdloan
    }
}

export const crowdloanManager = new CrowdloanManager()
