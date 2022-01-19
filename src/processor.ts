import * as balanceHandlers from "./handlers/balances"
import * as stakingHandlers from "./handlers/staking"

import { Store, SubstrateProcessor } from "@subsquid/substrate-processor"

const processor = new SubstrateProcessor('polkadot_balances')


processor.setTypesBundle('polkadot')
processor.setBatchSize(125)

processor.setDataSource({
    archive: 'https://polkadot.indexer.gc.subsquid.io/v4/graphql',
    chain: 'wss://rpc.polkadot.io'
})
//{range: {from:6661791 }}
processor.addEventHandler('balances.Endowed', balanceHandlers.handleEndowedEvent)
processor.addEventHandler('balances.DustLost', balanceHandlers.handleDustLostEvent)
processor.addEventHandler('balances.Transfer', balanceHandlers.handleTransferEvent)
processor.addEventHandler('balances.BalanceSet', balanceHandlers.handleBalanceSetEvent)
processor.addEventHandler('balances.Reserved', balanceHandlers.handleReservedEvent)
processor.addEventHandler('balances.Unreserved', balanceHandlers.handleUnreservedEvent)
processor.addEventHandler('balances.ReserveRepatriated', balanceHandlers.handleReserveRepatriatedEvent)
processor.addEventHandler('balances.Deposit', balanceHandlers.handleDepositEvent)
processor.addEventHandler('balances.Withdraw', balanceHandlers.handleWithdrawEvent)
processor.addEventHandler('balances.Slashed', balanceHandlers.handleSlashedEvent)

processor.addEventHandler('staking.Rewarded', stakingHandlers.handleRewardedEvent)
processor.addEventHandler('staking.Reward', (ctx) => stakingHandlers.handleRewardedEvent(ctx, true))
processor.addEventHandler('staking.Slashed', stakingHandlers.handleSlashedEvent)
processor.addEventHandler('staking.Slash', (ctx) => stakingHandlers.handleSlashedEvent(ctx, true))
processor.addEventHandler('staking.Bonded', stakingHandlers.handleBondedEvent)
processor.addEventHandler('staking.Unbonded', stakingHandlers.handleUnbondedEvent)
processor.addEventHandler('staking.Withdrawn', stakingHandlers.handleWithdrawnEvent)

processor.run()