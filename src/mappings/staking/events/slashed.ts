import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { encodeId } from '../../../common/tools'
import { StakingSlashedEvent, StakingSlashEvent } from '../../../types/kusama/events'
import { EventContext } from '../../../types/support'
import { ActionData } from '../../types/data'

interface EventData {
    amount: bigint
    accountId: string
}

function getSlashedEvent(ctx: EventContext): EventData {
    const event = new StakingSlashedEvent(ctx)

    if (event.isV9090) {
        const [account, amount] = event.asV9090
        return {
            accountId: encodeId(account),
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

function getSlashEvent(ctx: EventContext): EventData {
    const event = new StakingSlashEvent(ctx)

    if (event.isV1020) {
        const [account, amount] = event.asV1020
        return {
            accountId: encodeId(account),
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function processSlashed(
    ctx: EventHandlerContext<
        unknown,
        {
            event: {
                args: true
                extrinsic: { hash: true }
            }
        }
    >
): SlashData {
    const data = ctx.event.name === 'Staking.Slash' ? getSlashEvent(ctx) : getSlashedEvent(ctx)
    return {
        id: ctx.event.id,
        timestamp: new Date(ctx.block.timestamp),
        blockNumber: ctx.block.height,
        extrinsicHash: ctx.event.extrinsic?.hash,
        stashId: data.accountId,
        amount: data.amount,
    }
}

export interface SlashData extends ActionData {
    amount: bigint
    stashId: string
}

// export async function saveSlash(ctx: EventHandlerContext, data: SlashData) {
//     const { accountId, amount } = data

//     const staker = await getOrCreateStaker(ctx, 'Stash', accountId)
//     if (!staker && isStorageCorrupted(ctx)) return
//     assert(staker != null, `Missing staking info for ${accountId}`)

//     const account = staker.stash

//     staker.totalSlash += data.amount
//     staker.activeBond = saturatingSumBigInt(staker.activeBond, amount * -1n)

//     await ctx.store.save(staker)

//     await ctx.store.insert(
//         new Slash({
//             ...getMeta(data),
//             account,
//             amount: data.amount,
//             era: data.era,
//         })
//     )
// }
