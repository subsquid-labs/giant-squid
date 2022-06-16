import { In, MoreThanOrEqual } from 'typeorm'
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

export async function getOrCreateAccounts(ctx: CommonHandlerContext, ids: string[]): Promise<Account[]> {
    const query = await ctx.store.findByIds(Account, ids)

    const accountsMap: Map<string, Account> = new Map()
    for (const q of query) accountsMap.set(q.id, q)

    const newAccounts: Set<Account> = new Set()
    for (const id of ids) {
        if (accountsMap.has(id)) continue

        const account = new Account({
            id,
            lastUpdateBlock: ctx.block.height - 1,
        })
        newAccounts.add(account)
    }

    if (newAccounts.size > 0) await ctx.store.save(newAccounts)

    return [...accountsMap.values(), ...newAccounts]
}

export async function getOrCreateStaker(
    ctx: CommonHandlerContext,
    type: 'Stash',
    stash: string
): Promise<Staker | undefined>
export async function getOrCreateStaker(
    ctx: CommonHandlerContext,
    type: 'Controller',
    cotroller: string
): Promise<Staker | undefined>
// eslint-disable-next-line sonarjs/cognitive-complexity
export async function getOrCreateStaker(
    ctx: CommonHandlerContext,
    type: 'Controller' | 'Stash',
    id: string
): Promise<Staker | undefined> {
    let staker = await ctx.store.get<Staker>(Staker, {
        where: type === 'Controller' ? { controllerId: id } : { stashId: id },
        relations: ['stash', 'controller', 'payee'],
    })
    if (!staker) {
        // query ledger to check if the account has already bonded balance
        const prevCtx = createPrevStorageContext(ctx)
        // first we need to know controller id for account
        const controllerId = type === 'Controller' ? id : await storage.staking.bonded.get(prevCtx, id)
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
            activeBond: ledger.active,
        })
    }

    return staker
}

export async function getOrCreateStakers(ctx: CommonHandlerContext, type: 'Stash', stashes: string[]): Promise<Staker[]>
export async function getOrCreateStakers(
    ctx: CommonHandlerContext,
    type: 'Controller',
    cotrollers: string[]
): Promise<Staker[]>
// eslint-disable-next-line sonarjs/cognitive-complexity
export async function getOrCreateStakers(
    ctx: CommonHandlerContext,
    type: 'Controller' | 'Stash',
    ids: string[]
): Promise<Staker[]> {
    const query = await ctx.store.find<Staker>(Staker, {
        where: type === 'Controller' ? { controllerId: In(ids) } : { stashId: In(ids) },
        relations: ['stash', 'controller', 'payee'],
    })

    const stakersMap: Map<string, Staker> = new Map()
    for (const q of query) stakersMap.set(type === 'Stash' ? q.stashId : q.controllerId, q)

    const missingIds = ids.filter((id) => !stakersMap.has(id))

    // const newStakers: Set<Staker> = new Set()
    if (missingIds.length === 0) return [...stakersMap.values()]
    const prevCtx = createPrevStorageContext(ctx)

    const controllerIds = type === 'Stash' ? await storage.staking.bonded.getMany(prevCtx, missingIds) : missingIds
    if (!controllerIds) return [...stakersMap.values()]

    const notNullControllerIds = controllerIds.filter((c): c is string => c != null)

    const ledgers = await storage.staking.ledger.getMany(prevCtx, notNullControllerIds)
    if (!ledgers) return [...stakersMap.values()]

    const newStakers: Map<string, Staker> = new Map()
    for (let i = 0; i < ledgers.length; i++) {
        if (!ledgers[i]) continue

        const payeeInfo = await storage.staking.getPayee(ctx, ledgers[i]?.stash as string)
        if (!payeeInfo) continue

        const stashId = ledgers[i]?.stash as string
        const controllerId = notNullControllerIds[i]

        newStakers.set(
            stashId,
            await createStaker(ctx, {
                stashId,
                controllerId: notNullControllerIds[i],
                payeeId:
                    payeeInfo.payee === 'Account'
                        ? payeeInfo.account
                        : payeeInfo.payee === 'Controller'
                        ? controllerId
                        : payeeInfo.payee === 'Staked' || payeeInfo.payee === 'Stash'
                        ? stashId
                        : null,
                payeeType: payeeInfo.payee as PayeeType,
                activeBond: ledgers[i]?.active as bigint,
            })
        )
    }

    return [...stakersMap.values(), ...newStakers.values()]
}

interface StakerData {
    stashId: string
    controllerId: string
    payeeId: string | null
    payeeType: PayeeType
    activeBond?: bigint
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

    const activeBond = data.activeBond || (await storage.staking.ledger.get(prevCtx, data.controllerId))?.active || 0n

    const staker = new Staker({
        id: data.stashId,
        stash,
        controller,
        payee,
        payeeType: data.payeeType,
        role: StakingRole.Idle,
        activeBond: activeBond,
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
