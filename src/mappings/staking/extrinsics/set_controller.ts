import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { accountManager } from '../../../managers'
import { StakingInfo } from '../../../model'
import { getBonded, getPayee } from '../storage'

export async function handleSetController(ctx: ExtrinsicHandlerContext) {
    const account = await accountManager.get(ctx, ctx.extrinsic.signer)

    const controller = await getBonded(ctx, account.id)
    const payeeData = await getPayee(ctx, account.id)

    account.stakingInfo = new StakingInfo({
        controller,
        payee: payeeData?.payee,
        payeeAccount: payeeData?.account,
    })

    await ctx.store.save(account)
}
