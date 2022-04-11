export interface ContributionData {
    paraId: number
    amount: bigint
    account?: Uint8Array
}
export interface CreateData {
    index: number
    cap: bigint
    firstPeriod: number
    lastPeriod: number
    end: number
}
