import { ProcessorConfig } from './types/custom/processorConfig'
import { lookupArchive } from '@subsquid/archive-registry'

const config: ProcessorConfig = {
    chainName: 'moonbeam',
    prefix: 'moonbeam',
    dataSource: {
        archive: 'https://moonbeam.archive.subsquid.io/graphql',
        chain: 'wss://wss.api.moonbeam.network',
    },
    typesBundle: 'moonbeam',
    batchSize: 100,
    // blockRange: {
    //     from: 7828270,
    // },
}

export default config
