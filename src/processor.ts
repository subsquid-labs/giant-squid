import config from './config'
import { SubstrateProcessor } from '@subsquid/substrate-processor'
import { DEFAULT_BATCH_SIZE, DEFAULT_PORT, EXTRINSIC_SUCCESS } from './common/consts'
import * as modules from './mappings'
import { EXTRINSIC_FAILED } from './common/consts'

const processor = new SubstrateProcessor(`${config.chainName}-explorer`)

processor.setTypesBundle(config.typesBundle)
processor.setBatchSize(config.batchSize || DEFAULT_BATCH_SIZE)
processor.setDataSource(config.dataSource)
processor.setPrometheusPort(config.port || DEFAULT_PORT)
processor.setBlockRange(config.blockRange || { from: 0 })

//event handlers
processor.addEventHandler('dappsStaking.Reward', modules.dAppsStaking.events.handleReward)
processor.addEventHandler('dappsStaking.BondAndStake', modules.dAppsStaking.events.handleBonded)
processor.addEventHandler('dappsStaking.UnbondUnstakeAndWithdraw', modules.dAppsStaking.events.handleUnbonded)

//extrinsics handlers
processor.addExtrinsicHandler(
    'balances.transfer',
    { triggerEvents: [EXTRINSIC_SUCCESS, EXTRINSIC_FAILED] },
    modules.balances.extrinsics.handleTransfer
)
processor.addExtrinsicHandler(
    'balances.transfer_keep_alive',
    { triggerEvents: [EXTRINSIC_SUCCESS, EXTRINSIC_FAILED] },
    modules.balances.extrinsics.handleTransferKeepAlive
)
processor.addExtrinsicHandler(
    'balances.force_transfer',
    { triggerEvents: [EXTRINSIC_SUCCESS, EXTRINSIC_FAILED] },
    modules.balances.extrinsics.handleForceTransfer
)
processor.addExtrinsicHandler(
    'balances.transfer_all',
    { triggerEvents: [EXTRINSIC_SUCCESS, EXTRINSIC_FAILED] },
    modules.balances.extrinsics.handleTransferAll
)

// processor.addExtrinsicHandler(
//     'dappsStaking.bond_and_stake',
//     { triggerEvents: [EXTRINSIC_FAILED] },
//     modules.dAppsStaking.extrinsics.handleBond
// )
// processor.addExtrinsicHandler(
//     'dappsStaking.unbond_unstake_and_withdraw',
//     { triggerEvents: [EXTRINSIC_FAILED] },
//     modules.dAppsStaking.extrinsics.handleUnbond
// )

processor.run()
