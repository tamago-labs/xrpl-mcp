import { Agent } from '../../agent';
import { TokenBalance } from '../../types';

export async function getBalances(agent: Agent, address: string): Promise<TokenBalance[]> {
    try {
        const balances: TokenBalance[] = [];

        // Get XRP balance
        const accountInfo = await agent.client.request({
            command: 'account_info',
            account: address,
            ledger_index: 'current'
        });

        balances.push({
            currency: 'XRP',
            value: agent.dropsToXrp(accountInfo.result.account_data.Balance)
        });

        // Get token balances (trust lines)
        try {
            const trustLines = await agent.client.request({
                command: 'account_lines',
                account: address,
                ledger_index: 'current'
            });

            if (trustLines.result.lines) {
                for (const line of trustLines.result.lines) {
                    balances.push({
                        currency: line.currency,
                        value: line.balance,
                        issuer: line.account
                    });
                }
            }
        } catch (error) {
            // Trust lines might not exist, which is fine
        }

        return balances;
    } catch (error) {
        throw new Error(`Failed to get balances: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
