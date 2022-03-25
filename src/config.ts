import { ProcessorConfig } from './types/custom/processorConfig'
import { lookupArchive } from '@subsquid/archive-registry'

const config: ProcessorConfig = {
    chainName: 'moonriver',
    prefix: 'moonriver',
    dataSource: {
        archive: lookupArchive('moonriver')[0].url,
        chain: 'wss://wss.moonriver.moonbeam.network',
    },
    typesBundle: 'moonriver',
    batchSize: 100,
    // blockRange: {
    //     from: 7828270,
    // },
}

export default config
