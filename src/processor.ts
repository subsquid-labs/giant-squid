import config from './config'
import { SubstrateProcessor } from '@subsquid/substrate-processor'
import { DEFAULT_BATCH_SIZE, DEFAULT_PORT, EXTRINSIC_SUCCESS } from './common/consts'
import * as modules from './mappings'
import { EXTRINSIC_FAILED } from './common/consts'

const processor = new SubstrateProcessor(`${config.chainName}-processor`)

processor.setTypesBundle(config.typesBundle)
processor.setBatchSize(config.batchSize || DEFAULT_BATCH_SIZE)
processor.setDataSource(config.dataSource)
processor.setPrometheusPort(config.port || DEFAULT_PORT)
processor.setBlockRange(config.blockRange || { from: 0 })

//events handlers
processor.addEventHandler('balances.Transfer', modules.balances.events.handleTransfer)

processor.addEventHandler('staking.Reward', modules.staking.events.handleReward)
processor.addEventHandler('staking.Slash', modules.staking.events.handleSlash)
processor.addEventHandler('staking.Bonded', modules.staking.events.handleBonded)
processor.addEventHandler('staking.Unbonded', modules.staking.events.handleUnbonded)

//extrinsics handlers
processor.addExtrinsicHandler('staking.payout_stakers', modules.staking.extrinsics.handlePauoutStakers)
processor.addExtrinsicHandler(
    'staking.bond',
    { triggerEvents: [EXTRINSIC_SUCCESS, EXTRINSIC_FAILED] },
    modules.staking.extrinsics.handleBond
)
processor.addExtrinsicHandler(
    'staking.bond_extra',
    { triggerEvents: [EXTRINSIC_SUCCESS, EXTRINSIC_FAILED] },
    modules.staking.extrinsics.handleBondExtra
)
processor.addExtrinsicHandler(
    'staking.unbond',
    { triggerEvents: [EXTRINSIC_SUCCESS, EXTRINSIC_FAILED] },
    modules.staking.extrinsics.handleUnbond
)

processor.addExtrinsicHandler(
    'balances.transfer',
    { triggerEvents: [EXTRINSIC_FAILED] },
    modules.balances.extrinsics.handleTransfer
)
processor.addExtrinsicHandler(
    'balances.transfer_keep_alive',
    { triggerEvents: [EXTRINSIC_FAILED] },
    modules.balances.extrinsics.handleTransferKeepAlive
)
processor.addExtrinsicHandler(
    'balances.force_transfer',
    { triggerEvents: [EXTRINSIC_FAILED] },
    modules.balances.extrinsics.handleForceTransfer
)
processor.addExtrinsicHandler(
    'balances.transfer_all',
    { triggerEvents: [EXTRINSIC_FAILED] },
    modules.balances.extrinsics.handleTransferAll
)

processor.run()
