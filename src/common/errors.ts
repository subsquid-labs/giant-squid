export class NotFoundError extends Error {
    constructor(entityName: string, metaData?: Record<string, unknown>) {
        super(`Entity [${entityName}] was not found!; Metadata [${JSON.stringify(metaData)}]`)
    }
}

export class UnknownVersionError extends Error {
    constructor(name: string) {
        super(`There is no relevant version for ${name}`)
    }
}

export class AddressNotDecoded extends Error {
    constructor(sourceBuffers: Array<Uint8Array | undefined>) {
        const bufferStrings = sourceBuffers
            .filter((buf) => !!buf)
            .map((buf) => `[${(buf as Buffer).toString('utf-8')}]`)
            .join(', ')
        super(`Address was not encoded! [${bufferStrings}]`)
    }
}
