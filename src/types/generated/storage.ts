import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v0 from './v0'
import * as v9110 from './v9110'
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
    get isV9110(): boolean {
        return this.getTypeHash() === '12ab1ac19ae156d5acf61b3bdb7d29a147b5793947baca0144497ee7e32553c2'
    }

    /**
     *  Info on all of the funds.
     */
    get asV9110(): CrowdloanFundsStorageV9110 {
        assert(this.isV9110)
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
export interface CrowdloanFundsStorageV9110 {
    get(key: number): Promise<(v9110.FundInfo | undefined)>
    getAll(): Promise<v9110.FundInfo[]>
    getMany(keys: number[]): Promise<(v9110.FundInfo | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v9110.FundInfo][]>
    getPairs(key: number): Promise<[k: number, v: v9110.FundInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v9110.FundInfo][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v9110.FundInfo][]>
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
    get isV0(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  The current set of validators.
     */
    get asV0(): SessionValidatorsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The current set of validators.
 */
export interface SessionValidatorsStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '2bb946dd9c19de9f4332897005d1255528c610172f7418fae165b5dafd3cfbfe'
    }

    /**
     *  The active era information, it holds index and start.
     * 
     *  The active era is the era currently rewarded.
     *  Validator set of this era must be equal to `SessionInterface::validators`.
     */
    get asV0(): StakingActiveEraStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The active era information, it holds index and start.
 * 
 *  The active era is the era currently rewarded.
 *  Validator set of this era must be equal to `SessionInterface::validators`.
 */
export interface StakingActiveEraStorageV0 {
    get(): Promise<(v0.ActiveEraInfo | undefined)>
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
    get isV0(): boolean {
        return this.getTypeHash() === 'de3ac6d702494f77c04d74bab1d59ac44113746a3722fe8b7306730fb0fc740c'
    }

    /**
     *  Map from all locked "stash" accounts to the controller account.
     */
    get asV0(): StakingBondedStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Map from all locked "stash" accounts to the controller account.
 */
export interface StakingBondedStorageV0 {
    get(key: Uint8Array): Promise<(Uint8Array | undefined)>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: Uint8Array[]): Promise<(Uint8Array | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: Uint8Array][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: Uint8Array][]>
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
     * 
     *  This is the latest planned era, depending on how the Session pallet queues the validator
     *  set, it might be active or not.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  The current era index.
     * 
     *  This is the latest planned era, depending on how the Session pallet queues the validator
     *  set, it might be active or not.
     */
    get asV0(): StakingCurrentEraStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The current era index.
 * 
 *  This is the latest planned era, depending on how the Session pallet queues the validator
 *  set, it might be active or not.
 */
export interface StakingCurrentEraStorageV0 {
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
    get isV0(): boolean {
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
    get asV0(): StakingErasStakersStorageV0 {
        assert(this.isV0)
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
export interface StakingErasStakersStorageV0 {
    get(key1: number, key2: Uint8Array): Promise<v0.Exposure>
    getAll(): Promise<v0.Exposure[]>
    getMany(keys: [number, Uint8Array][]): Promise<v0.Exposure[]>
    getKeys(): Promise<[number, Uint8Array][]>
    getKeys(key1: number): Promise<[number, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array): Promise<[number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[number, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array], v: v0.Exposure][]>
    getPairs(key1: number): Promise<[k: [number, Uint8Array], v: v0.Exposure][]>
    getPairs(key1: number, key2: Uint8Array): Promise<[k: [number, Uint8Array], v: v0.Exposure][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, Uint8Array], v: v0.Exposure][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, Uint8Array], v: v0.Exposure][]>
    getPairsPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[k: [number, Uint8Array], v: v0.Exposure][]>
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
    get isV0(): boolean {
        return this.getTypeHash() === '838ac827cb2532f983c68467cfa97afcccf6147fb96e61e136394060880b64a4'
    }

    /**
     *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
     */
    get asV0(): StakingLedgerStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
 */
export interface StakingLedgerStorageV0 {
    get(key: Uint8Array): Promise<(v0.StakingLedger | undefined)>
    getAll(): Promise<v0.StakingLedger[]>
    getMany(keys: Uint8Array[]): Promise<(v0.StakingLedger | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v0.StakingLedger][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v0.StakingLedger][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v0.StakingLedger][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v0.StakingLedger][]>
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
    get isV0(): boolean {
        return this.getTypeHash() === '997acadf80b79903fb4386b933d481dff61dad22612d657f19f39b937ea8d992'
    }

    /**
     *  Where the reward payment should be made. Keyed by stash.
     */
    get asV0(): StakingPayeeStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Where the reward payment should be made. Keyed by stash.
 */
export interface StakingPayeeStorageV0 {
    get(key: Uint8Array): Promise<v0.RewardDestination>
    getAll(): Promise<v0.RewardDestination[]>
    getMany(keys: Uint8Array[]): Promise<v0.RewardDestination[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v0.RewardDestination][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v0.RewardDestination][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v0.RewardDestination][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v0.RewardDestination][]>
}
