import { Client, Wallet, xrpToDrops, dropsToXrp } from 'xrpl';
import { AccountInfo, TokenBalance, TransactionResponse, PaymentParams, TokenParams, NFTokenParams, OfferParams, TrustLine, NFToken } from '../types';
import { getAccountInfo } from '../tools/xrpl/account';
import { getBalances } from '../tools/xrpl/balance';
import { sendPayment } from '../tools/xrpl/payment';
import { createToken } from '../tools/token/create';
import { setTrustLine } from '../tools/token/trustline';
import { mintNFToken, burnNFToken } from '../tools/token/nft';
import { createOffer, cancelOffer } from '../tools/transaction/offer';
import { getTransactionInfo, getAccountTransactions } from '../tools/transaction/management';
import { getOrderBook, getAccountOffers } from '../tools/dex/orderbook';
import { getXrplConfig } from '../config';
import { NETWORKS } from '../constants';

export class Agent {
    public client: Client;
    public wallet: Wallet;
    public walletAddress: string;
    public network: 'testnet' | 'mainnet' | 'devnet';

    constructor() {
        const config = getXrplConfig();
        
        // Determine server URL
        const serverUrl = config.server || NETWORKS[config.network];
        
        this.client = new Client(serverUrl);
        this.network = config.network;
        
        // Initialize wallet from private key
        this.wallet = Wallet.fromSeed(config.privateKey);
        this.walletAddress = this.wallet.address;
    }

    async connect(): Promise<void> {
        if (!this.client.isConnected()) {
            await this.client.connect();
        }
    }

    async disconnect(): Promise<void> {
        if (this.client.isConnected()) {
            await this.client.disconnect();
        }
    }

    async getWalletAddress(): Promise<string> {
        return this.walletAddress;
    }

    async getAccountInfo(address?: string): Promise<AccountInfo> {
        await this.connect();
        return getAccountInfo(this, address || this.walletAddress);
    }

    async getBalances(address?: string): Promise<TokenBalance[]> {
        await this.connect();
        return getBalances(this, address || this.walletAddress);
    }

    async sendPayment(params: PaymentParams): Promise<TransactionResponse> {
        await this.connect();
        return sendPayment(this, params);
    }

    async createToken(params: any): Promise<TransactionResponse> {
        await this.connect();
        return createToken(this, params);
    }

    async setTrustLine(currency: string, issuer: string, limit: string): Promise<TransactionResponse> {
        await this.connect();
        return setTrustLine(this, currency, issuer, limit);
    }

    async mintNFToken(params: NFTokenParams): Promise<TransactionResponse> {
        await this.connect();
        return mintNFToken(this, params);
    }

    async burnNFToken(nftokenID: string): Promise<TransactionResponse> {
        await this.connect();
        return burnNFToken(this, nftokenID);
    }

    async createOffer(params: any): Promise<TransactionResponse> {
        await this.connect();
        return createOffer(this, params);
    }

    async cancelOffer(offerSequence: number): Promise<TransactionResponse> {
        await this.connect();
        return cancelOffer(this, offerSequence);
    }

    async getTransaction(hash: string): Promise<any> {
        await this.connect();
        return getTransactionInfo(this, hash);
    }

    async getRecentTransactions(address?: string, limit?: number) {
        await this.connect();
        return getAccountTransactions(this, address || this.walletAddress, limit || 10);
    }

    // DEX methods
    async getOrderBook(takerGets: any, takerPays: any, limit?: number) {
        await this.connect();
        return getOrderBook(this, takerGets, takerPays, limit);
    }

    async getAccountOffers(address?: string) {
        await this.connect();
        return getAccountOffers(this, address || this.walletAddress);
    }

    // Utility methods
    xrpToDrops(xrp: string): string {
        return xrpToDrops(xrp);
    }

    dropsToXrp(drops: string): string {
        return `${dropsToXrp(drops)}`;
    }
}
