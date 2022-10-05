import { ProcessorConfig } from './processorConfig'

const config: ProcessorConfig = {
    chainName: 'polkadot',
    prefix: 'polkadot',
    dataSource: {
        archive: 'https://polkadot.archive.subsquid.io/graphql',
        chain: 'wss://rpc.polkadot.io',
    },
    typesBundle: 'polkadot',
    batchSize: 100,
}

export default config
