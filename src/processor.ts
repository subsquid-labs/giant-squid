import { SubstrateBatchProcessor } from '@subsquid/substrate-processor'
import { DEFAULT_BATCH_SIZE, DEFAULT_PORT } from './common/consts'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import { getConfig } from './configs'
import { StakingProcessor } from './mappings/staking'
import { BalancesProcessor } from './mappings/balances'
import { CrowdloansProcessor } from './mappings/crowdloan'

const config = getConfig()
const database = new TypeormDatabase()
const processor = new SubstrateBatchProcessor()
    .setTypesBundle(config.typesBundle)
    .setBatchSize(config.batchSize || DEFAULT_BATCH_SIZE)
    .setDataSource(config.dataSource)
    .setPrometheusPort(config.port || DEFAULT_PORT)
    .setBlockRange(config.blockRange || { from: 0 })

    .addEvent('Balances.Transfer', {
        data: {
            event: {
                args: true,
                extrinsic: { hash: true },
            },
        } as const,
    })
    .addEvent('Staking.Slashed', {
        data: {
            event: {
                args: true,
                extrinsic: { hash: true },
            },
        } as const,
    })
    //Old name of Slashed event
    .addEvent('Staking.Slash', {
        data: {
            event: {
                args: true,
                extrinsic: { hash: true },
            },
        } as const,
    })
    .addEvent('Staking.Rewarded', {
        data: {
            event: {
                args: true,
                call: { args: true },
                extrinsic: { hash: true },
            },
        } as const,
    })
    //Old name of Rewarded event
    .addEvent('Staking.Reward', {
        data: {
            event: {
                args: true,
                call: { args: true },
                extrinsic: { hash: true },
            },
        },
    })
    .addEvent('Staking.Bonded', {
        data: {
            event: {
                args: true,
                extrinsic: { hash: true },
            },
        } as const,
    })
    .addEvent('Staking.Unbonded', {
        data: {
            event: {
                args: true,
                extrinsic: { hash: true },
            },
        } as const,
    })
    // .addCall('Staking.bond')
    // .addCall('Staking.bond_extra')
    // .addCall('Staking.unbond')
    .addCall('Staking.set_controller')
    .addCall('Staking.set_payee')
    .addCall('Staking.nominate')
    .addCall('Staking.validate')
    .addCall('Staking.chill')
    // .addEvent('Grandpa.NewAuthorities')

    .addEvent('Crowdloan.Created', {
        data: {
            event: {
                args: true,
            },
        } as const,
    })
    .addEvent('Crowdloan.Dissolved', {
        data: {
            event: {
                args: true,
            },
        } as const,
    })
    .addEvent('Crowdloan.Contributed', {
        data: {
            event: {
                args: true,
                extrinsic: { hash: true },
            },
        } as const,
    })

// .addEvent('Balances.Transfer')
// .addCall('System.remark')
// .addCall('XcmPallet.teleport_assets')
// .addCall('XcmPallet.reserve_transfer_assets')

processor.run(database, async (ctx) => {
    await new BalancesProcessor(ctx).run(ctx.blocks as any)
    await new StakingProcessor(ctx).run(ctx.blocks as any)
    await new CrowdloansProcessor(ctx).run(ctx.blocks as any)
})
