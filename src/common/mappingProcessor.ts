import { BatchBlock, BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'

type BaseContext<Store> = Omit<BatchContext<Store, any>, 'blocks'>

export abstract class MappingProcessor<Item> {
    constructor(protected ctx: BaseContext<Store>) {}

    abstract run(blocks: BatchBlock<Item>[]): Promise<void>

    protected createContext(block: SubstrateBlock) {
        return { ...this.ctx, block }
    }
}
