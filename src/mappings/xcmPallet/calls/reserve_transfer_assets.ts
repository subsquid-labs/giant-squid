import { toHex } from '@subsquid/substrate-processor'
import { getOriginAccountId } from '../../../common/tools'
import { CallHandlerContext } from '../../types/contexts'
import { getReservedTeleportAssets } from './getters'
import { getAssets, getBeneficiare, getDestination, saveXcmTransfer } from './utils'

export async function handleReserveTransferAssets(ctx: CallHandlerContext) {
    const data = getReservedTeleportAssets(ctx)
    if (!data) return

    const accountId = getOriginAccountId(ctx.call.origin)
    if (!accountId) return

    try {
        const dest = getDestination(data.dest)
        const beneficiary = getBeneficiare(data.beneficiary)
        const assets = getAssets(data.assets)

        await saveXcmTransfer(ctx, {
            id: ctx.call.id,
            timestamp: new Date(ctx.block.timestamp),
            blockNumber: ctx.block.height,
            extrinsicHash: ctx.extrinsic.hash,
            fromId: accountId,
            to: {
                paraId: dest,
                id: toHex(beneficiary),
            },
            assets: assets.map((a) => ({
                symbol: 'KSM',
                amount: a.amount,
            })),
        })
    } catch (e) {
        ctx.log.warn(`${e}\nextrinsic: ${ctx.extrinsic.hash}\nblock: ${ctx.block.height}`)
    }
}
