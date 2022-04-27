import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { convertPayee, encodeID, isExtrinsicSuccess } from '../../../common/helpers'
import { NominateData, PayeeCallData, RewardData, StakeData } from '../../../types/custom/stakingData'
import config from '../../../config'
import { BondType, PayeeType, StakingRole } from '../../../model'
import {
    accountManager,
    bondManager,
    rewardManager,
    slashManager,
    stakingInfoManager,
    stakingPairManager,
} from '../../../managers'
import storage from '../../../storage'

export async function saveRewardEvent(ctx: EventHandlerContext, data: RewardData) {
    const accountId = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    if (!accountId) return

    const reward = await rewardManager.create(ctx, {
        chain: config.chainName,
        amount: data.amount,
        account: accountId,
    })

    const account = reward.account

    const stakingInfo = await stakingInfoManager.get(ctx, account.id)
    if (!stakingInfo) return

    account.totalReward = account.totalReward + data.amount

    if (stakingInfo?.payeeType === PayeeType.Staked) {
        account.totalBond = account.totalBond + data.amount
    }

    await accountManager.update(ctx, account)
}

export async function saveSlashEvent(ctx: EventHandlerContext, data: RewardData) {
    const accountId = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    if (!accountId) return

    const slash = await slashManager.create(ctx, {
        chain: config.chainName,
        amount: data.amount,
        account: accountId,
        era: (await storage.staking.getCurrentEra(ctx)) || 0,
    })

    const account = slash.account

    const stakingInfo = await stakingInfoManager.get(ctx, account.id)
    if (!stakingInfo) return

    account.totalSlash = account.totalSlash + data.amount
    account.totalBond = account.totalBond - data.amount
    account.totalBond = account.totalBond > 0n ? account.totalBond : 0n

    await accountManager.update(ctx, account)
}

function getBondType(ctx: EventHandlerContext) {
    return ctx.extrinsic?.method === 'unbond' || ctx.event.method === 'Unbonded' ? BondType.Unbond : BondType.Bond
}

export async function saveBondEvent(ctx: EventHandlerContext, data: StakeData, success = true) {
    const accountId = data.account || ctx.extrinsic?.signer
    if (!accountId) return

    const bondType = getBondType(ctx)

    const bond = await bondManager.create(ctx, {
        chain: config.chainName,
        success,
        amount: data.amount,
        account: accountId,
        type: bondType,
    })

    const account = bond.account

    const stakingInfo = await stakingInfoManager.get(ctx, account.id)
    if (!stakingInfo) return

    if (success) {
        account.totalBond =
            bondType === BondType.Bond
                ? BigInt(account.totalBond) + BigInt(data.amount)
                : BigInt(account.totalBond) - BigInt(data.amount)
        account.totalBond = account.totalBond > 0n ? account.totalBond : 0n
    }
}

export async function saveStakeCall(ctx: ExtrinsicHandlerContext, data: StakeData) {
    const success = isExtrinsicSuccess(ctx)

    //in first versions of kusama there aren't event for bonds, so we need to handle them
    const alreadyHandled = ctx.block.events.find(
        (event) =>
            event.extrinsicId === ctx.extrinsic.id &&
            (event.name === 'staking.Bonded' || event.name === 'staking.Unbonded')
    )

    if (alreadyHandled && success) return

    await saveBondEvent(ctx, data, success)
}

export async function savePayee(ctx: ExtrinsicHandlerContext, data: PayeeCallData) {
    const controller = ctx.extrinsic.signer

    const stash = (await storage.staking.getLedger(ctx, controller))?.stash
    if (!stash) return

    const payeeAccount = data.account ? encodeID(data.account, config.prefix) : null
    if (!payeeAccount) return

    const stakingInfo = await stakingInfoManager.get(ctx, stash)
    if (!stakingInfo) return

    const { payee, payeeType } = convertPayee(data.payee, {
        stash,
        controller,
        payeeAccount,
    })

    stakingInfo.payee = payee ? await accountManager.get(ctx, payee) : null
    stakingInfo.payeeType = payeeType

    await stakingInfoManager.update(ctx, stakingInfo)
}

export async function saveController(ctx: ExtrinsicHandlerContext, data: { controller: Uint8Array }) {
    const stash = ctx.extrinsic.signer

    const stakingInfo = await stakingInfoManager.get(ctx, stash)
    if (!stakingInfo) return

    const controller = encodeID(data.controller, config.prefix)
    if (!controller) return

    stakingInfo.controller = await accountManager.get(ctx, controller)

    await stakingInfoManager.update(ctx, stakingInfo)
}

export async function saveNominateCall(ctx: ExtrinsicHandlerContext, data: NominateData) {
    const controller = ctx.extrinsic.signer

    const stash = (await storage.staking.getLedger(ctx, controller))?.stash
    if (!stash) return

    const stakingInfo = await stakingInfoManager.get(ctx, stash)
    if (!stakingInfo) return

    if (stakingInfo.role === StakingRole.Nominator) {
        await stakingPairManager.deleteByNominator(ctx, stash)
    } else if (stakingInfo.role === StakingRole.Validator) {
        await stakingPairManager.deleteByValidator(ctx, stash)
        stakingInfo.commission = null
    }

    for (const validator of data.targets) {
        await stakingPairManager.create(ctx, {
            nominator: stash,
            validator,
        })
    }

    stakingInfo.role = StakingRole.Nominator

    await stakingInfoManager.update(ctx, stakingInfo)
}
