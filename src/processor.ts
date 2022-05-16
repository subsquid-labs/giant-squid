import config from './config'
import { SubstrateProcessor } from '@subsquid/substrate-processor'
import { DEFAULT_BATCH_SIZE, DEFAULT_PORT, EXTRINSIC_FAILED } from './common/consts'
import * as modules from './mappings'

const processor = new SubstrateProcessor(`${config.chainName}-processor`)

processor.setTypesBundle(config.typesBundle)
processor.setBatchSize(config.batchSize || DEFAULT_BATCH_SIZE)
processor.setDataSource(config.dataSource)
processor.setPrometheusPort(config.port || DEFAULT_PORT)
processor.setBlockRange(config.blockRange || { from: 0 })

//events handlers
processor.addEventHandler('balances.Transfer', modules.balances.events.handleTransfer)

processor.addEventHandler('parachainStaking.NewRound', modules.staking.events.handleNewRound)
processor.addEventHandler('parachainStaking.Rewarded', modules.staking.events.handleRewarded)
processor.addEventHandler('parachainStaking.CandidateBondedMore', modules.staking.events.handleBondedMore)
processor.addEventHandler('parachainStaking.CandidateBondedLess', modules.staking.events.handleBondedLess)
processor.addEventHandler('parachainStaking.Delegation', modules.staking.events.handleDelegation)
processor.addEventHandler('parachainStaking.DelegationDecreased', modules.staking.events.handleDelegationDecreased)
processor.addEventHandler('parachainStaking.DelegationIncreased', modules.staking.events.handleDelegationIncreased)
processor.addEventHandler('parachainStaking.DelegationRevoked', modules.staking.events.handleDelegationRevoked)
processor.addEventHandler('parachainStaking.DelegatorLeft', modules.staking.events.handleDelegatorLeft)
processor.addEventHandler(
    'parachainStaking.DelegatorLeftCandidate',
    modules.staking.events.handleDelegatorLeftCandidate
)
processor.addEventHandler('parachainStaking.CandidateLeft', modules.staking.events.handleCandidateLeft)
processor.addEventHandler(
    'parachainStaking.JoinedCollatorCandidates',
    modules.staking.events.handleJoinedCollatorCandidates
)

//old events
processor.addEventHandler('parachainStaking.CollatorBondedMore', modules.staking.events.old.handleCollatorBondedMore)
processor.addEventHandler('parachainStaking.CollatorBondedLess', modules.staking.events.old.handleCollatorBondedLess)
processor.addEventHandler('parachainStaking.Nomination', modules.staking.events.old.handleNomination)
processor.addEventHandler('parachainStaking.NominationDecreased', modules.staking.events.old.handleNominationDecreased)
processor.addEventHandler('parachainStaking.NominationIncreased', modules.staking.events.old.handleNominationIncreased)
processor.addEventHandler('parachainStaking.NominatorLeft', modules.staking.events.old.handleNominatorLeft)
processor.addEventHandler(
    'parachainStaking.NominatorLeftCollator',
    modules.staking.events.old.handleNominatorLeftCandidate
)
processor.addEventHandler('parachainStaking.CollatorLeft', modules.staking.events.old.handleCollatorLeft)

//extrinsics handlers
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
