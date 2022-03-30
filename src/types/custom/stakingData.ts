export interface RewardData {
    amount: bigint
    account: Uint8Array
    smartContract: Uint8Array,
    era: number
}

export interface StakeData {
    amount: bigint
    account?: Uint8Array
    smartContract: Uint8Array
}
