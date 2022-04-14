import { networkRegistry } from '@subsquid/archive-registry'

export type ChainName = typeof networkRegistry['networks'][number]['name']