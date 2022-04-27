export interface RewardData {
    amount: bigint
    account: Uint8Array
}

export interface StakeData {
    amount: bigint
    account?: Uint8Array
}
export interface PayoutData {
    era: number
    validator: Uint8Array
}

export type PayeeTypeRaw = 'Account' | 'Staked' | 'Stash' | 'Controller' | 'None'

export interface Payee {
    payee: PayeeTypeRaw
    account?: string
}

export interface PayeeCallData {
    payee: PayeeTypeRaw
    account?: Uint8Array | null
}

export interface LedgerData {
    stash: Uint8Array
    total: bigint
    active: bigint
}

export interface Ledger {
    stash: string
    active: bigint
}
