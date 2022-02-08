export interface ContributionData {
    account?: Uint8Array,
    paraId: number,
    amount: bigint
}

export interface CreateData {
    index: number,
    cap: bigint,
    firstPeriod: number,
    lastPeriod: number,
    end: number
}

export interface DissolvedData {
    index: number,
}