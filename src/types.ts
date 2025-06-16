import { z } from "zod";

export interface XrplConfig {
    privateKey: string;
    network: 'testnet' | 'mainnet' | 'devnet';
    server?: string;
}

export interface McpTool {
    name: string;
    description: string;
    schema: any;
    handler: any;
}

export interface TokenBalance {
    currency: string;
    value: string;
    issuer?: string;
}

export interface TransactionResponse {
    hash?: string;
    status: string;
    message?: string;
    result?: any;
}

export interface AccountInfo {
    account: string;
    balance: string;
    flags: number;
    ledgerEntryType: string;
    ownerCount: number;
    previousTxnID: string;
    previousTxnLgrSeq: number;
    sequence: number;
}

export interface TrustLine {
    account: string;
    balance: string;
    currency: string;
    limit: string;
    limitPeer: string;
    qualityIn: number;
    qualityOut: number;
    flags?: number;
}

export interface NFToken {
    nftokenID: string;
    uri?: string;
    flags: number;
    transferFee?: number;
    issuer?: string;
}

export interface PaymentParams {
    destination: string;
    amount: string | {
        currency: string;
        value: string;
        issuer: string;
    };
    destinationTag?: number;
}

export interface TokenParams {
    currency: string;
    domain?: string;
    emailHash?: string;
    messageKey?: string;
    transferRate?: number;
    tickSize?: number;
    requireAuth?: boolean;
    requireDest?: boolean;
    disallowXRP?: boolean;
    globalFreeze?: boolean;
    noFreeze?: boolean;
    defaultRipple?: boolean;
}

export interface NFTokenParams {
    uri?: string;
    flags?: number;
    transferFee?: number;
    taxon?: number;
}

export interface OfferParams {
    takerGets: string | {
        currency: string;
        value: string;
        issuer: string;
    };
    takerPays: string | {
        currency: string;
        value: string;
        issuer: string;
    };
    expiration?: number;
    offerSequence?: number;
}
