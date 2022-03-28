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

export const enum PayeeType {
    ACCOUNT = 'Account',
    STAKED = 'Staked',
    STASH = 'Stash',
    CONTROLLER = 'Controller',
}

export interface Payee {
    payee: PayeeType
    account?: string | null
}

export interface PayeeCallData {
    payee: PayeeType
    account?: Uint8Array | null
}

export interface LedgerData {
    stash: Uint8Array
    total: bigint
    active: bigint
}

export interface Ledger {
    active: bigint
}
