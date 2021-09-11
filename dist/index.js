"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeBigInt = exports.encodeBigInt = exports.decodeNumber = exports.encodeNumber = exports.toCoinId = exports.concatBytes = exports.validHash = exports.validHex = exports.stripHex = exports.formatHex = exports.toBytes = exports.toHex = exports.hashInfo = exports.addressInfo = exports.decodeString = exports.encodeString = exports.sha256 = exports.stringify = exports.toSignature = exports.toPublicKey = exports.toPrivateKey = exports.aggregateVerify = exports.aggregate = exports.verify = exports.sign = exports.generatePublicKey = exports.generatePrivateKey = exports.toSeed = exports.randomMnemonic = void 0;
const bls_signatures_1 = __importDefault(require("@chiamine/bls-signatures"));
const bech32_1 = require("bech32");
const bip39_1 = require("bip39");
const crypto_1 = require("crypto");
const blsPromise = bls_signatures_1.default();
function randomMnemonic() {
    return bip39_1.generateMnemonic();
}
exports.randomMnemonic = randomMnemonic;
async function toSeed(mnemonic) {
    return Uint8Array.from(await bip39_1.mnemonicToSeed(mnemonic));
}
exports.toSeed = toSeed;
async function generatePrivateKey(seed) {
    const bls = await blsPromise;
    return bls.AugSchemeMPL.key_gen(seed);
}
exports.generatePrivateKey = generatePrivateKey;
function generatePublicKey(privateKey) {
    return privateKey.get_g1();
}
exports.generatePublicKey = generatePublicKey;
async function sign(privateKey, message) {
    const bls = await blsPromise;
    return bls.AugSchemeMPL.sign(privateKey, message);
}
exports.sign = sign;
async function verify(publicKey, message, signature) {
    const bls = await blsPromise;
    return bls.AugSchemeMPL.verify(publicKey, message, signature);
}
exports.verify = verify;
async function aggregate(signatures) {
    const bls = await blsPromise;
    return bls.AugSchemeMPL.aggregate(signatures);
}
exports.aggregate = aggregate;
async function aggregateVerify(publicKeys, messages, signature) {
    const bls = await blsPromise;
    return bls.AugSchemeMPL.aggregate_verify(publicKeys, messages, signature);
}
exports.aggregateVerify = aggregateVerify;
async function toPrivateKey(bytes) {
    const bls = await blsPromise;
    return bls.PrivateKey.from_bytes(bytes, false);
}
exports.toPrivateKey = toPrivateKey;
async function toPublicKey(bytes) {
    const bls = await blsPromise;
    return bls.G1Element.from_bytes(bytes);
}
exports.toPublicKey = toPublicKey;
async function toSignature(bytes) {
    const bls = await blsPromise;
    return bls.G2Element.from_bytes(bytes);
}
exports.toSignature = toSignature;
function stringify(data) {
    return toHex(data.serialize());
}
exports.stringify = stringify;
function sha256(text) {
    return Uint8Array.from(crypto_1.createHash('sha256').update(text).digest());
}
exports.sha256 = sha256;
function encodeString(text) {
    let array = new Uint8Array(text.length);
    for (let i = 0; i < text.length; i++)
        array[i] = text.charCodeAt(i);
    return array;
}
exports.encodeString = encodeString;
function decodeString(array) {
    let text = '';
    for (let i = 0; i < array.length; i++)
        text += String.fromCharCode(array[i]);
    return text;
}
exports.decodeString = decodeString;
function addressInfo(address) {
    const result = bech32_1.bech32m.decode(address);
    return {
        hash: formatHex(toHex(convertBits(Uint8Array.from(result.words), 5, 8, false))),
        address,
        prefix: result.prefix,
    };
}
exports.addressInfo = addressInfo;
function hashInfo(puzzleHash, prefix) {
    const result = bech32_1.bech32m.encode(prefix, convertBits(toBytes(stripHex(puzzleHash)), 8, 5, true));
    return {
        hash: puzzleHash,
        address: result,
        prefix,
    };
}
exports.hashInfo = hashInfo;
function convertBits(bytes, from, to, pad) {
    let accumulate = 0;
    let bits = 0;
    let maxv = (1 << to) - 1;
    let result = [];
    for (const value of bytes) {
        const b = value & 0xff;
        if (b < 0 || b >> from > 0)
            throw new Error('Could not convert bits.');
        accumulate = (accumulate << from) | b;
        bits += from;
        while (bits >= to) {
            bits -= to;
            result.push((accumulate >> bits) & maxv);
        }
    }
    if (pad && bits > 0) {
        result.push((accumulate << (to - bits)) & maxv);
    }
    else if (bits >= from || ((accumulate << (to - bits)) & maxv) != 0) {
        throw new Error('Could not convert bits.');
    }
    return Uint8Array.from(result);
}
function toHex(bytes) {
    return Buffer.from(bytes).toString('hex');
}
exports.toHex = toHex;
function toBytes(hex) {
    return Uint8Array.from(Buffer.from(hex, 'hex'));
}
exports.toBytes = toBytes;
function formatHex(hex) {
    return hex.startsWith('0x') ? hex : '0x' + hex;
}
exports.formatHex = formatHex;
function stripHex(hex) {
    return hex.startsWith('0x') ? hex.slice(2) : hex;
}
exports.stripHex = stripHex;
function validHex(hex) {
    return /[0-9a-f]+/.test(hex);
}
exports.validHex = validHex;
function validHash(hash) {
    return /[0-9a-f]{64}/.test(hash);
}
exports.validHash = validHash;
function concatBytes(...byteLists) {
    const result = new Uint8Array(byteLists.reduce((aggregate, bytes) => aggregate + bytes.length, 0));
    let index = 0;
    for (const bytes of byteLists) {
        result.set(bytes, index);
        index += bytes.length;
    }
    return result;
}
exports.concatBytes = concatBytes;
function toCoinId(parent, puzzle, amount) {
    return sha256(concatBytes(parent, puzzle, amount));
}
exports.toCoinId = toCoinId;
function encodeNumber(value) {
    let hex = value.toString(16);
    if (hex.length % 2 !== 0)
        hex = `0${hex}`;
    return toBytes(hex);
}
exports.encodeNumber = encodeNumber;
function decodeNumber(value) {
    return parseInt(toHex(value), 16);
}
exports.decodeNumber = decodeNumber;
function encodeBigInt(number) {
    let hex = number.toString(16);
    if (hex.length % 2)
        hex = '0' + hex;
    const length = hex.length / 2;
    const bytes = new Uint8Array(length);
    let i = 0;
    let j = 0;
    while (i < length) {
        bytes[i] = parseInt(hex.slice(j, j + 2), 16);
        i += 1;
        j += 2;
    }
    return bytes;
}
exports.encodeBigInt = encodeBigInt;
function decodeBigInt(bytes) {
    return BigInt(`0x${toHex(bytes)}`);
}
exports.decodeBigInt = decodeBigInt;
//# sourceMappingURL=index.js.map