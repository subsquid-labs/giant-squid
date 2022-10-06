import config from './kusama'
import { ProcessorConfig } from './processorConfig'

export function getConfig(): ProcessorConfig {
    // switch (process.env.CHAIN) {
    //     case 'kusama':
            return config
        // case 'polkadot':
        //     return require('./polkadot')
        // default:
        //     throw new Error()
    // }
}
