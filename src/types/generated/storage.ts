import assert from 'assert'
import {StorageContext, Result} from './support'
import * as v2011 from './v2011'
import * as v2020 from './v2020'
import * as v2042 from './v2042'

export class AssetRegistryAssetMetadatasStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  The storages for AssetMetadatas.
   * 
   *  AssetMetadatas: map ForeignAssetId => Option<AssetMetadata>
   */
  get isV2011() {
    return this.ctx._chain.getStorageItemTypeHash('AssetRegistry', 'AssetMetadatas') === '88ea7568489f390be3d6d5eca866ac5c13cd82b449a5c1a7eaef69dc439472f9'
  }

  /**
   *  The storages for AssetMetadatas.
   * 
   *  AssetMetadatas: map ForeignAssetId => Option<AssetMetadata>
   */
  async getAsV2011(key: number): Promise<v2011.AssetMetadata | undefined> {
    assert(this.isV2011)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'AssetRegistry', 'AssetMetadatas', key)
  }

  async getManyAsV2011(keys: number[]): Promise<(v2011.AssetMetadata | undefined)[]> {
    assert(this.isV2011)
    return this.ctx._chain.queryStorage(this.ctx.block.hash, 'AssetRegistry', 'AssetMetadatas', keys.map(k => [k]))
  }

  /**
   *  The storages for AssetMetadatas.
   * 
   *  AssetMetadatas: map AssetIds => Option<AssetMetadata>
   */
  get isV2020() {
    return this.ctx._chain.getStorageItemTypeHash('AssetRegistry', 'AssetMetadatas') === '1c10e6a143893d99100c58325ff68c0f3a7635c3d2a9fe755404af1e6c487f0b'
  }

  /**
   *  The storages for AssetMetadatas.
   * 
   *  AssetMetadatas: map AssetIds => Option<AssetMetadata>
   */
  async getAsV2020(key: v2020.AssetIds): Promise<v2020.AssetMetadata | undefined> {
    assert(this.isV2020)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'AssetRegistry', 'AssetMetadatas', key)
  }

  async getManyAsV2020(keys: v2020.AssetIds[]): Promise<(v2020.AssetMetadata | undefined)[]> {
    assert(this.isV2020)
    return this.ctx._chain.queryStorage(this.ctx.block.hash, 'AssetRegistry', 'AssetMetadatas', keys.map(k => [k]))
  }

  /**
   *  The storages for AssetMetadatas.
   * 
   *  AssetMetadatas: map AssetIds => Option<AssetMetadata>
   */
  get isV2042() {
    return this.ctx._chain.getStorageItemTypeHash('AssetRegistry', 'AssetMetadatas') === '96902173149768796ebdb5a5a8611b9399bd1619aa6bc40a0cf7233ef3c95e84'
  }

  /**
   *  The storages for AssetMetadatas.
   * 
   *  AssetMetadatas: map AssetIds => Option<AssetMetadata>
   */
  async getAsV2042(key: v2042.AssetIds): Promise<v2042.AssetMetadata | undefined> {
    assert(this.isV2042)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'AssetRegistry', 'AssetMetadatas', key)
  }

  async getManyAsV2042(keys: v2042.AssetIds[]): Promise<(v2042.AssetMetadata | undefined)[]> {
    assert(this.isV2042)
    return this.ctx._chain.queryStorage(this.ctx.block.hash, 'AssetRegistry', 'AssetMetadatas', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('AssetRegistry', 'AssetMetadatas') != null
  }
}
