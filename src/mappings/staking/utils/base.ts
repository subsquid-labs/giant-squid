import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { encodeID, isExtrinsicSuccess, populateMeta } from '../../../common/helpers'
import { RewardData, StakeData } from '../../../types/custom/stakingData'
import config from '../../../config'
import { Reward, Slash, Bond, StakingInfo, BondType } from '../../../model'
import { accountManager, bondManager, chainManager, rewardManager } from '../../../managers'
import { getBonded, getCurrentEra, getPayee } from '../storage'

async function populateStakingItem(
    item: Reward | Slash | Bond,
    options: {
        ctx: EventHandlerContext
        data: RewardData | StakeData
    }
): Promise<Reward | Slash | Bond | undefined> {
    const { ctx, data } = options

    populateMeta(ctx, item)

    item.name = ctx.event.name
    item.chain = await chainManager.get(ctx, config.chainName)

    const id = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    if (!id) return undefined

    item.account = await accountManager.get(ctx, id)
    if (!item.account.stakingInfo) {
        const controller = await getBonded(ctx, id)
        const payeeData = await getPayee(ctx, id)

        item.account.stakingInfo = new StakingInfo({
            controller,
            payee: payeeData?.payee,
            payeeAccount: payeeData?.account,
        })
    }

    item.amount = data.amount

    return item
}

async function calculateTotalSlash(
    slash: Slash,
    options: {
        ctx: EventHandlerContext
        data: RewardData | StakeData
    }
) {
    const { ctx, data } = options

    const account = slash.account

    account.totalSlash = (account.totalSlash || 0n) + data.amount
    slash.total = account.totalSlash

    account.totalBond = (account.totalBond || 0n) - data.amount
    account.totalBond = account.totalBond > 0n ? account.totalBond : 0n

    await ctx.store.save(account)
}

export async function saveRewardEvent(ctx: EventHandlerContext, data: RewardData) {
    const accountId = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    if (!accountId) return

    await rewardManager.create(ctx, {
        chain: config.chainName,
        amount: data.amount,
        account: accountId,
    })
}

export async function saveSlashEvent(ctx: EventHandlerContext, data: RewardData) {
    const id = ctx.event.id

    const slash = new Slash({ id })

    if (!(await populateStakingItem(slash, { ctx, data }))) return
    await calculateTotalSlash(slash, { ctx, data })
    slash.era = await getCurrentEra(ctx)

    await ctx.store.insert(Slash, slash)
}

function getBondType(ctx: EventHandlerContext) {
    return ctx.extrinsic?.method === 'unbond' || ctx.event.method === 'Unbonded' ? BondType.Unbond : BondType.Bond
}

export async function saveStakeEvent(ctx: EventHandlerContext, data: StakeData, success = true) {
    const accountId = data.account ? encodeID(data.account, config.prefix) : ctx.extrinsic?.signer
    if (!accountId) return

    await bondManager.create(ctx, {
        chain: config.chainName,
        success,
        amount: data.amount,
        account: accountId,
        type: getBondType(ctx),
    })
}

export async function saveStakeCall(ctx: ExtrinsicHandlerContext, data: StakeData) {
    //in first versions of kusama there aren't event for bonds, so we need to handle them
    const alreadyHandled = ctx.block.events.find(
        (event) =>
            event.extrinsicId === ctx.extrinsic.id &&
            (event.name === 'staking.Bonded' || event.name === 'staking.Unbonded')
    )
    const success = isExtrinsicSuccess(ctx)
    if (alreadyHandled && success) return

    await saveStakeEvent(ctx, data, success)
}
