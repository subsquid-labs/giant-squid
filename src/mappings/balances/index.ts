import { BatchContext, CommonHandlerContext } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Store } from '@subsquid/typeorm-store'
import { In } from 'typeorm'
import { createEntityMap, last, processItem } from '../../common/tools'
import { Account, AccountTransfer, Transfer, TransferDirection } from '../../model'
import { getMeta } from '../util/actions'
import * as extrinsics from './calls'
import { processTransfer, TransferData } from './events/transfer'

export default {
    extrinsics,
}

export async function processBalances(ctx: BatchContext<Store, Item>) {
    let transfersData = new Array<TransferData>()

    processItem(ctx, (block, item) => {
        if (item.name == 'Balances.Transfer') {
            const transfer = processTransfer({ ...ctx, block, event: item.event as any })
            transfersData.push(transfer)
        }
    })

    let accountIds = new Set<string>()

    let transfers: Transfer[] = []
    let accountTransfers: AccountTransfer[] = []
    for (let t of transfersData) {
        const transfer = new Transfer({
            ...getMeta(t),
            fromId: t.from,
            toId: t.to,
            amount: t.amount,
        })
        transfers.push(transfer)
        accountTransfers.push(
            new AccountTransfer({
                id: t.id + '-from',
                transfer,
                accountId: t.from,
                direction: TransferDirection.From,
            })
        )
        accountTransfers.push(
            new AccountTransfer({
                id: t.id + '-to',
                transfer,
                accountId: t.to,
                direction: TransferDirection.To,
            })
        )
        accountIds.add(t.from)
        accountIds.add(t.to)
    }

    let accounts = await ctx.store.findBy(Account, { id: In([...accountIds]) }).then(createEntityMap)
    for (const id of accountIds) {
        if (accounts.has(id)) continue
        accounts.set(id, createAccount(id))
    }
    await updateAccounts({ ...ctx, block: last(ctx.blocks).header }, [...accounts.values()])

    await ctx.store.save([...accounts.values()])
    await ctx.store.insert(transfers)
    await ctx.store.insert(accountTransfers)
}

function createAccount(id: string) {
    return new Account({
        id: id,
        updatedAt: -1,
    })
}

async function updateAccounts(ctx: CommonHandlerContext<Store>, accountsList: Account[]) {
    const accounts = accountsList.filter((s) => s.updatedAt < ctx.block.height)

    accounts.forEach((s) => (s.updatedAt = ctx.block.height))
}

type Item = EventItem<
    'Balances.Transfer',
    {
        event: {
            args: true
            extrinsic: { hash: true }
        }
    }
>
