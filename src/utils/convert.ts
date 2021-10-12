import { toBufferBE } from 'bigint-buffer';
import { bytesToInt } from 'bytes.ts';

export function bytesToIntCLVM(bytes: Buffer): bigint {
    return bytes.length === 0 ? 0n : bytesToInt(bytes, 'big');
}

export function intToBytesCLVM(int: bigint): Buffer {
    if (int === 0n) return Buffer.from([]);
    const bits = int.toString(2);
    const size = (bits.length + 8) >> 3;
    let bytes = toBufferBE(int, size);
    while (bytes.length > 1 && bytes[0] === (bytes[1] & 0x80 ? 0xff : 0x00))
        bytes = bytes.slice(1);
    return bytes;
}
