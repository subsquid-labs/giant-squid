import {
    BatchContext,
    BatchProcessorItem,
    SubstrateBatchProcessor,
    SubstrateBlock,
    SubstrateProcessor,
} from '@subsquid/substrate-processor'
import { DEFAULT_BATCH_SIZE, DEFAULT_PORT } from './common/consts'
import * as modules from './mappings'
import { Store, TypeormDatabase } from '@subsquid/typeorm-store'
import { getConfig } from './configs'
import { Bond, Reward } from './model'

const config = getConfig()
const database = new TypeormDatabase()
const processor = new SubstrateBatchProcessor()
    .setTypesBundle(config.typesBundle)
    .setBatchSize(config.batchSize || DEFAULT_BATCH_SIZE)
    .setDataSource(config.dataSource)
    .setPrometheusPort(config.port || DEFAULT_PORT)
    .setBlockRange(config.blockRange || { from: 0 })

    .addEvent('Staking.Slashed')
    .addEvent('Staking.Slash') //Old name of Slashed event
    .addEvent('Staking.Rewarded', {
        data: {
            event: {
                args: true,
                call: { args: true },
                extrinsic: { hash: true },
            },
        } as const,
    })
    .addEvent('Staking.Reward', {
        data: {
            event: {
                args: true,
                call: { args: true },
                extrinsic: { hash: true },
            },
        },
    }) //Old name of Rewarded event
    .addCall('Staking.bond')
    .addCall('Staking.bond_extra')
    .addCall('Staking.unbond')
    .addCall('Staking.set_controller')
    .addCall('Staking.set_payee')
    .addCall('Staking.nominate')
    .addCall('Staking.validate')
    .addCall('Staking.chill')
    .addEvent('Grandpa.NewAuthorities')

    .addEvent('Crowdloan.Created')
    .addCall('Crowdloan.contribute')

    .addEvent('Balances.Transfer')

    .addCall('System.remark')

    .addCall('XcmPallet.teleport_assets')
    .addCall('XcmPallet.reserve_transfer_assets')

type Item = BatchProcessorItem<typeof processor>
type Context = BatchContext<Store, Item>

processor.run(database, async (ctx) => {})

async function processStaking(ctx: Context) {
    const accountsIds = new Set<string>()
    const stakersIds = new Set<string>()

    const rewards = new Map<number, Reward>()
    const bonds = new Map<number, Bond>()

    processItem(ctx, (block, item) => {
        if (item.kind === 'event') {
            switch (item.name) {
                case 'Staking.Reward':
                case 'Staking.Rewarded':
                    const reward = modules.staking.events.handleRewarded({ ...ctx, block, event: item.event }) // HERE
                    break
            }
        }
    })
}

function processItem<I>(ctx: BatchContext<any, I>, fn: (block: SubstrateBlock, item: I) => void) {
    for (let block of ctx.blocks) {
        for (let item of block.items) {
            fn(block.header, item)
        }
    }
}
