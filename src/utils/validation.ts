export function validateAddress(address: string): boolean {
    // Basic XRPL address validation
    return /^r[a-zA-Z0-9]{24,34}$/.test(address);
}

export function validateCurrencyCode(currency: string): boolean {
    // Standard currency codes (3 chars) or hex (40 chars)
    return /^[A-Z0-9]{3}$/.test(currency) || /^[A-F0-9]{40}$/i.test(currency);
}

export function validateDestinationTag(tag: number): boolean {
    return Number.isInteger(tag) && tag >= 0 && tag <= 4294967295;
}

export function validateAmount(amount: string): boolean {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
}

export function validateTransferFee(fee: number): boolean {
    return Number.isInteger(fee) && fee >= 0 && fee <= 50000;
}

export function validateNFTokenID(nftokenID: string): boolean {
    return /^[A-F0-9]{64}$/i.test(nftokenID);
}
