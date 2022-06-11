import { CommonHandlerContext as PrCommonHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'

export type CommonHandlerContext = PrCommonHandlerContext<Store>
