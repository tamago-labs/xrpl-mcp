import { Agent } from '../../agent';
import { TransactionResponse } from '../../types';

export async function setTrustLine(agent: Agent, currency: string, issuer: string, limit: string): Promise<TransactionResponse> {
    try {
        const trustSet: any = {
            TransactionType: 'TrustSet',
            Account: agent.walletAddress,
            LimitAmount: {
                currency: currency,
                issuer: issuer,
                value: limit
            }
        };

        const prepared = await agent.client.autofill(trustSet);
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
