import { UnknownVersionError } from '../../../common/errors'
import { encodeId, getOriginAccountId } from '../../../common/helpers'
import { accountManager } from '../../../managers'
import { PayeeType, Staker } from '../../../model'
import { PayeeTypeRaw } from '../../../types/custom/stakingData'
import { StakingSetPayeeCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'

export interface CallData {
    payee: PayeeTypeRaw
    account?: Uint8Array
}

function getCallData(ctx: CallContext): CallData {
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

export async function handleSetPayee(ctx: CallHandlerContext) {
    const data = getCallData(ctx)

    const accountId = getOriginAccountId(ctx.call.origin)

    const staker = await ctx.store.get(Staker, {
        where: {
            stashId: accountId,
        },
        relations: ['stash', 'controller'],
    })
    if (!staker) throw new Error(`Missing staking info for ${accountId}`)

    const payee = data.account ? encodeId(data.account) : null

    switch (data.payee) {
        case 'Account':
            staker.payeeType = PayeeType.Account
            staker.payee = payee ? await accountManager.get(ctx, payee) : null
            break
        case 'Stash':
            staker.payeeType = PayeeType.Stash
            staker.payee = staker.stash
            break
        case 'Staked':
            staker.payeeType = PayeeType.Staked
            staker.payee = staker.stash
        case 'Controller':
            staker.payeeType = PayeeType.Controller
            staker.payee = staker.controller
            break
        case 'None': {
            staker.payeeType = PayeeType.None
            staker.payee = undefined
            break
        }
        default:
            throw new Error(`Unknown payee type ${data.payee}`)
    }

    await ctx.store.save(staker)
}
