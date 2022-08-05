import { UnknownVersionError } from '../../../common/errors'
import { XcmPalletTeleportAssetsCall, XcmPalletReserveTransferAssetsCall } from '../../../types/generated/calls'
import { CallHandlerContext } from '../../types/contexts'

export function getXcmTeleportAssets(ctx: CallHandlerContext) {
    const data = new XcmPalletTeleportAssetsCall(ctx)

    if (data.isV9010) {
        const { dest, beneficiary, assets } = data.asV9010
        return {
            dest: { __kind: 'V0' as const, value: dest },
            beneficiary: { __kind: 'V0' as const, value: beneficiary },
            assets: { __kind: 'V0' as const, value: assets },
        }
    } else if (data.isV9100) {
        return data.asV9100
    } else if (data.isV9111) {
        return data.asV9111
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getReservedTeleportAssets(ctx: CallHandlerContext) {
    const data = new XcmPalletReserveTransferAssetsCall(ctx)

    if (data.isV9030) {
        const { dest, beneficiary, assets } = data.asV9030
        return {
            dest: { __kind: 'V0' as const, value: dest },
            beneficiary: { __kind: 'V0' as const, value: beneficiary },
            assets: { __kind: 'V0' as const, value: assets },
        }
    } else if (data.isV9100) {
        return data.asV9100
    } else if (data.isV9111) {
        return data.asV9111
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}
