import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { createPrevStorageContext, encodeID, isExtrinsicSuccess } from '../../../common/helpers'
import { PayeeCallData, PayeeTypeRaw, RewardData, StakeData } from '../../../types/custom/stakingData'
import config from '../../../config'
import { BondType, PayeeType, StakingRole } from '../../../model'
import { accountManager, bondManager, rewardManager, slashManager, stakingInfoManager } from '../../../managers'
import storage from '../../../storage'

async function createMissingStakingInfo(ctx: EventHandlerContext, stash: string) {
    const prevCtx = createPrevStorageContext(ctx)

    const controller = await storage.staking.getBonded(prevCtx, stash)
    if (!controller) return

    const payeeInfo = await storage.staking.getPayee(prevCtx, stash)
    if (!payeeInfo) return
    const { payee: payeeTypeRaw, account: payeeAccount } = payeeInfo

    const { payee, payeeType } = convertPayee(payeeTypeRaw, {
        stash,
        controller,
        payeeAccount,
    })

    //TODO: find way to get current role of staker
    const role = StakingRole.Indle

    return await stakingInfoManager.create(ctx, {
        stash,
        controller,
        payee,
        payeeType,
        role,
    })
}

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
    if (!stakingInfo) await createMissingStakingInfo(ctx, account.id)

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
    if (!stakingInfo) await createMissingStakingInfo(ctx, account.id)

    account.totalSlash = account.totalSlash + data.amount
    account.totalBond = account.totalBond - data.amount
    account.totalBond = account.totalBond > 0n ? account.totalBond : 0n

    await accountManager.update(ctx, account)
}

function getBondType(ctx: EventHandlerContext) {
    return ctx.extrinsic?.method === 'unbond' || ctx.event.method === 'Unbonded' ? BondType.Unbond : BondType.Bond
}

export async function saveBondEvent(ctx: EventHandlerContext, data: StakeData, success = true) {
    const accountId = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
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
    if (!stakingInfo) await createMissingStakingInfo(ctx, account.id)

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

function convertPayee(
    payeeTypeRaw: PayeeTypeRaw,
    accounts: {
        stash: string
        controller: string
        payeeAccount: string | null | undefined
    }
) {
    switch (payeeTypeRaw) {
        case 'Account':
            return {
                payeeType: PayeeType.Account,
                payee: accounts.payeeAccount || undefined,
            }
        case 'Stash':
            return {
                payeeType: PayeeType.Stash,
                payee: accounts.stash,
            }
        case 'Staked':
            return {
                payeeType: PayeeType.Staked,
                payee: accounts.stash,
            }
        case 'Controller':
            return {
                payeeType: PayeeType.Controller,
                payee: accounts.stash,
            }
        case 'None': {
            return {
                payeeType: PayeeType.Controller,
                payee: undefined,
            }
        }
    }
}

export async function savePayee(ctx: ExtrinsicHandlerContext, data: PayeeCallData) {
    const controller = ctx.extrinsic.signer

    const stash = (await storage.staking.getLedger(ctx, controller))?.stash
    if (!stash) return

    const payeeAccount = data.account ? encodeID(data.account, config.prefix) : null
    if (!payeeAccount) return

    const stakingInfo = await stakingInfoManager.get(ctx, stash)
    if (!stakingInfo) await createMissingStakingInfo(ctx, stash)
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
    if (!stakingInfo) await createMissingStakingInfo(ctx, stash)
    if (!stakingInfo) return

    const controller = encodeID(data.controller, config.prefix)
    if (!controller) return

    stakingInfo.controller = await accountManager.get(ctx, controller)

    await stakingInfoManager.update(ctx, stakingInfo)
}
