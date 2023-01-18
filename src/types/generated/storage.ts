import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v1020 from './v1020'
import * as v1050 from './v1050'
import * as v1058 from './v1058'
import * as v9010 from './v9010'
import * as v9180 from './v9180'

export class CrowdloanFundsStorage extends StorageBase {
    protected getPrefix() {
        return 'Crowdloan'
    }

    protected getName() {
        return 'Funds'
    }

    /**
     *  Info on all of the funds.
     */
    get isV9010(): boolean {
        return this.getTypeHash() === '12ab1ac19ae156d5acf61b3bdb7d29a147b5793947baca0144497ee7e32553c2'
    }

    /**
     *  Info on all of the funds.
     */
    get asV9010(): CrowdloanFundsStorageV9010 {
        assert(this.isV9010)
        return this as any
    }

    /**
     *  Info on all of the funds.
     */
    get isV9180(): boolean {
        return this.getTypeHash() === 'e837aa8c7af80bff126d455e0237189b2b62b5bf6586a1f2e67a22edfaf5a596'
    }

    /**
     *  Info on all of the funds.
     */
    get asV9180(): CrowdloanFundsStorageV9180 {
        assert(this.isV9180)
        return this as any
    }
}

/**
 *  Info on all of the funds.
 */
export interface CrowdloanFundsStorageV9010 {
    get(key: number): Promise<(v9010.FundInfo | undefined)>
    getAll(): Promise<v9010.FundInfo[]>
    getMany(keys: number[]): Promise<(v9010.FundInfo | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v9010.FundInfo][]>
    getPairs(key: number): Promise<[k: number, v: v9010.FundInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v9010.FundInfo][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v9010.FundInfo][]>
}

/**
 *  Info on all of the funds.
 */
export interface CrowdloanFundsStorageV9180 {
    get(key: number): Promise<(v9180.FundInfo | undefined)>
    getAll(): Promise<v9180.FundInfo[]>
    getMany(keys: number[]): Promise<(v9180.FundInfo | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v9180.FundInfo][]>
    getPairs(key: number): Promise<[k: number, v: v9180.FundInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v9180.FundInfo][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v9180.FundInfo][]>
}

export class SessionValidatorsStorage extends StorageBase {
    protected getPrefix() {
        return 'Session'
    }

    protected getName() {
        return 'Validators'
    }

    /**
     *  The current set of validators.
     */
    get isV1020(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  The current set of validators.
     */
    get asV1020(): SessionValidatorsStorageV1020 {
        assert(this.isV1020)
        return this as any
    }
}

/**
 *  The current set of validators.
 */
export interface SessionValidatorsStorageV1020 {
    get(): Promise<Uint8Array[]>
}

export class StakingActiveEraStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'ActiveEra'
    }

    /**
     *  The active era information, it holds index and start.
     * 
     *  The active era is the era currently rewarded.
     *  Validator set of this era must be equal to `SessionInterface::validators`.
     */
    get isV1050(): boolean {
        return this.getTypeHash() === '2bb946dd9c19de9f4332897005d1255528c610172f7418fae165b5dafd3cfbfe'
    }

    /**
     *  The active era information, it holds index and start.
     * 
     *  The active era is the era currently rewarded.
     *  Validator set of this era must be equal to `SessionInterface::validators`.
     */
    get asV1050(): StakingActiveEraStorageV1050 {
        assert(this.isV1050)
        return this as any
    }
}

/**
 *  The active era information, it holds index and start.
 * 
 *  The active era is the era currently rewarded.
 *  Validator set of this era must be equal to `SessionInterface::validators`.
 */
export interface StakingActiveEraStorageV1050 {
    get(): Promise<(v1050.ActiveEraInfo | undefined)>
}

