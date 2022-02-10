import events from './handlers/event'
import extrins from './handlers/extrinsic'
import { ProcessorConfig } from './common/processorBase'
import { EXTRINSIC_FAILED, EXTRINSIC_SUCCESS } from './common/consts'

export default {
    chainName: 'kusama',
    dataSource: {
        archive: 'https://kusama.indexer.gc.subsquid.io/v4/graphql',
        chain: 'wss://kusama-rpc.polkadot.io',
    },
    typesBundle: 'kusama',
    batchSize: 10,
    eventHandlers: {
        balances: {
            /**
             * Used to handle only success Transfers.
             * Also provide balance info for 'balances.transfer_all' call
             */
            Transfer: {
                handler: events.balances.handleTransfer,
            },
        },
        staking: {
            Rewarded: {
                handler: events.staking.handleRewarded,
            },
            /**
             * Old name of Rewarded event
             */
            Reward: {
                handler: events.staking.handleReward,
            },
            Slashed: {
                handler: events.staking.handleSlashed,
            },
            /**
             * Old name of Slashed event
             */
            Slash: {
                handler: events.staking.handleSlash,
            },
        },
        crowdloan: {
            Contributed: {
                handler: events.crowdloan.handleContributed,
            },
            /**
             * Used to handle crowdloan dissolve.
             * Last crowdloan of paraId parachain will change status to dissolved.
             */
            Dissolved: {
                handler: events.crowdloan.handleDissolved,
            },
        },
    },
    extrinsicsHandlers: {
        crowdloan: {
            /**
             * Used to handle new crowdloan and create them
             */
            create: {
                handler: extrins.crowdloan.handleCreate,
            },
            /**
             * Used only to get success of transaction and fill failed Cuntribute item.
             * Works in pair with 'crowdloan.Contributed' event.
             * Can be removed if you don't need it.
             */
            contribute: {
                handler: extrins.crowdloan.handleContribute,
                options: {
                    triggerEvents: [EXTRINSIC_SUCCESS, EXTRINSIC_FAILED],
                },
            },
        },
        /**
         * Used to hadle validator and era of payout.
         * Works in pair with 'staking.Rewarded' event.
         * Can be removed if you don't need it.
         */
        staking: {
            payout_stakers: {
                handler: extrins.staking.handlePauoutStakers,
            },
        },
        /**
         * Used only to get success of transaction and fill failed Transfers item.
         * Works in pair with 'balances.Transfer' event.
         * Can be removed if you don't need it.
         */
        balances: {
            transfer: {
                handler: extrins.balances.handleTransfer,
                options: {
                    triggerEvents: [EXTRINSIC_SUCCESS, EXTRINSIC_FAILED],
                },
            },
            transfer_keep_alive: {
                handler: extrins.balances.handleTransferKeepAlive,
                options: {
                    triggerEvents: [EXTRINSIC_SUCCESS, EXTRINSIC_FAILED],
                },
            },

            force_transfer: {
                handler: extrins.balances.handleForceTransfer,
                options: {
                    triggerEvents: [EXTRINSIC_SUCCESS, EXTRINSIC_FAILED],
                },
            },
            transfer_all: {
                handler: extrins.balances.handleTransferAll,
                options: {
                    triggerEvents: [EXTRINSIC_SUCCESS, EXTRINSIC_FAILED],
                },
            },
        },
        /**
         * Used to handle 'crowdloan.create' call wrapped in proxy.
         */
        proxy: {
            proxy: {
                handler: extrins.proxy.handleProxy,
            },
        },
        /**
         * Used to handle 'crowdloan.create' call wrapped in as_multi.
         */
        multisig: {
            as_multi: {
                handler: extrins.multisig.handleAsMulti,
            },
        },
    },
    // blockRange: { from: 7567658 }, //proxy
    // blockRange: { from: 8179623 }, //as_multi
    // blockRange: { from: 7828000 },
} as ProcessorConfig
