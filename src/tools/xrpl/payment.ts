import { Agent } from '../../agent';
import { PaymentParams, TransactionResponse } from '../../types';

export async function sendPayment(agent: Agent, params: PaymentParams): Promise<TransactionResponse> {
    try {
        const payment: any = {
            TransactionType: 'Payment',
            Account: agent.walletAddress,
            Destination: params.destination,
            Amount: typeof params.amount === 'string' ? agent.xrpToDrops(params.amount) : params.amount,
            ...(params.destinationTag && { DestinationTag: params.destinationTag })
        };

        const prepared = await agent.client.autofill(payment);
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
