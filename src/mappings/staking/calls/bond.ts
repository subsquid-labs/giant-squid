import { UnknownVersionError } from '../../../common/errors'
import { encodeId, getOriginAccountId } from '../../../common/tools'
import { BondType, PayeeType } from '../../../model'
import { StakingBondCall } from '../../../types/generated/calls'
import { CallContext, CallHandlerContext } from '../../types/contexts'
import { createStaker } from '../../util/entities'
import { saveBond } from './utils'

interface CallData {
    amount: bigint
    controller: Uint8Array
    payee: PayeeDataCommon | PayeeDataAccount
}

interface PayeeDataCommon {
    destination: 'Staked' | 'Stash' | 'Controller' | 'None'
}

interface PayeeDataAccount {
    destination: 'Account'
    account: Uint8Array
}

function getCallData(ctx: CallContext): CallData {
    const call = new StakingBondCall(ctx)

    if (call.isV13) {
        const { value, controller, payee } = call.asV13

        return {
            amount: value,
            controller: controller,
            payee:
                payee.__kind === 'Account'
                    ? {
                          destination: payee.__kind,
                          account: payee.value,
                      }
                    : {
                          destination: payee.__kind,
                      },
        }
    } else if (call.isV29) {
        const { value, controller, payee } = call.asV29
        return {
            amount: value,
            controller: controller as Uint8Array,
            payee:
                payee.__kind === 'Account'
                    ? {
                          destination: payee.__kind,
                          account: payee.value,
                      }
                    : {
                          destination: payee.__kind,
                      },
        }
    } else {
        throw new UnknownVersionError(call.constructor.name)
    }
}

export async function handleBond(ctx: CallHandlerContext) {
    if (!ctx.call.success) return

    const data = getCallData(ctx)

    const accountId = getOriginAccountId(ctx.call.origin)
    if (!accountId) return

    const controllerId = encodeId(data.controller)

    await createStaker(ctx, {
        stashId: accountId,
        controllerId,
        payeeId:
            data.payee.destination === 'Stash' || data.payee.destination === 'Staked'
                ? accountId
                : data.payee.destination === 'Controller'
                ? controllerId
                : data.payee.destination === 'Account'
                ? encodeId(data.payee.account)
                : null,
        payeeType: data.payee.destination as PayeeType,
    })

    await saveBond(ctx, {
        id: ctx.call.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.extrinsic.hash,
        accountId,
        amount: data.amount,
        type: BondType.Bond,
        success: ctx.call.success,
    })
}
