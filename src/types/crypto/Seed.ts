import { ModuleInstance } from '@chiamine/bls-signatures';
import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { bytesToString } from 'bytes.ts';
import blsPromise from '../../utils/bls';
import { PrivateKey } from './PrivateKey';

export class Seed {
    public seed: Buffer;
    public bls: ModuleInstance;

    public static mnemonic(): string {
        return generateMnemonic();
    }

    public static async from(mnemonic: string): Promise<Seed> {
        const bls = await blsPromise;
        return new Seed(await mnemonicToSeed(mnemonic), bls);
    }

    constructor(seed: Buffer, bls: ModuleInstance) {
        this.seed = seed;
        this.bls = bls;
    }

    public getPrivateKey(): PrivateKey {
        return new PrivateKey(
            this.bls.AugSchemeMPL.key_gen(this.seed),
            this.bls
        );
    }

    public toString(): string {
        return bytesToString(this.seed, 'hex');
    }
}
