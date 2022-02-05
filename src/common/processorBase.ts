import { SubstrateProcessor } from "@subsquid/substrate-processor"

type Parameters<T> = T extends (...args: infer T) => any ? T : never;
type ChainName = 'polkadot' | 'kusama'

export interface ProcessorConfig {
    chainName: ChainName
    dataSource: Parameters<SubstrateProcessor["setDataSource"]>[0]
    typesBundle: Parameters<SubstrateProcessor["setTypesBundle"]>[0]
    batchSize?: Parameters<SubstrateProcessor["setBatchSize"]>[0]
    eventHandlers?: Record<Parameters<SubstrateProcessor["addEventHandler"]>[0], {
        handler: Parameters<SubstrateProcessor["addEventHandler"]>[2]
        options?: Parameters<SubstrateProcessor["addEventHandler"]>[1]
    }>
    extrinsicsHandlers?: Record<Parameters<SubstrateProcessor["addExtrinsicHandler"]>[0], {
        handler: Parameters<SubstrateProcessor["addExtrinsicHandler"]>[2]
        options?: Parameters<SubstrateProcessor["addExtrinsicHandler"]>[1]
    }>
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

    for (const name in config.eventHandlers)
        processor.addEventHandler(name, config.eventHandlers[name].options || {}, config.eventHandlers[name].handler)

    for (const name in config.extrinsicsHandlers)
        processor.addExtrinsicHandler(name, config.extrinsicsHandlers[name].options || {}, config.extrinsicsHandlers[name].handler)

    return processor
}