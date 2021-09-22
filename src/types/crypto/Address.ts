import { bech32m } from 'bech32';
import { bytesToHex } from 'bytes.ts';
import { convertBits } from '../../utils/bech';
import { Hash } from './Hash';

export class Address {
    public prefix: string;
    public bytes: Buffer;

    constructor(address: string) {
        const result = bech32m.decode(address);
        this.prefix = result.prefix;
        this.bytes = Buffer.from(result.words);
    }

    public toHash(): Hash {
        return new Hash(bytesToHex(convertBits(this.bytes, 5, 8, false)));
    }

    public toString(): string {
        return bech32m.encode(this.prefix, this.bytes);
    }
}
