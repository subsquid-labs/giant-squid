import { ProcessorConfig } from './types/custom/processorConfig'
import { lookupArchive } from '@subsquid/archive-registry'

const config: ProcessorConfig = {
    chainName: 'statemine',
    prefix: 2,
    dataSource: {
        archive: lookupArchive('statemine')[0].url,
        chain: 'wss://statemine.api.onfinality.io/public-ws',
    },
    typesBundle: './typegen/typesBundle.json',
    batchSize: 100,
    // blockRange: {
    //     from: 7828270,
    // },
}

export default config