export class StakingBondedStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'Bonded'
    }

    /**
     *  Map from all locked "stash" accounts to the controller account.
     */
    get isV1020(): boolean {
        return this.getTypeHash() === 'de3ac6d702494f77c04d74bab1d59ac44113746a3722fe8b7306730fb0fc740c'
    }

    /**
     *  Map from all locked "stash" accounts to the controller account.
     */
    get asV1020(): StakingBondedStorageV1020 {
        assert(this.isV1020)
        return this as any
    }
}

/**
 *  Map from all locked "stash" accounts to the controller account.
 */
export interface StakingBondedStorageV1020 {
    get(key: Uint8Array): Promise<(Uint8Array | undefined)>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: Uint8Array[]): Promise<(Uint8Array | undefined)[]>
}

export class StakingCurrentEraStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'CurrentEra'
    }

    /**
     *  The current era index.
     */
    get isV1020(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The current era index.
     */
    get asV1020(): StakingCurrentEraStorageV1020 {
        assert(this.isV1020)
        return this as any
    }

    /**
     *  The current era index.
     * 
     *  This is the latest planned era, depending on how session module queues the validator
     *  set, it might be active or not.
     */
    get isV1050(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  The current era index.
     * 
     *  This is the latest planned era, depending on how session module queues the validator
     *  set, it might be active or not.
     */
    get asV1050(): StakingCurrentEraStorageV1050 {
        assert(this.isV1050)
        return this as any
    }
}

/**
 *  The current era index.
 */
export interface StakingCurrentEraStorageV1020 {
    get(): Promise<number>
}

/**
 *  The current era index.
 * 
 *  This is the latest planned era, depending on how session module queues the validator
 *  set, it might be active or not.
 */
export interface StakingCurrentEraStorageV1050 {
    get(): Promise<(number | undefined)>
}

export class StakingErasStakersStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'ErasStakers'
    }

    /**
     *  Exposure of validator at era.
     * 
     *  This is keyed first by the era index to allow bulk deletion and then the stash account.
     * 
     *  Is it removed after `HISTORY_DEPTH` eras.
     *  If stakers hasn't been set or has been removed then empty exposure is returned.
     */
    get isV1050(): boolean {
        return this.getTypeHash() === 'f3f726cc814cef290657008054cd10667b250a01d2842ff3bbbcca24c98abf5b'
    }

    /**
     *  Exposure of validator at era.
     * 
     *  This is keyed first by the era index to allow bulk deletion and then the stash account.
     * 
     *  Is it removed after `HISTORY_DEPTH` eras.
     *  If stakers hasn't been set or has been removed then empty exposure is returned.
     */
    get asV1050(): StakingErasStakersStorageV1050 {
        assert(this.isV1050)
        return this as any
    }
}

/**
 *  Exposure of validator at era.
 * 
 *  This is keyed first by the era index to allow bulk deletion and then the stash account.
 * 
 *  Is it removed after `HISTORY_DEPTH` eras.
 *  If stakers hasn't been set or has been removed then empty exposure is returned.
 */
export interface StakingErasStakersStorageV1050 {
    get(key1: number, key2: Uint8Array): Promise<v1050.Exposure>
    getAll(): Promise<v1050.Exposure[]>
    getMany(keys: [number, Uint8Array][]): Promise<v1050.Exposure[]>
    getKeys(): Promise<[number, Uint8Array][]>
    getKeys(key1: number): Promise<[number, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array): Promise<[number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[number, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array], v: v1050.Exposure][]>
    getPairs(key1: number): Promise<[k: [number, Uint8Array], v: v1050.Exposure][]>
    getPairs(key1: number, key2: Uint8Array): Promise<[k: [number, Uint8Array], v: v1050.Exposure][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, Uint8Array], v: v1050.Exposure][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, Uint8Array], v: v1050.Exposure][]>
    getPairsPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[k: [number, Uint8Array], v: v1050.Exposure][]>
}

