import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v8 from './v8'
import * as v9110 from './v9110'
import * as v9122 from './v9122'
import * as v9140 from './v9140'

export class BalancesBalanceSetEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.BalanceSet')
  }

  /**
   *  A balance was set by root (who, free, reserved).
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('balances.BalanceSet') === '890be9c0740650f86b325a08fc07ecc4c2b4f58212c6edaca87dabdbb64d3db1'
  }

  /**
   *  A balance was set by root (who, free, reserved).
   */
  get asV0(): [Uint8Array, bigint, bigint] {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A balance was set by root.
   */
  get isV9140(): boolean {
    return this.ctx._chain.getEventHash('balances.BalanceSet') === '4ab45d6d95726adfeb725535bf55a2406d3b4d8ae14ac9005c7bd7e07ea76fcc'
  }

  /**
   * A balance was set by root.
   */
  get asV9140(): {who: v9140.AccountId32, free: bigint, reserved: bigint} {
    assert(this.isV9140)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9140
  }

  get asLatest(): {who: v9140.AccountId32, free: bigint, reserved: bigint} {
    deprecateLatest()
    return this.asV9140
  }
}

export class BalancesDepositEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Deposit')
  }

  /**
   *  Some amount was deposited (e.g. for transaction fees).
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('balances.Deposit') === 'cf0c633b4d95aa1626767eef7c869b6d51b4e864772aceeb18ec2d4ebd8a9101'
  }

  /**
   *  Some amount was deposited (e.g. for transaction fees).
   */
  get asV0(): [Uint8Array, bigint] {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some amount was deposited (e.g. for transaction fees).
   */
  get isV9140(): boolean {
    return this.ctx._chain.getEventHash('balances.Deposit') === '3e10f037979c6bc49d783be86e7fa6eb9642f270ffedf3352fae03a41fcf22e4'
  }

  /**
   * Some amount was deposited (e.g. for transaction fees).
   */
  get asV9140(): {who: v9140.AccountId32, amount: bigint} {
    assert(this.isV9140)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9140
  }

  get asLatest(): {who: v9140.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9140
  }
}

export class BalancesDustLostEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.DustLost')
  }

  /**
   *  An account was removed whose balance was non-zero but below ExistentialDeposit,
   *  resulting in an outright loss.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('balances.DustLost') === 'cc03bf0e885d06ab5165f4598e72250fd3e16bc5ba4dbb099deae1a97e4bef09'
  }

  /**
   *  An account was removed whose balance was non-zero but below ExistentialDeposit,
   *  resulting in an outright loss.
   */
  get asV0(): [Uint8Array, bigint] {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * An account was removed whose balance was non-zero but below ExistentialDeposit,
   * resulting in an outright loss.
   */
  get isV9140(): boolean {
    return this.ctx._chain.getEventHash('balances.DustLost') === '10bbf3b0d3ec83ccf1a23f056e1a60d4f66be59072296b48ebf9172ffcdab3f6'
  }

  /**
   * An account was removed whose balance was non-zero but below ExistentialDeposit,
   * resulting in an outright loss.
   */
  get asV9140(): {account: v9140.AccountId32, amount: bigint} {
    assert(this.isV9140)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9140
  }

  get asLatest(): {account: v9140.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9140
  }
}

export class BalancesEndowedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Endowed')
  }

  /**
   *  An account was created with some free balance.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('balances.Endowed') === '1b1c107d9931735af253054e543179401a9ff7b0beaee7fa7aa61319dc40a290'
  }

  /**
   *  An account was created with some free balance.
   */
  get asV0(): [Uint8Array, bigint] {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * An account was created with some free balance.
   */
  get isV9140(): boolean {
    return this.ctx._chain.getEventHash('balances.Endowed') === '089e94580955109582764033c0ac689ca378b9d2d399441102b094e72be986e7'
  }

  /**
   * An account was created with some free balance.
   */
  get asV9140(): {account: v9140.AccountId32, freeBalance: bigint} {
    assert(this.isV9140)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9140
  }

  get asLatest(): {account: v9140.AccountId32, freeBalance: bigint} {
    deprecateLatest()
    return this.asV9140
  }
}

export class BalancesReserveRepatriatedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.ReserveRepatriated')
  }

  /**
   *  Some balance was moved from the reserve of the first account to the second account.
   *  Final argument indicates the destination balance type.
   */
  get isV8(): boolean {
    return this.ctx._chain.getEventHash('balances.ReserveRepatriated') === '823db0df51a00ee6479e9d206981c4cb7b4afcdfb66f2b1626a9c053026a511e'
  }

  /**
   *  Some balance was moved from the reserve of the first account to the second account.
   *  Final argument indicates the destination balance type.
   */
  get asV8(): [Uint8Array, Uint8Array, bigint, v8.BalanceStatus] {
    assert(this.isV8)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some balance was moved from the reserve of the first account to the second account.
   * Final argument indicates the destination balance type.
   */
  get isV9140(): boolean {
    return this.ctx._chain.getEventHash('balances.ReserveRepatriated') === '1dac0fc1bd585ad6dd890e892bed23d70ca0545bf18fa96b4ce0ba7f3ffcdbd1'
  }

  /**
   * Some balance was moved from the reserve of the first account to the second account.
   * Final argument indicates the destination balance type.
   */
  get asV9140(): {from: v9140.AccountId32, to: v9140.AccountId32, amount: bigint, destinationStatus: v9140.BalanceStatus} {
    assert(this.isV9140)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9140
  }

  get asLatest(): {from: v9140.AccountId32, to: v9140.AccountId32, amount: bigint, destinationStatus: v9140.BalanceStatus} {
    deprecateLatest()
    return this.asV9140
  }
}

export class BalancesReservedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Reserved')
  }

  /**
   *  Some balance was reserved (moved from free to reserved).
   */
  get isV8(): boolean {
    return this.ctx._chain.getEventHash('balances.Reserved') === 'c595c2f71b423f0c1e0798ad69320278f19e727a480f58f312a585980145cf22'
  }

  /**
   *  Some balance was reserved (moved from free to reserved).
   */
  get asV8(): [Uint8Array, bigint] {
    assert(this.isV8)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some balance was reserved (moved from free to reserved).
   */
  get isV9140(): boolean {
    return this.ctx._chain.getEventHash('balances.Reserved') === 'bc321147cc9b824c85c432ac3c753b1319c9ad37babdd0e09ae0f99aeecc9360'
  }

  /**
   * Some balance was reserved (moved from free to reserved).
   */
  get asV9140(): {who: v9140.AccountId32, amount: bigint} {
    assert(this.isV9140)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9140
  }

  get asLatest(): {who: v9140.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9140
  }
}

export class BalancesSlashedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Slashed')
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior). \[who,
   * amount_slashed\]
   */
  get isV9122(): boolean {
    return this.ctx._chain.getEventHash('balances.Slashed') === '2483fc82edb5fdb0ff716405ceadec93041e61656d52a5eccaa1ae00b97e532b'
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior). \[who,
   * amount_slashed\]
   */
  get asV9122(): [v9122.AccountId32, bigint] {
    assert(this.isV9122)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior).
   */
  get isV9140(): boolean {
    return this.ctx._chain.getEventHash('balances.Slashed') === '087119b0d937e152a3831b84db573c85f89c84a6fd587673ee923c9f0061ed66'
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior).
   */
  get asV9140(): {who: v9140.AccountId32, amount: bigint} {
    assert(this.isV9140)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9140
  }

  get asLatest(): {who: v9140.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9140
  }
}

export class BalancesTransferEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Transfer')
  }

  /**
   *  Transfer succeeded (from, to, value).
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === '9611bd6b933331f197e8fa73bac36184681838292120987fec97092ae037d1c8'
  }

  /**
   *  Transfer succeeded (from, to, value).
   */
  get asV0(): [Uint8Array, Uint8Array, bigint] {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV9140(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === '99bc4786247456e0d4a44373efe405e598bfadfac87a7c41b0a82a91296836c1'
  }

  /**
   * Transfer succeeded.
   */
  get asV9140(): {from: v9140.AccountId32, to: v9140.AccountId32, amount: bigint} {
    assert(this.isV9140)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9140
  }

  get asLatest(): {from: v9140.AccountId32, to: v9140.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9140
  }
}

