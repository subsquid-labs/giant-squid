import { ProcessorConfig } from './processorConfig'

const config: ProcessorConfig = {
    chainName: 'kusama',
    prefix: 'kusama',
    dataSource: {
        archive: 'https://kusama.archive.subsquid.io/graphql',
        chain: 'wss://kusama-rpc.polkadot.io',
    },
    typesBundle: 'kusama',
    batchSize: 400,
    blockRange: {
        from: 100000,
        // from: 8_200_000,
    },
}

export default config