export class StakingLedgerStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'Ledger'
    }

    /**
     *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
     */
    get isV1020(): boolean {
        return this.getTypeHash() === 'c27b3ed6dad75f65e118399ee7274c494565332d8c67cc85aef297dd1092284b'
    }

    /**
     *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
     */
    get asV1020(): StakingLedgerStorageV1020 {
        assert(this.isV1020)
        return this as any
    }

    /**
     *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
     */
    get isV1050(): boolean {
        return this.getTypeHash() === 'acb0ae5b3ecc4c620a929a6d33a493f14d936906f24812ba68afe18beaf2314a'
    }

    /**
     *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
     */
    get asV1050(): StakingLedgerStorageV1050 {
        assert(this.isV1050)
        return this as any
    }

    /**
     *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
     */
    get isV1058(): boolean {
        return this.getTypeHash() === '838ac827cb2532f983c68467cfa97afcccf6147fb96e61e136394060880b64a4'
    }

    /**
     *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
     */
    get asV1058(): StakingLedgerStorageV1058 {
        assert(this.isV1058)
        return this as any
    }
}

/**
 *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
 */
export interface StakingLedgerStorageV1020 {
    get(key: Uint8Array): Promise<(v1020.StakingLedger | undefined)>
    getAll(): Promise<v1020.StakingLedger[]>
    getMany(keys: Uint8Array[]): Promise<(v1020.StakingLedger | undefined)[]>
}

/**
 *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
 */
export interface StakingLedgerStorageV1050 {
    get(key: Uint8Array): Promise<(v1050.StakingLedger | undefined)>
    getAll(): Promise<v1050.StakingLedger[]>
    getMany(keys: Uint8Array[]): Promise<(v1050.StakingLedger | undefined)[]>
}

/**
 *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
 */
export interface StakingLedgerStorageV1058 {
    get(key: Uint8Array): Promise<(v1058.StakingLedger | undefined)>
    getAll(): Promise<v1058.StakingLedger[]>
    getMany(keys: Uint8Array[]): Promise<(v1058.StakingLedger | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v1058.StakingLedger][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v1058.StakingLedger][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v1058.StakingLedger][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v1058.StakingLedger][]>
}

export class StakingPayeeStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'Payee'
    }

    /**
     *  Where the reward payment should be made. Keyed by stash.
     */
    get isV1020(): boolean {
        return this.getTypeHash() === '997acadf80b79903fb4386b933d481dff61dad22612d657f19f39b937ea8d992'
    }

    /**
     *  Where the reward payment should be made. Keyed by stash.
     */
    get asV1020(): StakingPayeeStorageV1020 {
        assert(this.isV1020)
        return this as any
    }
}

/**
 *  Where the reward payment should be made. Keyed by stash.
 */
export interface StakingPayeeStorageV1020 {
    get(key: Uint8Array): Promise<v1020.RewardDestination>
    getAll(): Promise<v1020.RewardDestination[]>
    getMany(keys: Uint8Array[]): Promise<v1020.RewardDestination[]>
}

export class StakingStakersStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'Stakers'
    }

    /**
     *  Nominators for a particular account that is in action right now. You can't iterate
     *  through validators here, but you can find them in the Session module.
     * 
     *  This is keyed by the stash account.
     */
    get isV1020(): boolean {
        return this.getTypeHash() === 'd3eee9271023eb9c766a48fd0a709136d59d1bde5407acf940037ad950c8900d'
    }

    /**
     *  Nominators for a particular account that is in action right now. You can't iterate
     *  through validators here, but you can find them in the Session module.
     * 
     *  This is keyed by the stash account.
     */
    get asV1020(): StakingStakersStorageV1020 {
        assert(this.isV1020)
        return this as any
    }
}

/**
 *  Nominators for a particular account that is in action right now. You can't iterate
 *  through validators here, but you can find them in the Session module.
 * 
 *  This is keyed by the stash account.
 */
export interface StakingStakersStorageV1020 {
    get(key: Uint8Array): Promise<v1020.Exposure>
    getAll(): Promise<v1020.Exposure[]>
    getMany(keys: Uint8Array[]): Promise<v1020.Exposure[]>
}
