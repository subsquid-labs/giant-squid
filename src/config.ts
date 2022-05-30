import { ProcessorConfig } from './types/custom/processorConfig'
import { lookupArchive } from '@subsquid/archive-registry'

const config: ProcessorConfig = {
    chainName: 'astar',
    prefix: 'astar',
    dataSource: {
        archive: lookupArchive('astar')[0].url,
        chain: 'wss://rpc.astar.network',
    },
    typesBundle: 'astar',
    batchSize: 100,
    blockRange: {
        from: 0,
    },
}

export default config
