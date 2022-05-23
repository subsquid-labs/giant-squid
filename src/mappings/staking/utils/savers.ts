import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { convertPayee, encodeId, isExtrinsicSuccess } from '../../../common/helpers'
import { NominateData, PayeeCallData, RewardData, StakeData, ValidateData } from '../../../types/custom/stakingData'
import config from '../../../config'
import { BondType, PayeeType, StakingRole } from '../../../model'
import { accountManager, bondManager, rewardManager, slashManager, stakingInfoManager } from '../../../managers'
import storage from '../../../storage'

export async function saveRewardEvent(ctx: EventHandlerContext, data: RewardData) {
    const accountId = data.account ? encodeId(data.account) : ctx.extrinsic?.signer
    if (!accountId) return

    const reward = await rewardManager.create(ctx, {
        amount: data.amount,
        account: accountId,
    })

    const account = reward.account

    const stakingInfo = await stakingInfoManager.get(ctx, account.id)
    if (!stakingInfo) return

    account.totalReward = account.totalReward + data.amount

    if (stakingInfo?.payeeType === PayeeType.Staked) {
        account.activeBond = account.activeBond + data.amount
    }

    await accountManager.update(ctx, account)
}

export async function saveSlashEvent(ctx: EventHandlerContext, data: RewardData) {
    const accountId = data.account ? encodeId(data.account) : ctx.extrinsic?.signer
    if (!accountId) return

    const slash = await slashManager.create(ctx, {
        amount: data.amount,
        account: accountId,
        era: (await storage.staking.getCurrentEra(ctx))?.index || 0,
    })

    const account = slash.account

    const stakingInfo = await stakingInfoManager.get(ctx, account.id)
    if (!stakingInfo) return

    account.totalSlash = account.totalSlash + data.amount
    account.activeBond = account.activeBond - data.amount
    account.activeBond = account.activeBond > 0n ? account.activeBond : 0n

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
        success,
        amount: data.amount,
        account: accountId,
        type: bondType,
    })

    const account = bond.account

    const stakingInfo = await stakingInfoManager.get(ctx, account.id)
    if (!stakingInfo) return

    if (success) {
        account.activeBond =
            bondType === BondType.Bond
                ? BigInt(account.activeBond) + BigInt(data.amount)
                : BigInt(account.activeBond) - BigInt(data.amount)
        account.activeBond = account.activeBond > 0n ? account.activeBond : 0n

        await accountManager.update(ctx, account)
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

    const stash = (await storage.staking.ledger.get(ctx, controller))?.stash
    if (!stash) return

    const payeeAccount = data.account ? encodeId(data.account) : null
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

    const controller = encodeId(data.controller)
    if (!controller) return

    stakingInfo.controller = await accountManager.get(ctx, controller)

    await stakingInfoManager.update(ctx, stakingInfo)
}

export async function saveNominateCall(ctx: ExtrinsicHandlerContext, data: NominateData) {
    const controller = ctx.extrinsic.signer

    const stash = (await storage.staking.ledger.get(ctx, controller))?.stash
    if (!stash) return

    const stakingInfo = await stakingInfoManager.get(ctx, stash)
    if (!stakingInfo) return

    stakingInfo.role = StakingRole.Nominator

    await stakingInfoManager.update(ctx, stakingInfo)
}

export async function saveValidateCall(ctx: ExtrinsicHandlerContext, data: ValidateData) {
    const controller = ctx.extrinsic.signer

    const stash = (await storage.staking.ledger.get(ctx, controller))?.stash
    if (!stash) return

    const stakingInfo = await stakingInfoManager.get(ctx, stash)
    if (!stakingInfo) return

    stakingInfo.commission = data.commission
    stakingInfo.role = StakingRole.Validator

    await stakingInfoManager.update(ctx, stakingInfo)
}

export async function saveChillCall(ctx: ExtrinsicHandlerContext) {
    const controller = ctx.extrinsic.signer

    const stash = (await storage.staking.ledger.get(ctx, controller))?.stash
    if (!stash) return

    const stakingInfo = await stakingInfoManager.get(ctx, stash)
    if (!stakingInfo) return

    stakingInfo.role = StakingRole.Indle

    await stakingInfoManager.update(ctx, stakingInfo)
}
