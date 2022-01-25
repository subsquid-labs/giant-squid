import { SubstrateProcessor } from "@subsquid/substrate-processor"

type Parameters<T> = T extends (... args: infer T) => any ? T : never; 
type ChainName = 'polkadot' | 'kusama'

export interface ProcessorConfig {
    chainName: ChainName
    dataSource: Parameters<SubstrateProcessor["setDataSource"]>[0]
    typesBundle: Parameters<SubstrateProcessor["setTypesBundle"]>[0]
    batchSize: Parameters<SubstrateProcessor["setBatchSize"]>[0]
    eventHandlers: Record<string, Parameters<SubstrateProcessor["addEventHandler"]>[2]>
    idPrefix: string,
    port: Parameters<SubstrateProcessor["setPrometheusPort"]>[0]
}

export function setupNewProcessor(config: ProcessorConfig): SubstrateProcessor {
    const processor = new SubstrateProcessor(`${config.chainName}-processor`)

    processor.setTypesBundle(config.typesBundle)
    processor.setBatchSize(config.batchSize)
    processor.setDataSource(config.dataSource)
    processor.setPrometheusPort(config.port)
    processor.setBlockRange({from: 2307543})
    for (const eventName in config.eventHandlers)
        processor.addEventHandler(eventName, config.eventHandlers[eventName])
    
    return processor
}