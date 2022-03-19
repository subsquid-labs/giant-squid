export interface ChainInfo {
    readonly id: string
    readonly token: string
    readonly decimals: number | null
    readonly paraId?: number
    readonly relay?: string
}
