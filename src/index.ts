import loadBls, {
    G1Element,
    G2Element,
    PrivateKey,
} from '@chiamine/bls-signatures';
import { bech32m } from 'bech32';
import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { BinaryLike, createHash } from 'crypto';

const blsPromise = loadBls();

export function randomMnemonic(): string {
    return generateMnemonic();
}

export async function toSeed(mnemonic: string): Promise<Uint8Array> {
    return Uint8Array.from(await mnemonicToSeed(mnemonic));
}

export async function generatePrivateKey(
    seed: Uint8Array
): Promise<PrivateKey> {
    const bls = await blsPromise;
    return bls.AugSchemeMPL.key_gen(seed);
}

export function generatePublicKey(privateKey: PrivateKey): G1Element {
    return privateKey.get_g1();
}

export async function sign(
    privateKey: PrivateKey,
    message: Uint8Array
): Promise<G2Element> {
    const bls = await blsPromise;
    return bls.AugSchemeMPL.sign(privateKey, message);
}

export async function verify(
    publicKey: G1Element,
    message: Uint8Array,
    signature: G2Element
): Promise<boolean> {
    const bls = await blsPromise;
    return bls.AugSchemeMPL.verify(publicKey, message, signature);
}

export async function aggregate(signatures: G2Element[]): Promise<G2Element> {
    const bls = await blsPromise;
    return bls.AugSchemeMPL.aggregate(signatures);
}

export async function aggregateVerify(
    publicKeys: G1Element[],
    messages: Uint8Array[],
    signature: G2Element
): Promise<boolean> {
    const bls = await blsPromise;
    return bls.AugSchemeMPL.aggregate_verify(publicKeys, messages, signature);
}

export async function toPrivateKey(bytes: Uint8Array): Promise<PrivateKey> {
    const bls = await blsPromise;
    return bls.PrivateKey.from_bytes(bytes, false);
}

export async function toPublicKey(bytes: Uint8Array): Promise<G1Element> {
    const bls = await blsPromise;
    return bls.G1Element.from_bytes(bytes);
}

export async function toSignature(bytes: Uint8Array): Promise<G2Element> {
    const bls = await blsPromise;
    return bls.G2Element.from_bytes(bytes);
}

export function stringify(data: PrivateKey | G1Element | G2Element) {
    return toHex(data.serialize());
}

export interface AddressInfo {
    address: string;
    hash: string;
    prefix: string;
}

export function sha256(text: BinaryLike): Uint8Array {
    return Uint8Array.from(createHash('sha256').update(text).digest());
}

export function encodeString(text: string): Uint8Array {
    let array = new Uint8Array(text.length);
    for (let i = 0; i < text.length; i++) array[i] = text.charCodeAt(i);
    return array;
}

export function decodeString(array: Uint8Array): string {
    let text = '';
    for (let i = 0; i < array.length; i++)
        text += String.fromCharCode(array[i]);
    return text;
}

export function addressInfo(address: string): AddressInfo {
    const result = bech32m.decode(address);
    return {
        hash: toHex(convertBits(Uint8Array.from(result.words), 5, 8, false)),
        address,
        prefix: result.prefix,
    };
}

export function hashInfo(puzzleHash: string, prefix: string): AddressInfo {
    const result = bech32m.encode(
        prefix,
        convertBits(toBytes(puzzleHash), 8, 5, true)
    );
    return {
        hash: puzzleHash,
        address: result,
        prefix,
    };
}

function convertBits(
    bytes: Uint8Array,
    from: number,
    to: number,
    pad: boolean
): Uint8Array {
    let accumulate = 0;
    let bits = 0;
    let maxv = (1 << to) - 1;
    let result = [];
    for (const value of bytes) {
        const b = value & 0xff;
        if (b < 0 || b >> from > 0) throw new Error('Could not convert bits.');
        accumulate = (accumulate << from) | b;
        bits += from;
        while (bits >= to) {
            bits -= to;
            result.push((accumulate >> bits) & maxv);
        }
    }
    if (pad && bits > 0) {
        result.push((accumulate << (to - bits)) & maxv);
    } else if (bits >= from || ((accumulate << (to - bits)) & maxv) != 0) {
        throw new Error('Could not convert bits.');
    }
    return Uint8Array.from(result);
}

export function toHex(bytes: Uint8Array): string {
    return Buffer.from(bytes).toString('hex');
}

export function toBytes(hex: string): Uint8Array {
    return Uint8Array.from(Buffer.from(hex, 'hex'));
}

export function formatHex(hex: string): string {
    return '0x' + hex;
}

export function stripHex(hex: string): string {
    return hex.startsWith('0x') ? hex.slice(2) : hex;
}

export function validHex(hex: string): boolean {
    return /[0-9a-f]+/.test(hex);
}

export function validHash(hash: string): boolean {
    return /[0-9a-f]{64}/.test(hash);
}

export function concatBytes(...byteLists: Uint8Array[]): Uint8Array {
    const result = new Uint8Array(
        byteLists.reduce((aggregate, bytes) => aggregate + bytes.length, 0)
    );
    let index = 0;
    for (const bytes of byteLists) {
        result.set(bytes, index);
        index += bytes.length;
    }
    return result;
}

export function toCoinId(
    parent: Uint8Array,
    puzzle: Uint8Array,
    amount: Uint8Array
): Uint8Array {
    return sha256(concatBytes(parent, puzzle, amount));
}

export function encodeNumber(value: number): Uint8Array {
    let hex = value.toString(16);
    if (hex.length % 2 !== 0) hex = `0${hex}`;
    return toBytes(hex);
}
