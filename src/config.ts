import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'moonriver',
    prefix: 'moonriver',
    dataSource: {
        archive: 'https://moonriver.archive.subsquid.io/graphql',
        chain: 'wss://wss.moonriver.moonbeam.network',
    },
    typesBundle: 'moonriver',
    batchSize: 100,
    // blockRange: {
    //     from: 7828270,
    // },
}

export default config
