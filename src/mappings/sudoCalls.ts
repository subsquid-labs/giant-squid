import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'
import { handleSetController, handleSetPayee } from './staking/extrinsics'

const enum CallIndexes {
    SET_PAYEE = '0x0607',
    SET_CONTROLLER = '0x0608',
}

export async function handleSudoCall(ctx: ExtrinsicHandlerContext): Promise<void> {
    const call = ctx.extrinsic.args.find((arg) => arg.type === 'Call')
    if (!call) return

    ctx.extrinsic.signer = ctx.extrinsic.args[0].value as string

    switch ((call.value as { callIndex: string }).callIndex as CallIndexes) {
        case CallIndexes.SET_CONTROLLER:
            return await handleSetController(ctx)
        case CallIndexes.SET_PAYEE:
            return await handleSetPayee(ctx)
    }
}
