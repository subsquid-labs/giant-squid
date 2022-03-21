/* eslint-disable sonarjs/no-duplicate-string */
import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'astar',
    prefix: 5,
    dataSource: {
        archive: 'https://astar-beta.indexer.gc.subsquid.io/v4/graphql',
        chain: 'wss://rpc.astar.network',
    },
    typesBundle: './typegen/typesBundle.json',
    batchSize: 100,
}

export default config
