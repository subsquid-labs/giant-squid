import { Crowdloan } from '../model'
import { Manager } from './Manager'
import { chainManager } from './ChainManager'
import { Store } from '@subsquid/typeorm-store'
import { CommonHandlerContext } from './types'

interface CrowdloanData {
    paraId: number
    fundIndex: number
    end: number
    firstPeriod: number
    lastPeriod: number
    cap: bigint
    blockNumber: number
    timestamp: Date
}

class CrowdloanManager extends Manager<Crowdloan> {
    async getByParaId(ctx: CommonHandlerContext, paraId: number): Promise<Crowdloan | undefined> {
        return (
            await ctx.store.find(Crowdloan, {
                where: {
                    parachain: {
                        paraId,
                    },
                },
                order: {
                    blockNumber: 'DESC',
                },
                relations: ['parachain'],
            })
        )[0]
    }

    async create(ctx: CommonHandlerContext, data: CrowdloanData) {
        const { fundIndex, end, firstPeriod, lastPeriod, cap, paraId, blockNumber, timestamp } = data

        const id = `${paraId}-${fundIndex}`

        const crowdloan = new Crowdloan({
            id,
            cap,
            raised: 0n,
            end: end,
            lastPeriod: lastPeriod,
            firstPeriod: firstPeriod,
            blockNumber: blockNumber,
            parachain: await chainManager.get(ctx, `${paraId}`),
            createdAt: timestamp,
        })

        await ctx.store.insert(crowdloan)

        return crowdloan
    }
}

export const crowdloanManager = new CrowdloanManager(Crowdloan)
