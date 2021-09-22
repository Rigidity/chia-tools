import { G1Element, ModuleInstance } from '@chiamine/bls-signatures';
import { bytesToString, stringToBytes } from 'bytes.ts';
import blsPromise from '../../utils/bls';
import { Signature } from './Signature';

export class PublicKey {
    public readonly publicKey: G1Element;
    public readonly bls: ModuleInstance;

    public static async from(source: Buffer | string): Promise<PublicKey> {
        const bls = await blsPromise;
        return new PublicKey(
            bls.G1Element.from_bytes(
                typeof source === 'string'
                    ? stringToBytes(source, 'hex')
                    : source
            ),
            bls
        );
    }

    public verify(signature: Signature, message: Buffer | string): boolean {
        return this.bls.AugSchemeMPL.verify(
            this.publicKey,
            typeof message === 'string' ? Buffer.from(message, 'hex') : message,
            signature.signature
        );
    }

    constructor(publicKey: G1Element, bls: ModuleInstance) {
        this.publicKey = publicKey;
        this.bls = bls;
    }

    public toString(): string {
        return bytesToString(Buffer.from(this.publicKey.serialize()), 'hex');
    }
}
