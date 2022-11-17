import { CommonHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { ArrayContains, In, MoreThanOrEqual } from 'typeorm'
import {
    Account,
    AccountTransfer,
    DAppContract,
    DAppStakeState,
    Staker,
    Transfer,
    TransferAssetToken,
    TransferDirection,
    TransferLocationAccount,
    TransferType,
} from '../../model'
import { ActionData } from '../types/data'
import { createPrevStorageContext, getMeta } from './actions'

export async function getOrCreateAccount(ctx: CommonHandlerContext<Store>, id: string): Promise<Account> {
    let account = await ctx.store.get(Account, id)
    if (!account) {
        account = new Account({
            id,
            lastUpdateBlock: ctx.block.height - 1,
        })
        ctx.log.debug('CREATED')
        await ctx.store.insert(account)
    }
    ctx.log.debug(account)
    return account
}

export async function getOrCreateStaker(ctx: CommonHandlerContext<Store>, id: string): Promise<Staker> {
    let staker = await ctx.store.get(Staker, { where: { id }, relations: { stash: true } })
    if (!staker) {
        staker = new Staker({
            id,
            stash: await getOrCreateAccount(ctx, id),
            activeBond: 0n,
            totalReward: 0n,
            unbondingVolume: 0n,
        })
        ctx.log.debug('CREATED')
        await ctx.store.insert(staker)
    }
    ctx.log.debug(staker)
    return staker
}

export interface TransferData extends ActionData {
    fromId: string
    toId: string | null
    amount: bigint
    success: boolean
    type: TransferType
}

export async function saveTransfer(ctx: CommonHandlerContext<Store>, data: TransferData) {
    const { fromId, toId, amount, success, type } = data

    const from = await getOrCreateAccount(ctx, fromId)
    const to = toId ? await getOrCreateAccount(ctx, toId) : null

    const transfer = new Transfer({
        ...getMeta(data),
        from: new TransferLocationAccount({
            id: fromId,
        }),
        to: toId
            ? new TransferLocationAccount({
                  id: toId,
              })
            : null,
        asset: new TransferAssetToken({
            symbol: 'KSM',
            amount,
        }),
        success,
        type,
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

export async function getOrCreateStakeState(
    ctx: CommonHandlerContext<Store>,
    staker: Staker,
    contract: DAppContract
): Promise<DAppStakeState> {
    const id = `${staker.id}-${contract.id}`
    let stakeState = await ctx.store.get(DAppStakeState, id)
    if (!stakeState) {
        stakeState = new DAppStakeState({
            id,
            staker: staker,
            contract: contract,
            stakeVolume: 0n,
        })
        ctx.store.insert(stakeState)
    }
    return stakeState
}
