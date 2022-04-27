import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Manager } from './Manager'
import { PayeeType, StakingInfo, StakingRole } from '../model'
import { accountManager } from './AccountManager'
import { InsertFailedError } from '../common/errors'

interface StakingInfoData {
    stash: string
    controller: string
    payee?: string
    payeeType: PayeeType
    role: StakingRole
}

export class StakingInfoManager extends Manager<StakingInfo> {
    async get(ctx: EventHandlerContext, id: string): Promise<StakingInfo | undefined> {
        return await ctx.store.findOne(StakingInfo, id, { cache: true })
    }

    async create(ctx: EventHandlerContext, data: StakingInfoData): Promise<StakingInfo> {
        const id = data.stash

        const stash = await accountManager.get(ctx, data.stash)
        const controller = data.controller === data.stash ? stash : await accountManager.get(ctx, data.stash)
        const payee = data.payee === data.stash ? stash : await accountManager.get(ctx, data.stash)

        const stakingInfo = new StakingInfo({
            controller,
            payee,
            stash,
            payeeType: data.payeeType,
            role: data.role,
        })

        if (!(await ctx.store.insert(StakingInfo, stakingInfo))) throw new InsertFailedError(StakingInfo.name, id)

        return stakingInfo
    }
}

export const stakingInfoManager = new StakingInfoManager(StakingInfo)
