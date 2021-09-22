export function stripHex(hex: string): string {
    return hex.startsWith('0x') ? hex.slice(2) : hex;
}

export function formatHex(hex: string): string {
    return hex.startsWith('0x') ? hex : '0x' + hex;
}
