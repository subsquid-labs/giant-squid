import { Store } from '@subsquid/substrate-processor'
import { Parachain } from '../model'

export async function getOrCreateParachain(store: Store, id: number | string): Promise<Parachain> {
    let parachain = await store.findOne(Parachain, id, {
        relations: ['crowdloans'],
    })

    if (!parachain) parachain = await createParachain(store, id)

    return parachain
}

async function createParachain(store: Store, id: string | number): Promise<Parachain> {
    const parachain = new Parachain({ id: id.toString(), crowdloans: [] })
    await store.save(parachain)

    return parachain
}
