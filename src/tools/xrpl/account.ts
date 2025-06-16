import { Agent } from '../../agent';

export async function getAccountInfo(agent: Agent, address: string) {
    try {
        const response = await agent.client.request({
            command: 'account_info',
            account: address,
            ledger_index: 'current'
        });

        return {
            account: response.result.account_data.Account,
            balance: response.result.account_data.Balance,
            flags: response.result.account_data.Flags,
            ledgerEntryType: response.result.account_data.LedgerEntryType,
            ownerCount: response.result.account_data.OwnerCount,
            previousTxnID: response.result.account_data.PreviousTxnID,
            previousTxnLgrSeq: response.result.account_data.PreviousTxnLgrSeq,
            sequence: response.result.account_data.Sequence
        };
    } catch (error) {
        throw new Error(`Failed to get account info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
