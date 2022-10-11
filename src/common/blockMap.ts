import { SubstrateBlock } from '@subsquid/substrate-processor'
import { last } from './tools'

export class BlockMap<T> extends Map<SubstrateBlock, T[]> {
    optimize(fn: (block: SubstrateBlock, items: T[]) => boolean): BlockMap<T> {
        const itemsList = this.entriesArray().sort((a, b) => a[0].height - b[0].height)
        const newBlockMap = new BlockMap<T>()

        if (itemsList.length == 0) return newBlockMap

        let cache: T[] = []
        let prevBlock = itemsList[0][0]
        for (let i = 0; i < itemsList.length; i++) {
            const [block, items] = itemsList[i]
            cache.push(...items)
            if (fn(block, items)) {
                newBlockMap.push(prevBlock, ...cache)
                cache = []
            }
        }

        if (cache.length != 0) {
            newBlockMap.push(last(itemsList)[0], ...cache)
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
