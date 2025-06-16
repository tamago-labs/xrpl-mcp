import { Agent } from '../../agent';

export async function getTransactionInfo(agent: Agent, hash: string): Promise<any> {
    try {
        const response = await agent.client.request({
            command: 'tx',
            transaction: hash
        });

        return response.result;
    } catch (error) {
        throw new Error(`Failed to get transaction info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function getAccountTransactions(agent: Agent, address: string, limit: number = 10) {
    try {
        const response = await agent.client.request({
            command: 'account_tx',
            account: address,
            ledger_index_min: -1,
            ledger_index_max: -1,
            limit: limit,
            binary: false
        });

        return response.result.transactions || [];
    } catch (error) {
        throw new Error(`Failed to get account transactions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
