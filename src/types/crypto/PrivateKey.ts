import {
    ModuleInstance,
    PrivateKey as BasePrivateKey,
} from '@chiamine/bls-signatures';
import { bytesToString } from 'bytes.ts';
import blsPromise from '../../utils/bls';
import { PublicKey } from './PublicKey';
import { Signature } from './Signature';

export class PrivateKey {
    public readonly privateKey: BasePrivateKey;
    public readonly bls: ModuleInstance;

    public static async from(source: Buffer | string): Promise<PrivateKey> {
        const bls = await blsPromise;
        return new PrivateKey(
            bls.PrivateKey.from_bytes(
                typeof source === 'string'
                    ? Buffer.from(source, 'hex')
                    : source,
                true
            ),
            bls
        );
    }

    constructor(privateKey: BasePrivateKey, bls: ModuleInstance) {
        this.privateKey = privateKey;
        this.bls = bls;
    }

    public getPublicKey(): PublicKey {
        return new PublicKey(this.privateKey.get_g1(), this.bls);
    }

    public sign(message: Buffer | string): Signature {
        return new Signature(
            this.bls.AugSchemeMPL.sign(
                this.privateKey,
                typeof message === 'string'
                    ? Buffer.from(message, 'hex')
                    : message
            ),
            this.bls
        );
    }

    public delete() {
        this.privateKey.delete();
    }

    public toString(): string {
        return bytesToString(Buffer.from(this.privateKey.serialize()), 'hex');
    }
}
