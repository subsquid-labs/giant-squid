import { ProcessorConfig } from './types/custom/processorConfig'
import { lookupArchive } from '@subsquid/archive-registry'

const config: ProcessorConfig = {
    chainName: 'astar',
    prefix: 5,
    dataSource: {
        archive: lookupArchive('astar')[0].url,
        chain: 'wss://rpc.astar.network',
    },
    typesBundle: './typegen/typesBundle.json',
    batchSize: 100,
}

export default config
