import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'polkadot',
    prefix: 'polkadot',
    dataSource: {
        archive: 'https://polkadot.indexer.gc.subsquid.io/v4/graphql',
        chain: 'wss://rpc.polkadot.io',
    },
    typesBundle: 'kusama',
    batchSize: 100,
    // blockRange: {
    //     from: 7567700,
    // },
}

export default config
