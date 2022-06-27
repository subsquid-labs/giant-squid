import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'karura',
    prefix: 'karura',
    dataSource: {
        archive: 'https://karura.archive.subsquid.io/graphql',
        chain: 'wss://karura.polkawallet.io',
    },
    typesBundle: 'karura',
    batchSize: 100,
    // blockRange: {
    //     from: 1120940,
    // },
}

export default config
