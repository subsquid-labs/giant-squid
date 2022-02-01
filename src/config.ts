/* eslint-disable sonarjs/no-duplicate-string */
import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'statemine',
    prefix: 2,
    dataSource: {
        archive: 'https://statemine.indexer.gc.subsquid.io/v4/graphql',
        chain: 'wss://statemine.api.onfinality.io/public-ws',
    },
    typesBundle: './typegen/typesBundle.json',
    batchSize: 100,
    // blockRange: {
    //     from: 7828270,
    // },
}

export default config
