import { assertNotNull } from '@subsquid/substrate-processor'
import { ArrayContains, In, MoreThanOrEqual } from 'typeorm'
import {
    Account,
    AccountTransfer,
    Crowdloan,
    Parachain,
    PayeeType,
    Staker,
    StakingRole,
    Transfer,
    TransferDirection,
} from '../../model'
import storage from '../../storage'
import { CommonHandlerContext } from '../types/contexts'
import { ActionData } from '../types/data'
import { createPrevStorageContext, getMeta } from './actions'

export async function getOrCreateAccount(ctx: CommonHandlerContext, id: string): Promise<Account> {
    let account = await ctx.store.get(Account, id)
    if (!account) {
        account = new Account({
            id,
            syncedAt: ctx.block.height - 1,
        })
        await ctx.store.insert(account)
    }

    return account
}

export async function getOrCreateAccounts(ctx: CommonHandlerContext, ids: string[]): Promise<Account[]> {
    const query = await ctx.store.findBy(Account, { id: ArrayContains(ids) })

    const accountsMap: Map<string, Account> = new Map()
    for (const q of query) accountsMap.set(q.id, q)

    const newAccounts: Set<Account> = new Set()
    for (const id of ids) {
        if (accountsMap.has(id)) continue

        const account = new Account({
            id,
            syncedAt: ctx.block.height - 1,
        })
        newAccounts.add(account)
    }

    if (newAccounts.size > 0) await ctx.store.save([...newAccounts])

    return [...accountsMap.values(), ...newAccounts]
}

export async function getOrCreateStaker(ctx: CommonHandlerContext, stashId: string): Promise<Staker | undefined> {
    let stakers = await getOrCreateStakers(ctx, [stashId])

    if (stakers.length > 0) {
        return stakers[0]
    } else {
        return undefined
    }
}

export async function getOrCreateStakers(ctx: CommonHandlerContext, stashIds: string[]): Promise<Staker[]> {
    const query = await ctx.store.find<Staker>(Staker, {
        where: { id: In(stashIds) },
        relations: {
            stash: true,
            controller: true,
            payee: true,
        },
    })

    const stakersMap: Map<string, Staker> = new Map()
    for (const q of query) stakersMap.set(q.id, q)

    const missingIds = new Set(stashIds.filter((id) => !stakersMap.has(id)))
    let newStakers: Staker[] = []
    for (let id of missingIds) {
        newStakers.push(await createStaker(ctx, id))
    }
    await syncStakers(ctx, newStakers)
    await ctx.store.save(newStakers)

    // // const newStakers: Set<Staker> = new Set()
    // if (missingIds.length === 0) return [...stakersMap.values()]
    // const prevCtx = createPrevStorageContext(ctx)

    // const controllerIds = type === 'Stash' ? await storage.staking.bonded.getMany(prevCtx, missingIds) : missingIds
    // if (!controllerIds) return [...stakersMap.values()]

    // const notNullControllerIds = controllerIds.map((c, i) => (c != null ? c : missingIds[i]))

    // const ledgers =
    //     type === 'Stash'
    //         ? ids
    //         : await storage.staking.ledger.getMany(prevCtx, notNullControllerIds).then((ls) => ls?.map((l) => l?.stash))
    // if (!ledgers) return [...stakersMap.values()]

    // const newStakers: Map<string, Staker> = new Map()
    // for (let i = 0; i < ledgers.length; i++) {
    //     let ledger = ledgers[i]
    //     if (!ledger) continue

    //     const payeeInfo = await storage.staking.payee.get(ctx, ledger)
    //     if (!payeeInfo) continue

    //     const stashId = ledger
    //     const controllerId = assertNotNull(type === 'Stash' ? controllerIds[i] : notNullControllerIds[i])

    //     newStakers.set(
    //         stashId,
    //         await createStaker(ctx, {
    //             stashId,
    //             controllerId: notNullControllerIds[i],
    //             payeeId:
    //                 payeeInfo.dest === 'Account'
    //                     ? assertNotNull(payeeInfo.accountId)
    //                     : payeeInfo.dest === 'Controller'
    //                     ? controllerId
    //                     : payeeInfo.dest === 'Staked' || payeeInfo.dest === 'Stash'
    //                     ? stashId
    //                     : null,
    //             payeeType: payeeInfo.dest as PayeeType,
    //         })
    //     )
    // }

    return [...stakersMap.values(), ...newStakers.values()]
}

