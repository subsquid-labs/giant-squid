import { BondType } from '../../../model'

export interface RewardData {
    amount: bigint
    account: string
    era: number
    smartContract: string
}

export interface BondData {
    amount: bigint
    account: string
    type: BondType
    success: boolean
    smartContract: string
}
