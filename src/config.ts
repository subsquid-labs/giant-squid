/* eslint-disable sonarjs/no-duplicate-string */
import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'hydradx',
    prefix: 'hydradx',
    dataSource: {
        archive: 'https://hydradx.indexer.gc.subsquid.io/v4/graphql',
        chain: ' wss://archive.snakenet.hydradx.io',
    },
    typesBundle: 'hydradx',
    batchSize: 50,
    // blockRange: {
    //     from: 7828270,
    // },
}

export default config
