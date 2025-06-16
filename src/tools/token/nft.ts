import { Agent } from '../../agent';
import { NFTokenParams, TransactionResponse } from '../../types';

export async function mintNFToken(agent: Agent, params: NFTokenParams): Promise<TransactionResponse> {
    try {
        const nftokenMint: any = {
            TransactionType: 'NFTokenMint',
            Account: agent.walletAddress,
            ...(params.uri && { URI: Buffer.from(params.uri).toString('hex').toUpperCase() }),
            ...(params.flags && { Flags: params.flags }),
            ...(params.transferFee && { TransferFee: params.transferFee }),
            ...(params.taxon && { NFTokenTaxon: params.taxon })
        };

        const prepared = await agent.client.autofill(nftokenMint);
        const signed = agent.wallet.sign(prepared);
        const result: any = await agent.client.submitAndWait(signed.tx_blob);

        return {
            hash: result.result.hash,
            status: result.result.meta?.TransactionResult || 'unknown',
            result: result.result
        };
    } catch (error) {
        return {
            status: 'error',
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}

export async function burnNFToken(agent: Agent, nftokenID: string): Promise<TransactionResponse> {
    try {
        const nftokenBurn: any = {
            TransactionType: 'NFTokenBurn',
            Account: agent.walletAddress,
            NFTokenID: nftokenID
        };

        const prepared = await agent.client.autofill(nftokenBurn);
        const signed = agent.wallet.sign(prepared);
        const result: any = await agent.client.submitAndWait(signed.tx_blob);

        return {
            hash: result.result.hash,
            status: result.result.meta?.TransactionResult || 'unknown',
            result: result.result
        };
    } catch (error) {
        return {
            status: 'error',
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}
