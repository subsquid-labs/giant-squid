export interface ContributeData {
    paraId: number
    amount: bigint
}

export interface ContributedData extends ContributeData {
    account: Uint8Array
}

export interface CreateData {
    index: number
    cap: bigint
    firstPeriod: number
    lastPeriod: number
    end: number
}

export interface DissolvedData {
    index: number
}
