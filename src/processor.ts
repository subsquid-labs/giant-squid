import config from './config'
import { SubstrateProcessor } from '@subsquid/substrate-processor'
import { DEFAULT_BATCH_SIZE, DEFAULT_PORT } from './common/consts'
import * as modules from './mappings'
import { TypeormDatabase } from '@subsquid/typeorm-store'

const database = new TypeormDatabase()
const processor = new SubstrateProcessor(database)

processor.setTypesBundle(config.typesBundle)
processor.setBatchSize(config.batchSize || DEFAULT_BATCH_SIZE)
processor.setDataSource(config.dataSource)
processor.setPrometheusPort(config.port || DEFAULT_PORT)
processor.setBlockRange(config.blockRange || { from: 0 })

//event handlers
processor.addCallHandler('Currencies.transfer', modules.currencies.calls.handleTransfer)

//extrinsics handlers
processor.addCallHandler('Balances.transfer', modules.balances.extrinsics.handleTransfer)
processor.addCallHandler('Balances.transfer_keep_alive', modules.balances.extrinsics.handleTransferKeepAlive)
processor.addCallHandler('Balances.force_transfer', modules.balances.extrinsics.handleForceTransfer)
processor.addCallHandler('Balances.transfer_all', modules.balances.extrinsics.handleTransferAll)

processor.addCallHandler('xTokens.transfer', modules.xTokens.extrinsics.handleTransfer)
processor.addCallHandler('xTokens.transfer_multicurrencies', modules.xTokens.extrinsics.handleTransferMulticurrencies)

processor.run()
