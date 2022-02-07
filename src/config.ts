// import * as balances from "./eventHandlers/balances"
// import * as staking from "./eventHandlers/staking"
import events from "./eventHandlers"
import extrins from "./extrinsicHandlers"

import { ProcessorConfig } from "./common/processorBase"

const config: ProcessorConfig = {
    chainName: 'polkadot',
    idPrefix: 'dot',
    dataSource: {
        archive: 'https://polkadot.indexer.gc.subsquid.io/v4/graphql',
        chain: 'wss://rpc.polkadot.io'
    },
    typesBundle: 'polkadot',
    batchSize: 100,
    eventHandlers: {
        //balances
        // 'balances.Endowed': events.balances.handleEndowedEvent,
        // 'balances.DustLost': events.balances.handleDustLostEvent,
        'balances.Transfer': {
            handler: events.balances.handleTransfer
        },
        // 'balances.BalanceSet': events.balances.handleBalanceSetEvent,
        // 'balances.Reserved': events.balances.handleReservedEvent,
        // 'balances.Unreserved': events.balances.handleUnreservedEvent,
        // 'balances.ReserveRepatriated': events.balances.handleReserveRepatriatedEvent,
        // 'balances.Deposit': events.balances.handleDepositEvent,
        // 'balances.Withdraw': events.balances.handleWithdrawEvent,
        // 'balances.Slashed': events.balances.handleSlashedEvent,
        //staking
        // 'staking.Rewarded': events.staking.handleRewardedEvent,
        // 'staking.Reward': events.staking.handleRewardEvent,
        // 'staking.Slashed': events.staking.handleSlashedEvent,
        // 'staking.Slash': events.staking.handleSlashEvent,
        // 'staking.Bonded': events.staking.handleBondedEvent,
        // 'staking.Unbonded': events.staking.handleUnbondedEvent,
        // 'staking.Withdrawn': events.staking.handleWithdrawnEvent,
        //crowdloans
        // "crowdloan.Contributed": events.crowdloan.handleContributed,
        // "crowdloan.Dissolved"
    },
    extrinsicsHandlers: {
        // 'crowdloan.create': extrins.crowdloan.handleCreate,
        // 'proxy.proxy': extrins.proxy.handleProxy.
        'balances.transfer': {
            handler: extrins.balances.handleTransfer,
            options: {
                triggerEvents: ['system.ExtrinsicSuccess', 'system.ExtrinsicFailed']
            }
        },
        'balances.transfer_keep_alive': {
            handler: extrins.balances.handleTransferKeepAlive,
            options: {
                triggerEvents: ['system.ExtrinsicSuccess', 'system.ExtrinsicFailed']
            }
        },
        'balances.force_transfer': {
            handler: extrins.balances.handleForceTransfer,
            options: {
                triggerEvents: ['system.ExtrinsicSuccess', 'system.ExtrinsicFailed']
            }
        },
        'balances.transfer_all': {
            handler: extrins.balances.handleTransferAll,
            options: {
                triggerEvents: ['system.ExtrinsicSuccess', 'system.ExtrinsicFailed']
            }
        },
        
    },
    // blockRange: { from: 7567600 }
}

export default config