export class BalancesUnreservedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Unreserved')
  }

  /**
   *  Some balance was unreserved (moved from reserved to free).
   */
  get isV8(): boolean {
    return this.ctx._chain.getEventHash('balances.Unreserved') === 'ab01310b8e7de989b74305e42be550e888c6563ed4ea284f7c56ae7d79566f8c'
  }

  /**
   *  Some balance was unreserved (moved from reserved to free).
   */
  get asV8(): [Uint8Array, bigint] {
    assert(this.isV8)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some balance was unreserved (moved from reserved to free).
   */
  get isV9140(): boolean {
    return this.ctx._chain.getEventHash('balances.Unreserved') === 'be12b7473ab82e15891b929b20269451c731ffad981836a76ca0aae115b9e9f6'
  }

  /**
   * Some balance was unreserved (moved from reserved to free).
   */
  get asV9140(): {who: v9140.AccountId32, amount: bigint} {
    assert(this.isV9140)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9140
  }

  get asLatest(): {who: v9140.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9140
  }
}

export class BalancesWithdrawEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Withdraw')
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees). \[who, value\]
   */
  get isV9122(): boolean {
    return this.ctx._chain.getEventHash('balances.Withdraw') === 'c817a046dc9663596372188650f4e0b0897f9149bbc73435595dee84b7a9b049'
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees). \[who, value\]
   */
  get asV9122(): [v9122.AccountId32, bigint] {
    assert(this.isV9122)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees).
   */
  get isV9140(): boolean {
    return this.ctx._chain.getEventHash('balances.Withdraw') === '7d47465a5bcac497a2c0e813fe27069aff5d6086a74365c4f40bc0d5332e1356'
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees).
   */
  get asV9140(): {who: v9140.AccountId32, amount: bigint} {
    assert(this.isV9140)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9140
  }

  get asLatest(): {who: v9140.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9140
  }
}

export class CrowdloanContributedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'crowdloan.Contributed')
  }

  /**
   * Contributed to a crowd sale. `[who, fund_index, amount]`
   */
  get isV9110(): boolean {
    return this.ctx._chain.getEventHash('crowdloan.Contributed') === 'd943dbc2818504a7c969bb6b64a01f7217f0321441ab3f4ec6efeed498414ca4'
  }

  /**
   * Contributed to a crowd sale. `[who, fund_index, amount]`
   */
  get asV9110(): [v9110.AccountId32, v9110.Id, bigint] {
    assert(this.isV9110)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9110
  }

  get asLatest(): [v9110.AccountId32, v9110.Id, bigint] {
    deprecateLatest()
    return this.asV9110
  }
}

export class CrowdloanDissolvedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'crowdloan.Dissolved')
  }

  /**
   * Fund is dissolved. `[fund_index]`
   */
  get isV9110(): boolean {
    return this.ctx._chain.getEventHash('crowdloan.Dissolved') === '54d8d8c3e443fe2deb6899a99e70eeaac03db01683e93755bb1275f0448b0403'
  }

  /**
   * Fund is dissolved. `[fund_index]`
   */
  get asV9110(): v9110.Id {
    assert(this.isV9110)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9110
  }

  get asLatest(): v9110.Id {
    deprecateLatest()
    return this.asV9110
  }
}

export class StakingBondedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Bonded')
  }

  /**
   *  An account has bonded this amount.
   * 
   *  NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
   *  it will not be emitted for staking rewards when they are added to stake.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('staking.Bonded') === '5b39a66b662a377000b9049d1d0579b64ac3914f67f2e24478c47f9519348e95'
  }

  /**
   *  An account has bonded this amount.
   * 
   *  NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
   *  it will not be emitted for staking rewards when they are added to stake.
   */
  get asV0(): [Uint8Array, bigint] {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV0
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV0
  }
}

