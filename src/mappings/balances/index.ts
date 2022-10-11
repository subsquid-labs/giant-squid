import { BatchBlock, BatchContext, CommonHandlerContext } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Store } from '@subsquid/typeorm-store'
import { In } from 'typeorm'
import { BlockMap } from '../../common/blockMap'
import { MappingProcessor } from '../../common/mappingProcessor'
import { createEntityMap, last, processItem } from '../../common/tools'
import { Account, AccountTransfer, Transfer, TransferDirection } from '../../model'
import { getMeta } from '../util/actions'
import * as extrinsics from './calls'
import { processTransfer, TransferData } from './events/transfer'

export default {
    extrinsics,
}

export class BalancesProcessor extends MappingProcessor<Item> {
    async run(blocks: BatchBlock<Item>[]) {
        const { transfersData } = this.processItems(blocks)

        let transfers = await this.processTransfers(transfersData)
        let accountTransfers = transfers
            .map((transfer) => {
                return [
                    new AccountTransfer({
                        id: transfer.id + '-to',
                        transfer,
                        accountId: transfer.toId,
                        direction: TransferDirection.To,
                    }),
                    new AccountTransfer({
                        id: transfer.id + '-from',
                        transfer,
                        accountId: transfer.fromId,
                        direction: TransferDirection.From,
                    }),
                ]
            })
            .flat()

        let accountIds = new Set<string>()
        for (const transfer of transfers) {
            accountIds.add(transfer.fromId)
            accountIds.add(transfer.toId)
        }

        const lastBlock = last(blocks).header

        let accounts = await this.ctx.store.findBy(Account, { id: In([...accountIds]) }).then(createEntityMap)
        for (const id of accountIds) {
            if (accounts.has(id)) continue
            accounts.set(id, createAccount(id))
        }
        await updateAccounts(this.createContext(lastBlock), [...accounts.values()])

        await this.ctx.store.save([...accounts.values()])
        await this.ctx.store.insert(transfers)
        await this.ctx.store.insert(accountTransfers)
    }

    private processItems(blocks: BatchBlock<Item>[]) {
        let transfersData = new BlockMap<TransferData>()

        processItem(blocks, (block, item) => {
            switch (item.name) {
                case 'Balances.Transfer':
                    const transfer = processTransfer({ ...this.ctx, block, event: item.event as any })
                    if (transfer) transfersData.push(block, transfer)
                    return
            }
        })

        return {
            transfersData,
        }
    }

    private async processTransfers(transfersData: BlockMap<TransferData>) {
        return Promise.all(
            transfersData.entriesArray().map(async ([, blockTransfersData]) => {
                return blockTransfersData.map((transferData) => {
                    const { from, to, amount } = transferData
                    return new Transfer({
                        ...getMeta(transferData),
                        fromId: from,
                        toId: to,
                        amount,
                    })
                })
            })
        ).then((data) => data.flat())
    }
}

function createAccount(id: string) {
    return new Account({
        id: id,
        syncedAt: -1,
    })
}

async function updateAccounts(ctx: CommonHandlerContext<Store>, accountsList: Account[]) {
    const accounts = accountsList.filter((s) => s.syncedAt < ctx.block.height)

    accounts.forEach((s) => (s.syncedAt = ctx.block.height))
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
