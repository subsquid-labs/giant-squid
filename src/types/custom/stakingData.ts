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
