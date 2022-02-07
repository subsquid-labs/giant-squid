import { SubstrateProcessor } from "@subsquid/substrate-processor"

type Parameters<T> = T extends (...args: infer T) => any ? T : never;
type ChainName = 'polkadot' | 'kusama'

type Handlers<T> = Record<string, Record<string, {
    handler: Parameters<T>[2]
    options?: Parameters<T>[1]
}>>

export interface ProcessorConfig {
    chainName: ChainName
    dataSource: Parameters<SubstrateProcessor["setDataSource"]>[0]
    typesBundle: Parameters<SubstrateProcessor["setTypesBundle"]>[0]
    batchSize?: Parameters<SubstrateProcessor["setBatchSize"]>[0]
    eventHandlers?: Handlers<SubstrateProcessor["addEventHandler"]>
    extrinsicsHandlers?: Handlers<SubstrateProcessor['addExtrinsicHandler']>
    port?: Parameters<SubstrateProcessor["setPrometheusPort"]>[0]
    blockRange?: Parameters<SubstrateProcessor["setBlockRange"]>[0]
}

export function setupNewProcessor(config: ProcessorConfig): SubstrateProcessor {
    const processor = new SubstrateProcessor(`${config.chainName}-processor`)

    processor.setTypesBundle(config.typesBundle)
    processor.setBatchSize(config.batchSize || 500)
    processor.setDataSource(config.dataSource)
    processor.setPrometheusPort(config.port || 3000)
    processor.setBlockRange(config.blockRange || { from: 0 })

    for (const sectionName in config.eventHandlers)
    {
        const section = config.eventHandlers[sectionName]
        for (const methodName in section)
        {
            const method = section[methodName]
            processor.addEventHandler(`${sectionName}.${methodName}`, method.options || {}, method.handler)
        }
    }

    for (const sectionName in config.extrinsicsHandlers)
    {
        const section = config.extrinsicsHandlers[sectionName]
        for (const methodName in section)
        {
            const method = section[methodName]
            processor.addExtrinsicHandler(`${sectionName}.${methodName}`, method.options || {}, method.handler)
        }
    }

    return processor
}