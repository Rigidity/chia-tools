/// <reference types="node" />
import { G1Element, G2Element, PrivateKey } from '@chiamine/bls-signatures';
import { BinaryLike } from 'crypto';
export declare function randomMnemonic(): string;
export declare function toSeed(mnemonic: string): Promise<Uint8Array>;
export declare function generatePrivateKey(seed: Uint8Array): Promise<PrivateKey>;
export declare function generatePublicKey(privateKey: PrivateKey): G1Element;
export declare function sign(privateKey: PrivateKey, message: Uint8Array): Promise<G2Element>;
export declare function verify(publicKey: G1Element, message: Uint8Array, signature: G2Element): Promise<boolean>;
export declare function aggregate(signatures: G2Element[]): Promise<G2Element>;
export declare function aggregateVerify(publicKeys: G1Element[], messages: Uint8Array[], signature: G2Element): Promise<boolean>;
export declare function toPrivateKey(bytes: Uint8Array): Promise<PrivateKey>;
export declare function toPublicKey(bytes: Uint8Array): Promise<G1Element>;
export declare function toSignature(bytes: Uint8Array): Promise<G2Element>;
export declare function stringify(data: PrivateKey | G1Element | G2Element): string;
export interface AddressInfo {
    address: string;
    hash: string;
    prefix: string;
}
export declare function sha256(text: BinaryLike): Uint8Array;
export declare function encodeString(text: string): Uint8Array;
export declare function decodeString(array: Uint8Array): string;
export declare function addressInfo(address: string): AddressInfo;
export declare function hashInfo(puzzleHash: string, prefix: string): AddressInfo;
export declare function toHex(bytes: Uint8Array): string;
export declare function toBytes(hex: string): Uint8Array;
export declare function formatHex(hex: string): string;
export declare function stripHex(hex: string): string;
export declare function validHex(hex: string): boolean;
export declare function validHash(hash: string): boolean;
export declare function concatBytes(...byteLists: Uint8Array[]): Uint8Array;
export declare function toCoinId(parent: Uint8Array, puzzle: Uint8Array, amount: Uint8Array): Uint8Array;
export declare function encodeNumber(value: number): Uint8Array;
export declare function decodeNumber(value: Uint8Array): number;
export declare function encodeBigInt(number: bigint): Uint8Array;
export declare function decodeBigInt(bytes: Uint8Array): bigint;
