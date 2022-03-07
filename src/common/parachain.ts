import { Store } from '@subsquid/substrate-processor'
import { Parachain } from '../model'

export async function getParachain(store: Store, id: number | string): Promise<Parachain> {
    let parachain = await store.findOne(Parachain, id)

    if (!parachain) parachain = await createParachain(store, id)

    return parachain
}

async function createParachain(store: Store, id: string | number): Promise<Parachain> {
    const parachain = new Parachain({ id: id.toString() })

    await store.save(parachain)

    return parachain
}
