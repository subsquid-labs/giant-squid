import {
    CallHandlerContext,
    EventHandlerContext,
    SubstrateBatchProcessor,
    SubstrateCall,
    SubstrateEvent,
    SubstrateExtrinsic,
} from '@subsquid/substrate-processor'
import { Store, TypeormDatabase } from '@subsquid/typeorm-store'
import * as mappings from './mappings'

const processor = new SubstrateBatchProcessor()
processor.setTypesBundle('astar')
processor.setDataSource({
    archive: 'https://astar.archive.subsquid.io/graphql',
    chain: 'wss://rpc.astar.network',
})

processor.addEvent('DappsStaking.Reward')
processor.addEvent('DappsStaking.BondAndStake')
processor.addEvent('DappsStaking.UnbondAndUnstake')
processor.addEvent('DappsStaking.UnbondUnstakeAndWithdraw')
processor.addEvent('DappsStaking.NewDappStakingEra')
processor.addEvent('DappsStaking.ContractRemoved')
processor.addEvent('DappsStaking.NewContract')
processor.addEvent('DappsStaking.Withdrawn')
processor.addEvent('DappsStaking.NominationTransfer')
processor.addEvent('DappsStaking.WithdrawFromUnregistered')

// processor.addCall('Balances.transfer')
// processor.addCall('Balances.force_transfer')
// processor.addCall('Balances.transfer_keep_alive')
// processor.addCall('Balances.transfer_all')

processor.run(new TypeormDatabase(), async (ctx) => {
    for (const block of ctx.blocks) {
        for (const item of block.items) {
            if (item.kind === 'event') {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                // ctx.log.info([block.header.height, block.header.hash, item.name, (item.event as SubstrateEvent).args])
                await processEventItems({
                    ...ctx,
                    block: block.header,
                    event: item.event as SubstrateEvent,
                })
            }
            // else if (item.kind === 'call') {
            //     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            //     // ctx.log.info([block.header.height, block.header.hash, item.name, (item.event as SubstrateEvent).args])
            //     await processCallItems({
            //         ...ctx,
            //         block: block.header,
            //         call: item.call as SubstrateCall,
            //         extrinsic: item .extrinsic as SubstrateExtrinsic
            //     })
            // }
        }
    }
})

async function processEventItems(ctx: EventHandlerContext<Store>) {
    ctx.log.debug(`!DEBGUG EVENT! ${ctx.event.id} ${ctx.event.name} ${ctx.event.args.toString()}`)
    switch (ctx.event.name) {
        case 'DappsStaking.Reward': {
            await mappings.dAppsStaking.events.handleReward(ctx)
            break
        }
        case 'DappsStaking.BondAndStake': {
            await mappings.dAppsStaking.events.handleBond(ctx)
            break
        }
        case 'DappsStaking.UnbondAndUnstake': {
            await mappings.dAppsStaking.events.handleUnbondAndUnstake(ctx)
            break
        }
        case 'DappsStaking.UnbondUnstakeAndWithdraw': {
            await mappings.dAppsStaking.events.handleUnbondUnstakeAndWithdrawn(ctx)
            break
        }
        case 'DappsStaking.NewDappStakingEra': {
            await mappings.dAppsStaking.events.handleNewEra(ctx)
            break
        }
        case 'DappsStaking.ContractRemoved': {
            await mappings.dAppsStaking.events.handlerContractRemoved(ctx)
            break
        }
        case 'DappsStaking.NewContract': {
            await mappings.dAppsStaking.events.handlerNewContract(ctx)
            break
        }
        case 'DappsStaking.Withdrawn': {
            await mappings.dAppsStaking.events.handleWithdrawn(ctx)
            break
        }
        case 'DappsStaking.NominationTransfer': {
            await mappings.dAppsStaking.events.handleNominationTransfer(ctx)
            break
        }
        case 'DappsStaking.WithdrawFromUnregistered': {
            await mappings.dAppsStaking.events.handleWithrawFromUnregistered(ctx)
            break
        }
        default:
    }
}

// async function processCallItems(ctx: CallHandlerContext<Store>) {
//     switch (ctx.call.name) {
//         case 'Balances.transfer': {
//             await mappings.balances.extrinsics.handleTransfer(ctx)
//             break
//         }
//         case 'Balances.force_transfer': {
//             await mappings.balances.extrinsics.handleForceTransfer(ctx)
//             break
//         }
//         case 'Balances.transfer_keep_alive': {
//             await mappings.balances.extrinsics.handleTransferKeepAlive(ctx)
//             break
//         }
//         case 'Balances.transfer_all': {
//             await mappings.balances.extrinsics.handleTransferAll(ctx)
//             break
//         }

//         default:
//     }
//}
