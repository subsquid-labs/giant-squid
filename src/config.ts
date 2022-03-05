/* eslint-disable sonarjs/no-duplicate-string */
import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'kusama',
    prefix: 'kusama',
    dataSource: {
        archive: 'https://kusama.indexer.gc.subsquid.io/v4/graphql',
        chain: 'wss://kusama-rpc.polkadot.io',
    },
    typesBundle: 'kusama',
    batchSize: 100,
}

export default config
