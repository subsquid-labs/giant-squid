import { MoreThanOrEqual } from 'typeorm'
import { Account, Crowdloan, Parachain, PayeeType, Staker, StakingRole } from '../../model'
import storage from '../../storage'
import { CommonHandlerContext } from '../types/contexts'
import { createPrevStorageContext } from './actions'

export async function getOrCreateAccount(ctx: CommonHandlerContext, id: string): Promise<Account> {
    let account = await ctx.store.get(Account, id)
    if (!account) {
        account = new Account({
            id,
            lastUpdateBlock: ctx.block.height - 1,
        })
        await ctx.store.insert(account)
    }

    return account
}

type StakerOptions = { stashId: string; controllerId?: string } | { controllerId: string; stashId?: string }

// eslint-disable-next-line sonarjs/cognitive-complexity
export async function getOrCreateStaker(
    ctx: CommonHandlerContext,
    options: StakerOptions
): Promise<Staker | undefined> {
    let staker = await ctx.store.get<Staker>(Staker, {
        where: options,
        relations: ['stash', 'controller', 'payee'],
    })
    if (!staker) {
        // query ledger to check if the account has already bonded balance
        const prevCtx = createPrevStorageContext(ctx)
        // first we need to know controller id for account
        const controllerId = options.controllerId
            ? options.controllerId
            : await storage.staking.bonded.get(prevCtx, options.stashId as string)
        // if controllerId is null, it means that this account never staked before and there is an error
        // so we should return nothing
        if (!controllerId) return undefined

        // query ledger and then convert it to map from stash ids
        // that are equaled our initial ids and ledgers values
        const ledger = await storage.staking.ledger.get(prevCtx, controllerId)
        // if ledger doesn't exist
        if (!ledger) return undefined

        const stashId = ledger.stash

        const payeeInfo = await storage.staking.getPayee(ctx, stashId)
        if (!payeeInfo) return undefined

        staker = await createStaker(ctx, {
            stashId,
            controllerId,
            payeeId:
                payeeInfo.payee === 'Account'
                    ? payeeInfo.account
                    : payeeInfo.payee === 'Controller'
                    ? controllerId
                    : payeeInfo.payee === 'Staked' || payeeInfo.payee === 'Stash'
                    ? stashId
                    : null,
            payeeType: payeeInfo.payee as PayeeType,
        })
    }

    return staker
}

interface StakerData {
    stashId: string
    controllerId: string
    payeeId: string | null
    payeeType: PayeeType
}

export async function createStaker(ctx: CommonHandlerContext, data: StakerData) {
    const prevCtx = createPrevStorageContext(ctx)

    const stash = await getOrCreateAccount(ctx, data.stashId)

    const controller = data.controllerId === data.stashId ? stash : await getOrCreateAccount(ctx, data.controllerId)

    const payee =
        data.payeeType === PayeeType.Stash || data.payeeType === PayeeType.Staked
            ? stash
            : data.payeeType === PayeeType.Controller
            ? controller
            : data.payeeType === PayeeType.Account
            ? await getOrCreateAccount(ctx, data.payeeId as string)
            : null

    const ledger = await storage.staking.ledger.get(prevCtx, data.controllerId)

    const staker = new Staker({
        id: data.stashId,
        stash,
        controller,
        payee,
        payeeType: data.payeeType,
        role: StakingRole.Idle,
        activeBond: ledger?.active,
        totalReward: 0n,
        totalSlash: 0n,
    })
    await ctx.store.save(staker)

    return staker
}

export async function getOrCreateParachain(ctx: CommonHandlerContext, paraId: number): Promise<Parachain> {
    let parachain = await ctx.store.get(Parachain, paraId.toString())
    if (!parachain) {
        parachain = new Parachain({
            id: paraId.toString(),
            paraId,
        })
        await ctx.store.insert(parachain)
    }

    return parachain
}

export async function getLastCrowdloan(ctx: CommonHandlerContext, paraId: number): Promise<Crowdloan | undefined> {
    return await ctx.store.get(Crowdloan, {
        where: {
            parachain: {
                paraId,
            },
            end: MoreThanOrEqual(ctx.block.height),
        },
        order: {
            blockNumber: 'DESC',
        },
        relations: ['parachain'],
    })
}

// async function createAccount(ctx: CommonHandlerContext, idOrIds: string | string[]) {
//     // const ids = Array.isArray(idOrIds) ? idOrIds : [idOrIds]
//     //

//     const accounts = ids.map(
//         (id) =>

//     )

//     await ctx.store.insert(accounts)

//     return Array.isArray(idOrIds) ? accounts : accounts[0]
// }
