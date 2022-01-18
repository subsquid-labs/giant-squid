import * as balanceHandlers from "./handlers/balances"
import * as stakingHandlers from "./handlers/staking"

import { Store, SubstrateProcessor } from "@subsquid/substrate-processor"

const processor = new SubstrateProcessor('polkadot_balances')


processor.setTypesBundle('polkadot')
processor.setBatchSize(500)


processor.setDataSource({
    archive: 'https://polkadot.indexer.gc.subsquid.io/v4/graphql',
    chain: 'wss://rpc.polkadot.io'
})

processor.addEventHandler('balances.Endowed',{range: {from:6661791 }}, balanceHandlers.handleEndowedEvent)
processor.addEventHandler('balances.DustLost',{range: {from:6661791 }}, balanceHandlers.handleDustLostEvent)
processor.addEventHandler('balances.Transfer',{range: {from:6661791 }}, balanceHandlers.handleTransferEvent)
processor.addEventHandler('balances.BalanceSet',{range: {from:6661791 }}, balanceHandlers.handleBalanceSetEvent)
processor.addEventHandler('balances.Reserved',{range: {from:6661791 }}, balanceHandlers.handleReservedEvent)
processor.addEventHandler('balances.Unreserved',{range: {from:6661791 }}, balanceHandlers.handleUnreservedEvent)
processor.addEventHandler('balances.ReserveRepatriated',{range: {from:6661791 }}, balanceHandlers.handleReserveRepatriatedEvent)
processor.addEventHandler('balances.Deposit',{range: {from:6661791 }}, balanceHandlers.handleDepositEvent)
processor.addEventHandler('balances.Withdraw',{range: {from:6661791 }}, balanceHandlers.handleWithdrawEvent)
processor.addEventHandler('balances.Slashed',{range: {from:6661791 }}, balanceHandlers.handleSlashedEvent)

processor.addEventHandler('staking.Rewarded',{range: {from:6661791 }}, stakingHandlers.handleRewardedEvent)
processor.addEventHandler('staking.Reward',{range: {from:6661791 }}, (ctx) => stakingHandlers.handleRewardedEvent(ctx, true))
processor.addEventHandler('staking.Slashed',{range: {from:6661791 }}, stakingHandlers.handleSlashedEvent)
processor.addEventHandler('staking.Slash',{range: {from:6661791 }}, (ctx) => stakingHandlers.handleSlashedEvent(ctx, true))
processor.addEventHandler('staking.Bonded',{range: {from:6661791 }}, stakingHandlers.handleBondedEvent)
processor.addEventHandler('staking.Unbonded',{range: {from:6661791 }}, stakingHandlers.handleUnbondedEvent)
processor.addEventHandler('staking.Withdrawn',{range: {from:6661791 }}, stakingHandlers.handleWithdrawnEvent)

processor.run()


async function getOrCreate<T extends { id: string }>(
    store: Store,
    entityConstructor: EntityConstructor<T>,
    id: string
): Promise<T> {

    let e = await store.get<T>(entityConstructor, {
        where: { id },
    })

    if (e == null) {
        e = new entityConstructor()
        e.id = id
    }

    return e
}


type EntityConstructor<T> = {
    new(...args: any[]): T
}
