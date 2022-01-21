import * as ss58 from "@subsquid/ss58"

export function encodeID(ID: Uint8Array, chainName: string) {
    return ss58.codec(chainName).encode(ID);
}