import * as balanceHandlers from "./eventHandlers/balances"
import * as stakingHandlers from "./eventHandlers/staking"

import { ProcessorConfig } from "../common/processorBase"

const config: ProcessorConfig = {
    chainName: 'kusama',
    idPrefix: 'ksm',
    dataSource: {
        archive: 'https://kusama.indexer.gc.subsquid.io/v4/graphql',
        chain: 'wss://kusama-rpc.polkadot.io'
    },
    typesBundle: 'kusama',
    batchSize: 125,
    port: 3000,
    eventHandlers: {
        //balances
        'balances.Endowed': balanceHandlers.handleEndowedEvent,
        'balances.DustLost': balanceHandlers.handleDustLostEvent,
        'balances.Transfer': balanceHandlers.handleTransferEvent,
        'balances.BalanceSet': balanceHandlers.handleBalanceSetEvent,
        'balances.Reserved': balanceHandlers.handleReservedEvent,
        'balances.Unreserved': balanceHandlers.handleUnreservedEvent,
        'balances.ReserveRepatriated': balanceHandlers.handleReserveRepatriatedEvent,
        'balances.Deposit': balanceHandlers.handleDepositEvent,
        'balances.Withdraw': balanceHandlers.handleWithdrawEvent,
        'balances.Slashed': balanceHandlers.handleSlashedEvent,
        //staking
        'staking.Rewarded': stakingHandlers.handleRewardedEvent,
        'staking.Reward': stakingHandlers.handleRewardEvent,
        'staking.Slashed': stakingHandlers.handleSlashedEvent,
        'staking.Slash': stakingHandlers.handleSlashEvent,
        'staking.Bonded': stakingHandlers.handleBondedEvent,
        'staking.Unbonded': stakingHandlers.handleUnbondedEvent,
        'staking.Withdrawn': stakingHandlers.handleWithdrawnEvent
        //crowdloans
    }
}

export default config
