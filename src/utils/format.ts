export function formatAmount(amount: any): string {
    if (typeof amount === 'string') {
        // XRP amount in drops
        return `${parseInt(amount) / 1000000} XRP`;
    } else if (typeof amount === 'object' && amount.currency) {
        // Token amount
        return `${amount.value} ${amount.currency}`;
    }
    return amount.toString();
}

export function formatTimestamp(timestamp: number): string {
    // XRPL uses seconds since Ripple Epoch (January 1, 2000 UTC)
    const rippleEpoch = 946684800; // Unix timestamp for January 1, 2000 UTC
    const unixTimestamp = timestamp + rippleEpoch;
    return new Date(unixTimestamp * 1000).toISOString();
}

export function formatTransactionType(txType: string): string {
    // Convert transaction type to human readable format
    const types: { [key: string]: string } = {
        'Payment': 'Payment',
        'OfferCreate': 'Create Offer',
        'OfferCancel': 'Cancel Offer',
        'TrustSet': 'Set Trust Line',
        'AccountSet': 'Account Settings',
        'NFTokenMint': 'Mint NFToken',
        'NFTokenBurn': 'Burn NFToken',
        'NFTokenCreateOffer': 'Create NFToken Offer',
        'NFTokenAcceptOffer': 'Accept NFToken Offer',
        'NFTokenCancelOffer': 'Cancel NFToken Offer'
    };
    
    return types[txType] || txType;
}

export function formatFee(fee: string): string {
    return `${parseInt(fee) / 1000000} XRP`;
}
