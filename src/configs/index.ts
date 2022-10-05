import { ProcessorConfig } from './processorConfig'

export function getConfig(): ProcessorConfig {
    switch (process.env.CHAIN) {
        case 'kusama':
            return require('./kusama')
        case 'polkadot':
            return require('./polkadot')
        default:
            throw new Error()
    }
}
