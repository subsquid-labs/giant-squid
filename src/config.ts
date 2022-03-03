/* eslint-disable sonarjs/no-duplicate-string */
import modules from './handlers'
import { ProcessorConfig } from './common/processorBase'
import { EXTRINSIC_FAILED, EXTRINSIC_SUCCESS } from './common/consts'

export default {
    chainName: 'kusama',
    prefix: 'kusama',
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
                handler: modules.balances.events.handleTransfer,
            },
        },
        staking: {
            Rewarded: {
                handler: modules.staking.events.handleRewarded,
            },
            /**
             * Old name of Rewarded event
             */
            Reward: {
                handler: modules.staking.events.handleReward,
            },
            Slashed: {
                handler: modules.staking.events.handleSlashed,
            },
            /**
             * Old name of Slashed event
             */
            Slash: {
                handler: modules.staking.events.handleSlash,
            },
            Bonded: {
                handler: modules.staking.events.handleBonded,
            },
            Unbonded: {
                handler: modules.staking.events.handleUnbonded,
            },
        },
        crowdloan: {
            Contributed: {
                handler: modules.crowdloan.events.handleContributed,
            },
            /**
             * Used to handle crowdloan dissolve.
             * Last crowdloan of paraId parachain will change status to dissolved.
             */
            Dissolved: {
                handler: modules.crowdloan.events.handleDissolved,
            },
        },
    },
    extrinsicsHandlers: {
        crowdloan: {
            /**
             * Used to handle new crowdloan and create them
             */
            create: {
                handler: modules.crowdloan.extrinsics.handleCreate,
                options: {
                    triggerEvents: ['crowdloan.Created'],
                },
            },
            /**
             * Used only to get result of transaction and fill failed Cuntribute item.
             * Works in pair with 'crowdloan.Contributed' event.
             * Can be removed if you don't need it.
             */
            contribute: {
                handler: modules.crowdloan.extrinsics.handleContribute,
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
                handler: modules.staking.extrinsics.handlePauoutStakers,
            },
            bond: {
                handler: modules.staking.extrinsics.handleBond,
            },
            bond_extra: {
                handler: modules.staking.extrinsics.handleBondExtra,
            },
            unbund: {
                handler: modules.staking.extrinsics.handleUnbond,
            },
        },
        /**
         * Used only to get result of transaction and fill failed Transfers item.
         * Works in pair with 'balances.Transfer' event.
         * Can be removed if you don't need it.
         */
        balances: {
            transfer: {
                handler: modules.balances.extrinsics.handleTransfer,
                options: {
                    triggerEvents: [EXTRINSIC_SUCCESS, EXTRINSIC_FAILED],
                },
            },
            transfer_keep_alive: {
                handler: modules.balances.extrinsics.handleTransferKeepAlive,
                options: {
                    triggerEvents: [EXTRINSIC_SUCCESS, EXTRINSIC_FAILED],
                },
            },
            force_transfer: {
                handler: modules.balances.extrinsics.handleForceTransfer,
                options: {
                    triggerEvents: [EXTRINSIC_SUCCESS, EXTRINSIC_FAILED],
                },
            },
            transfer_all: {
                handler: modules.balances.extrinsics.handleTransferAll,
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
                handler: modules.proxy.extrinsics.handleProxy,
                options: {
                    triggerEvents: ['crowdloan.Created'],
                },
            },
        },
        /**
         * Used to handle 'crowdloan.create' call wrapped in as_multi.
         */
        multisig: {
            as_multi: {
                handler: modules.multisig.extrinsics.handleAsMulti,
                options: {
                    triggerEvents: ['crowdloan.Created'],
                },
            },
        },
    },
    // blockRange: { from: 7567658 }, //proxy
    // blockRange: { from: 8179623 }, //as_multi
    // blockRange: { from: 7828000 },
} as ProcessorConfig
