export type BalanceData = TransferData | CommonData | SetBalanceData

export interface TransferData {
    from?: Uint8Array
    to: Uint8Array
    amount?: bigint
}

export interface CommonData {
    amount: bigint
    account: string
}

export interface SetBalanceData {
    account: string
    free: bigint
    reserved?: bigint
}