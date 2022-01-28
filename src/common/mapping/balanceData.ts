export type BalanceData = TransferData | CommonData | SetBalanceData

export interface TransferData {
    from: string
    to: string
    amount: bigint
    status?: string
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