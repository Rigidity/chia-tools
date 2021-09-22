import { bech32m } from 'bech32';
import { bytesToString, concatBytes, intToBytes } from 'bytes.ts';
import { createHash } from 'crypto';
import { formatHex, stripHex } from '../..';
import { convertBits } from '../../utils/bech';
import { Coin } from '../data/Coin';
import { Address } from './Address';

export class Hash {
    public bytes: Buffer;

    public static coin(coin: Coin): Hash {
        return Hash.generate(
            concatBytes(
                new Hash(coin.parent_coin_info).bytes,
                new Hash(coin.puzzle_hash).bytes,
                intToBytes(BigInt(coin.amount), 'big')
            )
        );
    }

    public static generate(message: Buffer | string): Hash {
        return new Hash(
            createHash('sha256').update(message).digest().toString('hex')
        );
    }

    constructor(hash: string) {
        this.bytes = Buffer.from(stripHex(hash), 'hex');
        if (this.bytes.length !== 32)
            throw new Error('Hashes must be 32 bytes in length.');
    }

    public toAddress(prefix: string): Address {
        return new Address(
            bech32m.encode(prefix, convertBits(this.bytes, 8, 5, true))
        );
    }

    public toString(): string {
        return formatHex(bytesToString(this.bytes, 'hex'));
    }
}
