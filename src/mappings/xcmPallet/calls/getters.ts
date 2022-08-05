import { UnknownVersionError } from '../../../common/errors'
import { XcmPalletTeleportAssetsCall, XcmPalletReserveTransferAssetsCall } from '../../../types/generated/calls'
import { CallHandlerContext } from '../../types/contexts'

export function getXcmTeleportAssets(ctx: CallHandlerContext) {
    const data = new XcmPalletTeleportAssetsCall(ctx)

    if (data.isV9140) {
        return data.asV9140
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getReservedTeleportAssets(ctx: CallHandlerContext) {
    const data = new XcmPalletReserveTransferAssetsCall(ctx)

    if (data.isV9140) {
        return data.asV9140
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}
