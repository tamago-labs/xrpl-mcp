export const NETWORKS = {
    testnet: 'wss://s.altnet.rippletest.net:51233',
    mainnet: 'wss://xrplcluster.com',
    devnet: 'wss://s.devnet.rippletest.net:51233'
} as const;

export const MEMO_TYPES = {
    TEXT: 'text/plain',
    JSON: 'application/json',
    URL: 'text/uri-list'
} as const;

export const XRP_DECIMAL_PLACES = 6;
export const TOKEN_DECIMAL_PLACES = 15;

export const TRANSACTION_TYPES = {
    PAYMENT: 'Payment',
    OFFER_CREATE: 'OfferCreate',
    OFFER_CANCEL: 'OfferCancel',
    TRUST_SET: 'TrustSet',
    ACCOUNT_SET: 'AccountSet',
    NFTOKEN_MINT: 'NFTokenMint',
    NFTOKEN_BURN: 'NFTokenBurn',
    NFTOKEN_CREATE_OFFER: 'NFTokenCreateOffer',
    NFTOKEN_ACCEPT_OFFER: 'NFTokenAcceptOffer',
    NFTOKEN_CANCEL_OFFER: 'NFTokenCancelOffer'
} as const;

export const FLAGS = {
    ACCOUNT_SET: {
        REQUIRE_DEST_TAG: 0x00000001,
        REQUIRE_AUTH: 0x00000002,
        DISALLOW_XRP: 0x00000008,
        DISABLE_MASTER: 0x00000010,
        ACCOUNT_TXN_ID: 0x00000020,
        NO_FREEZE: 0x00000040,
        GLOBAL_FREEZE: 0x00000080,
        DEFAULT_RIPPLE: 0x00020000
    },
    TRUST_SET: {
        SET_F_RIPPLE: 0x00020000,
        CLEAR_NO_RIPPLE: 0x00020000,
        SET_NO_RIPPLE: 0x00000000,
        CLEAR_F_RIPPLE: 0x00000000
    },
    NFTOKEN: {
        BURNABLE: 0x00000001,
        ONLY_XRP: 0x00000002,
        TRUST_LINE: 0x00000004,
        TRANSFERABLE: 0x00000008
    }
} as const;
