import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { decodeID } from '../common/helpers'
import config from '../config'
import { PayeeTypeRaw } from '../types/custom/stakingData'
import { saveController, savePayee } from './staking/base/savers'

const enum CallIndexes {
    SET_PAYEE = '0x0607',
    SET_CONTROLLER = '0x0608',
}

export async function handleSudoCall(ctx: ExtrinsicHandlerContext): Promise<void> {
    const call = ctx.extrinsic.args.find((arg) => arg.type === 'Call')
    if (!call) return

    ctx.extrinsic.signer = ctx.extrinsic.args[0].value as string

    switch ((call.value as { callIndex: string }).callIndex as CallIndexes) {
        case CallIndexes.SET_CONTROLLER: {
            const u8 = decodeID((call.value as { args: { controller: string } }).args.controller, config.prefix)
            if (!u8) return

            return await saveController(ctx, { controller: u8 })
        }
        case CallIndexes.SET_PAYEE: {
            const payeeName = Object.keys((call.value as { args: Record<string, unknown> }).args)[0]

            let u8 = null
            if (payeeName === 'account')
                u8 = decodeID(
                    (call.value as { args: Record<string, unknown> }).args[payeeName] as string,
                    config.prefix
                )

            return await savePayee(ctx, {
                payee: `${payeeName[0].toUpperCase()}${payeeName.slice(1)}` as PayeeTypeRaw,
                account: u8,
            })
        }
    }
}
