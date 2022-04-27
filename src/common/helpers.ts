import * as ss58 from '@subsquid/ss58'
import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { PayeeType } from '../model'
import { PayeeTypeRaw } from '../types/custom/stakingData'
import { StorageContext } from '../types/generated/support'
import { EXTRINSIC_SUCCESS } from './consts'

export function encodeID(ID: Uint8Array, prefix: string | number) {
    try {
        return ss58.codec(prefix).encode(ID)
    } catch (e) {
        return undefined
    }
}

export function decodeID(ID: string, prefix: string | number) {
    let ret: Uint8Array | null
    try {
        ret = ss58.codec(prefix).decode(ID)
    } catch (e) {
        ret = null
    }

    return ret
}

export interface ItemBase {
    id: string
    date: Date | null | undefined
    blockNumber: bigint | null | undefined
    extrinsicHash: string | null | undefined
}

export function isExtrinsicSuccess(ctx: ExtrinsicHandlerContext) {
    return ctx.event.name === EXTRINSIC_SUCCESS
}

export function createPrevStorageContext(ctx: StorageContext & { block: { parentHash: string } }) {
    return {
        _chain: ctx._chain,
        block: {
            ...ctx.block,
            hash: ctx.block.parentHash,
        },
    }
}

export function convertPayee(
    payeeTypeRaw: PayeeTypeRaw,
    accounts: {
        stash: string
        controller: string
        payeeAccount: string | null | undefined
    }
) {
    switch (payeeTypeRaw) {
        case 'Account':
            return {
                payeeType: PayeeType.Account,
                payee: accounts.payeeAccount || undefined,
            }
        case 'Stash':
            return {
                payeeType: PayeeType.Stash,
                payee: accounts.stash,
            }
        case 'Staked':
            return {
                payeeType: PayeeType.Staked,
                payee: accounts.stash,
            }
        case 'Controller':
            return {
                payeeType: PayeeType.Controller,
                payee: accounts.stash,
            }
        case 'None': {
            return {
                payeeType: PayeeType.Controller,
                payee: undefined,
            }
        }
    }
}
