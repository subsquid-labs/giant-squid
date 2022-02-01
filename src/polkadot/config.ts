// import * as balances from "./eventHandlers/balances"
// import * as staking from "./eventHandlers/staking"
import events from "./eventHandlers"
import extrins from "./extrinsicHandlers"

import { ProcessorConfig } from "../common/processorBase"

const config: ProcessorConfig = {
    chainName: 'polkadot',
    idPrefix: 'dot',
    dataSource: {
        archive: 'https://polkadot.indexer.gc.subsquid.io/v4/graphql',
        chain: 'wss://rpc.polkadot.io'
    },
    typesBundle: 'polkadot',
    batchSize: 10,
    port: 3001,
    eventHandlers: {
        //balances
        'balances.Endowed': events.balances.handleEndowedEvent,
        'balances.DustLost': events.balances.handleDustLostEvent,
        'balances.Transfer': events.balances.handleTransferEvent,
        'balances.BalanceSet': events.balances.handleBalanceSetEvent,
        'balances.Reserved': events.balances.handleReservedEvent,
        'balances.Unreserved': events.balances.handleUnreservedEvent,
        'balances.ReserveRepatriated': events.balances.handleReserveRepatriatedEvent,
        'balances.Deposit': events.balances.handleDepositEvent,
        'balances.Withdraw': events.balances.handleWithdrawEvent,
        'balances.Slashed': events.balances.handleSlashedEvent,
        //staking
        'staking.Rewarded': events.staking.handleRewardedEvent,
        'staking.Reward': events.staking.handleRewardEvent,
        'staking.Slashed': events.staking.handleSlashedEvent,
        'staking.Slash': events.staking.handleSlashEvent,
        'staking.Bonded': events.staking.handleBondedEvent,
        'staking.Unbonded': events.staking.handleUnbondedEvent,
        'staking.Withdrawn': events.staking.handleWithdrawnEvent,
        //crowdloans
        "crowdloan.Contributed": events.crowdloan.handleContributed,
        // "crowdloan.Dissolved"
    },
    extrinsicsHandlers: {
        'crowdloan.create': extrins.crowdloan.handleCreate
    }
}

export default config