export async function createStaker(ctx: CommonHandlerContext, stashId: string) {
    const staker = new Staker({
        id: stashId,
        stash: await getOrCreateAccount(ctx, stashId),
        role: StakingRole.Idle,
        activeBond: 0n,
        totalReward: 0n,
        totalSlash: 0n,
    })

    return staker
}

async function syncStakers(ctx: CommonHandlerContext, stakers: Staker[]) {
    let controllerIds = await storage.staking.bonded.getMany(
        ctx,
        stakers.map((s) => s.stash.id)
    )
    if (controllerIds) {
        for (let i = 0; i < stakers.length; i++) {
            let controllerId = controllerIds[i]
            if (!controllerId) continue

            stakers[i].controller = await getOrCreateAccount(ctx, controllerId)
        }
    }

    const stakersWithControllers = stakers.filter((s) => s.controller?.id != null)
    await storage.staking.ledger
        .getMany(
            ctx,
            stakersWithControllers.map((s) => assertNotNull(s.controller?.id))
        )
        .then((ledgers) =>
            ledgers?.forEach(
                (ledger, i) =>
                    (stakersWithControllers[i].activeBond = ledger?.active ?? stakersWithControllers[i].activeBond)
            )
        )

    let payees = await storage.staking.payee.getMany(
        ctx,
        stakers.map((s) => s.stash.id)
    )

    if (payees) {
        for (let i = 0; i < stakers.length; i++) {
            const payee = payees[i]
            if (!payee) continue

            stakers[i].payeeType = payee.dest as PayeeType
            stakers[i].payee =
                payee.dest === 'Account'
                    ? await getOrCreateAccount(ctx, assertNotNull(payee.accountId))
                    : payee.dest === 'Controller'
                    ? stakers[i].controller
                    : payee.dest === 'Staked' || payee.dest === 'Stash'
                    ? stakers[i].stash
                    : null
        }
    }

    return stakers
}

export async function getOrCreateParachain(ctx: CommonHandlerContext, paraId: number): Promise<Parachain> {
    let parachain = await ctx.store.get(Parachain, paraId.toString())
    if (!parachain) {
        parachain = new Parachain({
            id: paraId.toString(),
        })
        await ctx.store.insert(parachain)
    }

    return parachain
}

export async function getLastCrowdloan(ctx: CommonHandlerContext, paraId: number): Promise<Crowdloan | undefined> {
    return await ctx.store.get(Crowdloan, {
        where: {
            parachain: {
                id: paraId.toString(),
            },
            endedAt: MoreThanOrEqual(ctx.block.height),
        },
        order: {
            createdAt: 'DESC',
        },
        relations: { parachain: true },
    })
}

export interface TransferData extends ActionData {
    fromId: string
    toId: string | null
    amount: bigint
    success: boolean
}

export async function saveTransfer(ctx: CommonHandlerContext, data: TransferData) {
    const { fromId, toId, amount, success } = data

    const from = await getOrCreateAccount(ctx, fromId)
    const to = toId ? await getOrCreateAccount(ctx, toId) : undefined

    const transfer = new Transfer({
        ...getMeta(data),
        from,
        to,
        amount,
        success,
    })

    await ctx.store.insert(transfer)

    await ctx.store.insert(
        new AccountTransfer({
            id: `${transfer.id}-from`,
            transfer,
            account: from,
            direction: TransferDirection.From,
        })
    )

    if (to) {
        await ctx.store.insert(
            new AccountTransfer({
                id: `${transfer.id}-to`,
                transfer,
                account: to,
                direction: TransferDirection.To,
            })
        )
    }
}
