import { PayeeCallData } from '../../../types/custom/stakingData'
import { encodeID } from '../../../common/helpers'
import config from '../../../config'
import { accountManager } from '../../../managers'
import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { StakingInfo } from '../../../model'

export async function savePayee(ctx: ExtrinsicHandlerContext, data: PayeeCallData) {
    const accountId = data.account ? encodeID(data.account, config.prefix) : null

    const account = await accountManager.get(ctx, ctx.extrinsic.signer)
    if (!account.stakingInfo) {
        account.stakingInfo = new StakingInfo()
    }

    account.stakingInfo.payee = data.payee
    account.stakingInfo.payeeAccount = accountId

    await accountManager.upsert(ctx, account)
}

export async function saveController(ctx: ExtrinsicHandlerContext, data: { controller: Uint8Array }) {
    const controller = encodeID(data.controller, config.prefix)

    const account = await accountManager.get(ctx, ctx.extrinsic.signer)
    if (!account.stakingInfo) {
        account.stakingInfo = new StakingInfo()
    }

    account.stakingInfo.controller = controller

    await accountManager.upsert(ctx, account)
}
