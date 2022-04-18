export interface RewardData {
    amount: bigint
    account: Uint8Array
}

export interface StakeData {
    amount: bigint
    account?: Uint8Array
    newTotal: bigint
}

export interface RoundData {
    startingBlock: number
    round: number
    selectedCollatorsNumber: number
    totalBalance: bigint
}
