import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/helpers'
import { accountManager, stakingInfoManager } from '../../../managers'
import { PayeeType } from '../../../model'
import storage from '../../../storage'
import { PayeeTypeRaw } from '../../../types/custom/stakingData'
import { StakingSetPayeeCall } from '../../../types/generated/calls'

export interface CallData {
    payee: PayeeTypeRaw
    account?: Uint8Array
}

function getCallData(ctx: ExtrinsicHandlerContext): CallData {
    const call = new StakingSetPayeeCall(ctx)

    if (call.isV13) {
        const { payee } = call.asV13
        return {
            payee: payee.__kind as PayeeTypeRaw,
            account: (payee as { value: Uint8Array }).value,
        }
    } else if (call.isV29) {
        const { payee } = call.asV29
        return {
            payee: payee.__kind as PayeeTypeRaw,
            account: (payee as { value: Uint8Array }).value,
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleSetPayee(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    const controllerId = ctx.extrinsic.signer

    const stashId = (await storage.staking.ledger.get(ctx, controllerId))?.stash
    if (!stashId) return

    const stakingInfo = await stakingInfoManager.get(ctx, stashId)
    if (!stakingInfo) return

    const payee = data.account ? encodeId(data.account) : null

    switch (data.payee) {
        case 'Account':
            stakingInfo.payeeType = PayeeType.Account
            stakingInfo.payee = payee ? await accountManager.get(ctx, payee) : null
            break
        case 'Stash':
            stakingInfo.payeeType = PayeeType.Stash
            stakingInfo.payee = stakingInfo.stash
            break
        case 'Staked':
            stakingInfo.payeeType = PayeeType.Staked
            stakingInfo.payee = stakingInfo.stash
        case 'Controller':
            stakingInfo.payeeType = PayeeType.Controller
            stakingInfo.payee = stakingInfo.controller
            break
        case 'None': {
            stakingInfo.payeeType = PayeeType.None
            stakingInfo.payee = undefined
            break
        }
        default:
            throw new Error(`Unknown payee type ${data.payee}`)
    }

    await stakingInfoManager.update(ctx, stakingInfo)
}
