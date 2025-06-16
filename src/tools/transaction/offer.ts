import { Agent } from '../../agent';
import { OfferParams, TransactionResponse } from '../../types';

export async function createOffer(agent: Agent, params: OfferParams): Promise<TransactionResponse> {
    try {
        const offerCreate: any = {
            TransactionType: 'OfferCreate',
            Account: agent.walletAddress,
            TakerGets: params.takerGets,
            TakerPays: params.takerPays,
            ...(params.expiration && { Expiration: params.expiration }),
            ...(params.offerSequence && { OfferSequence: params.offerSequence })
        };

        const prepared = await agent.client.autofill(offerCreate);
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

export async function cancelOffer(agent: Agent, offerSequence: number): Promise<TransactionResponse> {
    try {
        const offerCancel: any = {
            TransactionType: 'OfferCancel',
            Account: agent.walletAddress,
            OfferSequence: offerSequence
        };

        const prepared = await agent.client.autofill(offerCancel);
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
