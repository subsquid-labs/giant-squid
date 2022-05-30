import { ProcessorConfig } from './types/custom/processorConfig'
import { lookupArchive } from '@subsquid/archive-registry'

const config: ProcessorConfig = {
    chainName: 'acala',
    prefix: 'acala',
    dataSource: {
        archive: lookupArchive('acala')[0].url,
        chain: 'wss://acala.polkawallet.io',
    },
    typesBundle: 'acala',
    batchSize: 100,
    blockRange: {
        from: 1120940,
    },
}

export default config
