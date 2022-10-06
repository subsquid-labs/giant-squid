import * as events from './events'
import * as extrinsics from './calls'
import { BatchContext, CommonHandlerContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { Account, Bond, PayeeType, Reward, Slash, Staker } from '../../model'
import { processRewarded, processSlashed, RewardData, SlashData } from './events'
import { createEntityMap, getOriginAccountId, last, processItem } from '../../common/tools'
import { In } from 'typeorm'
import { getMeta } from '../util/actions'
import storage from '../../storage'
import { CallItem, EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { BondData, processBond } from './events/bond'
import { processUnbond, UnbondData } from './events/unbond'

export default {
    events,
    extrinsics,
}

export async function processStaking(ctx: BatchContext<Store, Item>) {
    const accountsIds = new Set<string>()
    const stakersIds = new Set<string>()

    const rewardsData = new Map<SubstrateBlock, RewardData[]>()
    const slashesData = new Map<SubstrateBlock, SlashData[]>()
    const bondsData = new Array<BondData | UnbondData>()

    const controllersId = new Set<string>()

    processItem(ctx, (block, item) => {
        switch (item.name) {
            case 'Staking.Reward':
            case 'Staking.Rewarded': {
                const reward = processRewarded({ ...ctx, block, event: item.event as any })
                if (!reward) return

                let blockRewards = rewardsData.get(block)
                if (!blockRewards) {
                    blockRewards = []
                    rewardsData.set(block, blockRewards)
                }
                blockRewards.push(reward)
                return
            }
            case 'Staking.Slash':
            case 'Staking.Slashed': {
                const slash = processSlashed({ ...ctx, block, event: item.event as any })
                if (!slash) return

                let blockSlashes = slashesData.get(block)
                if (!blockSlashes) {
                    blockSlashes = []
                    slashesData.set(block, blockSlashes)
                }
                blockSlashes.push(slash)
                return
            }
            case 'Staking.Bonded': {
                const bond = processBond({ ...ctx, block, event: item.event as any })
                if (bond) bondsData.push(bond)
                return
            }
            case 'Staking.Unbonded': {
                const bond = processUnbond({ ...ctx, block, event: item.event as any })
                if (bond) bondsData.push(bond)
                return
            }
            case 'Staking.set_controller': {
                const id = getOriginAccountId(item.call.origin)
                if (id) stakersIds.add(id)
                return
            }
            case 'Staking.set_payee':
            case 'Staking.nominate':
            case 'Staking.validate':
            case 'Staking.chill': {
                const id = getOriginAccountId(item.call.origin)
                if (id) controllersId.add(id)
                return
            }
        }
    })

    const rewards: Reward[] = []
    for (const [block, blockRewardData] of rewardsData) {
        await processRewards({ ...ctx, block }, blockRewardData).then((r) => {
            rewards.push(...r)
        })
    }
    rewards.forEach((reward) => {
        reward.accountId && accountsIds.add(reward.accountId)
        stakersIds.add(reward.stakerId)
    })

    const slashes: Slash[] = []
    for (const [block, blockSlashData] of slashesData) {
        await processSlashes({ ...ctx, block }, blockSlashData).then((s) => slashes.push(...s))
    }
    slashes.forEach((slash) => {
        accountsIds.add(slash.accountId)
        stakersIds.add(slash.stakerId)
    })

    const bonds: Bond[] = []
    await processBonds({ ...ctx, block: last(ctx.blocks).header }, bondsData).then((s) => bonds.push(...s))
    bonds.forEach((bond) => {
        accountsIds.add(bond.accountId)
        stakersIds.add(bond.stakerId)
    })

    await storage.staking.bonded
        .getMany({ ...ctx, block: last(ctx.blocks).header }, [...controllersId])
        .then((ids) => ids?.forEach((id) => id && stakersIds.add(id)))

    const stakers = await ctx.store.findBy(Staker, { id: In([...stakersIds]) }).then(createEntityMap)
    for (const id of stakersIds) {
        if (stakers.has(id)) continue
        stakers.set(id, createStaker(id))
    }
    await updateStakers({ ...ctx, block: last(ctx.blocks).header }, [...stakers.values()]).then((updatedStakers) =>
        updatedStakers.forEach((staker) => {
            accountsIds.add(staker.stashId)
            staker.controllerId && accountsIds.add(staker.controllerId)
            staker.payeeId && accountsIds.add(staker.payeeId)
        })
    )
    slashes.forEach((slash) => {
        const staker = stakers.get(slash.stakerId)
        if (staker) staker.totalSlash += slash.amount
    })
    rewards.forEach((reward) => {
        const staker = stakers.get(reward.stakerId)
        if (staker) staker.totalReward += reward.amount
    })

    const accounts = await ctx.store.findBy(Account, { id: In([...accountsIds]) }).then(createEntityMap)
    for (const id of accountsIds) {
        if (accounts.has(id)) continue
        accounts.set(id, createAccount(id))
    }
    await updateAccounts({ ...ctx, block: last(ctx.blocks).header }, [...accounts.values()])

    await ctx.store.save([...accounts.values()])
    await ctx.store.save([...stakers.values()])
    await ctx.store.insert(rewards)
    await ctx.store.insert(slashes)
    await ctx.store.insert(bonds)
}

async function processRewards(ctx: CommonHandlerContext<Store>, rewardsData: RewardData[]) {
    const stakersIdsSet = new Set<string>()

    for (const rewardData of rewardsData) {
        stakersIdsSet.add(rewardData.stashId)
    }

    const stakersIds = [...stakersIdsSet]
    const payeeIds = new Map<string, string>()

    const controllerPayees: string[] = []
    await storage.staking.payee.getMany(ctx, stakersIds).then((payees) =>
        payees?.forEach((payee, i) => {
            payee.dest === 'Account'
                ? payeeIds.set(stakersIds[i], payee.accountId!)
                : payee.dest === 'Controller'
                ? controllerPayees.push(stakersIds[i])
                : payee.dest === 'Staked' || payee.dest === 'Stash'
                ? payeeIds.set(stakersIds[i], stakersIds[i])
                : null
        })
    )
    await storage.staking.bonded
        .getMany(ctx, controllerPayees)
        .then((ids) => ids?.forEach((id, i) => payeeIds.set(controllerPayees[i], id!)))

    return rewardsData.map((rewardData) => {
        const { stashId, validatorId, era, amount } = rewardData
        const payeeId = payeeIds.get(rewardData.stashId)
        return new Reward({
            ...getMeta(rewardData),
            stakerId: stashId,
            accountId: payeeId,
            validatorId: validatorId,
            amount,
            era,
        })
    })
}

async function processSlashes(ctx: CommonHandlerContext<Store>, slashesData: SlashData[]) {
    const era =
        (await storage.staking.getActiveEra(ctx).then((d) => d?.index)) ??
        (await storage.staking.getCurrentEra(ctx).then((d) => d?.index))

    return slashesData.map((slashData) => {
        const { stashId, amount } = slashData
        return new Slash({
            ...getMeta(slashData),
            stakerId: stashId,
            accountId: stashId,
            amount,
            era,
        })
    })
}

async function processBonds(ctx: CommonHandlerContext<Store>, bondsData: (BondData | UnbondData)[]) {
    return bondsData.map((bondData) => {
        const { type, amount, stashId } = bondData
        return new Bond({
            ...getMeta(bondData),
            stakerId: stashId,
            accountId: stashId,
            amount,
            type,
        })
    })
}

function createStaker(id: string) {
    return new Staker({
        id: id,
        stashId: id,
        activeBond: 0n,
        totalReward: 0n,
        totalSlash: 0n,

        updatedAt: -1,
    })
}

function createAccount(id: string) {
    return new Account({
        id: id,
        updatedAt: -1,
    })
}

async function updateStakers(ctx: CommonHandlerContext<Store>, stakersList: Staker[]) {
    const stakers = stakersList.filter((s) => s.updatedAt < ctx.block.height)

    await storage.staking.bonded
        .getMany(
            ctx,
            stakers.map((s) => s.stashId)
        )
        .then((ids) => ids?.forEach((id, i) => (stakers[i].controllerId = id)))

    const stakersWithControllers = stakers.filter((s) => s.controllerId != null)
    await storage.staking.ledger
        .getMany(
            ctx,
            stakersWithControllers.map((s) => s.controllerId!)
        )
        .then((ledgers) =>
            ledgers?.forEach(
                (ledger, i) =>
                    (stakersWithControllers[i].activeBond = ledger?.active ?? stakersWithControllers[i].activeBond)
            )
        )

    await storage.staking.payee
        .getMany(
            ctx,
            stakers.map((s) => s.stashId)
        )
        .then((payees) =>
            payees?.forEach((payee, i) => {
                const s = stakers[i]
                s.payeeType = payee.dest as PayeeType
                s.payeeId =
                    payee.dest === 'Account'
                        ? payee.accountId
                        : payee.dest === 'Controller'
                        ? s.controllerId
                        : payee.dest === 'Staked' || payee.dest === 'Stash'
                        ? s.stashId
                        : null
            })
        )

    stakers.forEach((s) => (s.updatedAt = ctx.block.height))
    return stakers
}

async function updateAccounts(ctx: CommonHandlerContext<Store>, accountsList: Account[]) {
    const accounts = accountsList.filter((s) => s.updatedAt < ctx.block.height)

    accounts.forEach((s) => (s.updatedAt = ctx.block.height))
}

type Item =
    | EventItem<
          'Staking.Reward',
          {
              event: {
                  args: true
                  call: { args: true }
                  extrinsic: { hash: true }
              }
          }
      >
    | EventItem<
          'Staking.Rewarded',
          {
              event: {
                  args: true
                  call: { args: true }
                  extrinsic: { hash: true }
              }
          }
      >
    | EventItem<
          'Staking.Slashed',
          {
              event: {
                  args: true
                  extrinsic: { hash: true }
              }
          }
      >
    | EventItem<
          'Staking.Slash',
          {
              event: {
                  args: true
                  extrinsic: { hash: true }
              }
          }
      >
    | EventItem<
          'Staking.Bonded',
          {
              event: {
                  args: true
                  extrinsic: { hash: true }
              }
          }
      >
    | EventItem<
          'Staking.Unbonded',
          {
              event: {
                  args: true
                  extrinsic: { hash: true }
              }
          }
      >
    | CallItem<'Staking.set_controller', { call: { origin: true } }>
    | CallItem<'Staking.set_payee', { call: { origin: true } }>
    | CallItem<'Staking.nominate', { call: { origin: true } }>
    | CallItem<'Staking.validate', { call: { origin: true } }>
    | CallItem<'Staking.chill', { call: { origin: true } }>