export class StakingEraPaidEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.EraPaid')
  }

  /**
   *  The era payout has been set; the first balance is the validator-payout; the second is
   *  the remainder from the maximum amount of reward.
   *  \[era_index, validator_payout, remainder\]
   */
  get isV9090(): boolean {
    return this.ctx._chain.getEventHash('staking.EraPaid') === '22f74c47ab34944f74004b6c3cb555af12518e637b6d8db16a901b18618e5933'
  }

  /**
   *  The era payout has been set; the first balance is the validator-payout; the second is
   *  the remainder from the maximum amount of reward.
   *  \[era_index, validator_payout, remainder\]
   */
  get asV9090(): [number, bigint, bigint] {
    assert(this.isV9090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9090
  }

  get asLatest(): [number, bigint, bigint] {
    deprecateLatest()
    return this.asV9090
  }
}

export class StakingPayoutStartedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.PayoutStarted')
  }

  /**
   *  The stakers' rewards are getting paid. \[era_index, validator_stash\]
   */
  get isV9090(): boolean {
    return this.ctx._chain.getEventHash('staking.PayoutStarted') === '5d5f465e63f8e8c1c8b5f4efe823b5bb459f94d2def500a75266a8674688272d'
  }

  /**
   *  The stakers' rewards are getting paid. \[era_index, validator_stash\]
   */
  get asV9090(): [number, Uint8Array] {
    assert(this.isV9090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9090
  }

  get asLatest(): [number, Uint8Array] {
    deprecateLatest()
    return this.asV9090
  }
}

export class StakingRewardEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Reward')
  }

  /**
   *  The staker has been rewarded by this amount. `AccountId` is the stash account.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('staking.Reward') === 'ebe05be4fffa12ed881a3c8b9720e125a08a8ec061a1277567097304749f198b'
  }

  /**
   *  The staker has been rewarded by this amount. `AccountId` is the stash account.
   */
  get asV0(): [Uint8Array, bigint] {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV0
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV0
  }
}

export class StakingRewardedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Rewarded')
  }

  /**
   *  The nominator has been rewarded by this amount. \[stash, amount\]
   */
  get isV9090(): boolean {
    return this.ctx._chain.getEventHash('staking.Rewarded') === 'ab35481e48b995b24e8bbb8563aca564fe1d358328da93f7ab9724a71e16fa38'
  }

  /**
   *  The nominator has been rewarded by this amount. \[stash, amount\]
   */
  get asV9090(): [Uint8Array, bigint] {
    assert(this.isV9090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9090
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV9090
  }
}

export class StakingSlashEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Slash')
  }

  /**
   *  One validator (and its nominators) has been slashed by the given amount.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('staking.Slash') === '292910df2be3c13dc03e888766e28924e0ce1c9d28324ad2c8ae60c385d9392e'
  }

  /**
   *  One validator (and its nominators) has been slashed by the given amount.
   */
  get asV0(): [Uint8Array, bigint] {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV0
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV0
  }
}

export class StakingSlashedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Slashed')
  }

  /**
   *  One validator (and its nominators) has been slashed by the given amount.
   *  \[validator, amount\]
   */
  get isV9090(): boolean {
    return this.ctx._chain.getEventHash('staking.Slashed') === '710d50416b984a45adadbd86e95fcbe0921a2c815ccc0781cffd97a656973fe6'
  }

  /**
   *  One validator (and its nominators) has been slashed by the given amount.
   *  \[validator, amount\]
   */
  get asV9090(): [Uint8Array, bigint] {
    assert(this.isV9090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9090
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV9090
  }
}

export class StakingUnbondedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Unbonded')
  }

  /**
   *  An account has unbonded this amount.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('staking.Unbonded') === '63922386d89348c29311e624f2b0b38b2ef3a21e557a832e8877d26cebbc4a59'
  }

  /**
   *  An account has unbonded this amount.
   */
  get asV0(): [Uint8Array, bigint] {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV0
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV0
  }
}

export class StakingWithdrawnEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Withdrawn')
  }

  /**
   *  An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
   *  from the unlocking queue.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('staking.Withdrawn') === 'e5777c4248ddad27aaa646bd4debdba4d0df848fafab0e02e2171b359b67379c'
  }

  /**
   *  An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
   *  from the unlocking queue.
   */
  get asV0(): [Uint8Array, bigint] {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV0
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV0
  }
}
