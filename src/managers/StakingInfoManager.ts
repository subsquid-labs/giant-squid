import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Manager } from './Manager'
import { PayeeType, StakingInfo, StakingRole } from '../model'
import { accountManager } from './AccountManager'
import { convertPayee, createPrevStorageContext } from '../common/helpers'
import storage from '../storage'

interface StakingInfoData {
    stash: string
    controller: string
    payee?: string
    payeeType: PayeeType
    role: StakingRole
}

//temporary solution to get missing data
async function createMissingStakingInfo(ctx: EventHandlerContext, stash: string) {
    const prevCtx = createPrevStorageContext(ctx)

    const controller = await storage.staking.bonded.get(prevCtx, stash)
    if (!controller) return

    const payeeInfo = await storage.staking.getPayee(prevCtx, stash)
    if (!payeeInfo) return

    const { payee: payeeTypeRaw, account: payeeAccount } = payeeInfo

    const { payee, payeeType } = convertPayee(payeeTypeRaw, {
        stash,
        controller,
        payeeAccount,
    })

    //TODO: find way to get current role of staker
    const role = StakingRole.Indle

    return await stakingInfoManager.create(ctx, {
        stash,
        controller,
        payee,
        payeeType,
        role,
    })
}

class StakingInfoManager extends Manager<StakingInfo> {
    async get(ctx: EventHandlerContext, id: string): Promise<StakingInfo | undefined>
    async get(ctx: EventHandlerContext, ids: string[]): Promise<StakingInfo[]>
    async get(ctx: EventHandlerContext, idOrIds: string | string[]) {
        if (Array.isArray(idOrIds)) {
            return await super.get(ctx, idOrIds)
        } else {
            return (await super.get(ctx, idOrIds)) || (await createMissingStakingInfo(ctx, idOrIds))
        }
    }

    async create(ctx: EventHandlerContext, data: StakingInfoData): Promise<StakingInfo> {
        const id = data.stash

        const stash = await accountManager.get(ctx, data.stash)
        const controller = data.controller === data.stash ? stash : await accountManager.get(ctx, data.stash)
        const payee = data.payee === data.stash ? stash : await accountManager.get(ctx, data.stash)

        const stakingInfo = new StakingInfo({
            id,
            controller,
            payee,
            stash,
            payeeType: data.payeeType,
            role: data.role,
        })

        await ctx.store.insert(StakingInfo, stakingInfo)

        return stakingInfo
    }
}

export const stakingInfoManager = new StakingInfoManager(StakingInfo)
