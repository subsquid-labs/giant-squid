import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { convertPayee, encodeId, isExtrinsicSuccess } from '../../../common/helpers'
import { accountManager, stakingInfoManager } from '../../../managers'
import storage from '../../../storage'
import { PayeeTypeRaw } from '../../../types/custom/stakingData'
import { StakingSetPayeeCall } from '../../../types/generated/calls'

export interface CallData {
    payee: PayeeTypeRaw
    account?: Uint8Array
}

function getCallData(ctx: ExtrinsicHandlerContext): CallData {
    const call = new StakingSetPayeeCall(ctx)

    if (call.isV1020) {
        const { payee } = call.asV1020
        return {
            payee: payee.__kind as PayeeTypeRaw,
            account: (payee as { value: Uint8Array }).value,
        }
    } else if (call.isV9111) {
        const { payee } = call.asV9111
        return {
            payee: payee.__kind as PayeeTypeRaw,
            account: (payee as { value: Uint8Array }).value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleSetPayee(ctx: ExtrinsicHandlerContext) {
    if (!isExtrinsicSuccess(ctx)) return

    const data = getCallData(ctx)

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
