// import * as balances from "./eventHandlers/balances"
// import * as staking from "./eventHandlers/staking"
import events from "./eventHandlers"
import extrins from "./extrinsicHandlers"

import { ProcessorConfig } from "./common/processorBase"

const config: ProcessorConfig = {
    chainName: 'polkadot',
    dataSource: {
        archive: 'https://polkadot.indexer.gc.subsquid.io/v4/graphql',
        chain: 'wss://rpc.polkadot.io'
    },
    typesBundle: 'polkadot',
    batchSize: 100,
    eventHandlers: {
        'balances': {
            'Transfer': {
                handler: events.balances.handleTransfer
            }
        },
        'staking': {
            'Rewarded': {
                handler: events.staking.handleRewarded
            },
            'Reward': {
                handler: events.staking.handleReward
            },
        }
    },
    extrinsicsHandlers: {
        'crowdloan': {
            'create': {
                handler: extrins.crowdloan.handleCreate
            },
        },
        'staking': {
            'payout_stakers': {
                handler: extrins.staking.handlePauoutStakers
            }
        },
        'balances': {
            'transfer': {
                handler: extrins.balances.handleTransfer,
                options: {
                    triggerEvents: ['system.ExtrinsicSuccess', 'system.ExtrinsicFailed']
                }
            },
            'transfer_keep_alive': {
                handler: extrins.balances.handleTransferKeepAlive,
                options: {
                    triggerEvents: ['system.ExtrinsicSuccess', 'system.ExtrinsicFailed']
                }
            },
            'force_transfer': {
                handler: extrins.balances.handleForceTransfer,
                options: {
                    triggerEvents: ['system.ExtrinsicSuccess', 'system.ExtrinsicFailed']
                }
            },
            'transfer_all': {
                handler: extrins.balances.handleTransferAll,
                options: {
                    triggerEvents: ['system.ExtrinsicSuccess', 'system.ExtrinsicFailed']
                }
            },
        }
        // 'proxy.proxy': {
        //     handler: extrins.proxy.handleProxy
        // },
    },
    // blockRange: { from: 8924645 }
}

export default config
