import { BondType } from "../../model"

export interface RewardData {
    amount: bigint
    account: Uint8Array
}

export interface StakeData {
    account: Uint8Array
    amount: bigint
    newTotal?: bigint
    type: BondType
    candidate?: Uint8Array
}


