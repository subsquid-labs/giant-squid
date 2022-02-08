// import * as balances from "./eventHandlers/balances"
// import * as staking from "./eventHandlers/staking"
import events from "./handlers/event"
import extrins from "./handlers/extrinsic"

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
            'Slashed': {
                handler: events.staking.handleSlashed
            },
            'Slash': {
                handler: events.staking.handleSlash
            },
        },
        'crowdloan':{
            'Dissolved': {
                handler: events.crowdloan.handleDissolved
            }
        }
    },
    extrinsicsHandlers: {
        'crowdloan': {
            'create': {
                handler: extrins.crowdloan.handleCreate,
            },
            'contribute': {
                handler: extrins.crowdloan.handleContribute,

            }
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
        },
        'proxy': {
            'proxy': {
                handler: extrins.proxy.handleProxy
            },
        },
    },
    // blockRange: { from: 7567658 }
}
export default config
