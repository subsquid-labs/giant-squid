import { BondType } from '../../../model'

export interface RewardData {
    amount: bigint
    account: string
}

export interface SlashData {
    amount: bigint
    account: string
    era: number
}

export interface BondData {
    amount: bigint
    account: string
    type: BondType
    success: boolean
    newTotal?: bigint
    candidate?: string
}
