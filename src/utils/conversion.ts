import { convertStringToHex, convertHexToString } from 'xrpl';

export function stringToHex(str: string): string {
    return convertStringToHex(str);
}

export function hexToString(hex: string): string {
    return convertHexToString(hex);
}

export function parseAmount(amount: string, currency?: string, issuer?: string): any {
    if (!currency || currency === 'XRP') {
        // Convert XRP to drops
        return (parseFloat(amount) * 1000000).toString();
    } else {
        // Token amount
        return {
            currency: currency,
            value: amount,
            issuer: issuer
        };
    }
}

export function xrpToDrops(xrp: string | number): string {
    return (parseFloat(xrp.toString()) * 1000000).toString();
}

export function dropsToXrp(drops: string | number): string {
    return (parseInt(drops.toString()) / 1000000).toString();
}

export function timestampToRippleTime(timestamp: number): number {
    // Convert Unix timestamp to XRPL time
    const rippleEpoch = 946684800; // Unix timestamp for January 1, 2000 UTC
    return timestamp - rippleEpoch;
}

export function rippleTimeToTimestamp(rippleTime: number): number {
    // Convert XRPL time to Unix timestamp
    const rippleEpoch = 946684800; // Unix timestamp for January 1, 2000 UTC
    return rippleTime + rippleEpoch;
}
