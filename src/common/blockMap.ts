import { SubstrateBlock } from '@subsquid/substrate-processor'

export class BlockMap<T> extends Map<SubstrateBlock, T[]> {
    optimize(fn: (block: SubstrateBlock, items: T[]) => boolean): BlockMap<T> {
        const itemsList = this.entriesArray().sort((a, b) => a[0].height - b[0].height)
        const newBlockMap = new BlockMap<T>()

        let cache: T[] = []
        for (let i = 0; i < itemsList.length; i++) {
            const [block, items] = itemsList[i]
            cache.push(...items)
            if (fn(block, items) || i == itemsList.length - 1) {
                newBlockMap.push(block, ...cache)
                cache = []
            }
        }

        return newBlockMap
    }

    push(block: SubstrateBlock, ...items: T[]) {
        let blockItems = this.get(block)
        if (!blockItems) {
            this.set(block, items)
        } else {
            blockItems.push(...items)
        }
        return this
    }

    some(block: SubstrateBlock, fn: (item: T) => boolean) {
        let blockItems = this.get(block)
        if (blockItems) {
            return blockItems.some(fn)
        }
        return false
    }

    keysArray() {
        return [...this.keys()]
    }

    entriesArray() {
        return [...this.entries()]
    }

    valuesArray() {
        return [...this.values()]
    }
}
