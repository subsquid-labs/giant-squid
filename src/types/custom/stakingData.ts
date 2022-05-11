export interface RewardData {
    amount: bigint
    account: Uint8Array
}

export interface StakeData {
    account: Uint8Array
    amount: bigint
    newTotal?: bigint
}

export interface RoundData {
    startingBlock: number
    round: number
    selectedCollatorsNumber: number
    totalBalance: bigint
}
