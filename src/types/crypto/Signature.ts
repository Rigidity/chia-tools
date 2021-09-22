import { G2Element, ModuleInstance } from '@chiamine/bls-signatures';
import { bytesToString, stringToBytes } from 'bytes.ts';
import blsPromise from '../../utils/bls';

export class Signature {
    public readonly signature: G2Element;
    public readonly bls: ModuleInstance;

    public static async from(
        source: Buffer | string | Buffer[] | string[] | Signature[]
    ): Promise<Signature> {
        const bls = await blsPromise;
        if (Array.isArray(source)) {
            const signatures: G2Element[] = [];
            for (const item of source) {
                if (item instanceof Signature) signatures.push(item.signature);
                else
                    signatures.push(
                        bls.G2Element.from_bytes(
                            typeof item === 'string'
                                ? stringToBytes(item, 'hex')
                                : item
                        )
                    );
            }
            return new Signature(bls.AugSchemeMPL.aggregate(signatures), bls);
        } else {
            return new Signature(
                bls.G2Element.from_bytes(
                    typeof source === 'string'
                        ? stringToBytes(source, 'hex')
                        : source
                ),
                bls
            );
        }
    }

    constructor(signature: G2Element, bls: ModuleInstance) {
        this.signature = signature;
        this.bls = bls;
    }

    public toString(): string {
        return bytesToString(Buffer.from(this.signature.serialize()), 'hex');
    }
}
