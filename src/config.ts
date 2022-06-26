import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'acala',
    prefix: 'acala',
    dataSource: {
        archive: 'https://acala.archive.subsquid.io/graphql',
        chain: 'wss://acala.polkawallet.io',
    },
    typesBundle: 'acala',
    batchSize: 100,
    // blockRange: {
    //     from: 1120940,
    // },
}

export default config
