import { Agent } from '../../agent';
import { TokenParams, TransactionResponse } from '../../types';

export async function createToken(agent: Agent, params: TokenParams): Promise<TransactionResponse> {
    try {
        const accountSet: any = {
            TransactionType: 'AccountSet',
            Account: agent.walletAddress,
            ...(params.domain && { Domain: Buffer.from(params.domain).toString('hex').toUpperCase() }),
            ...(params.emailHash && { EmailHash: params.emailHash }),
            ...(params.messageKey && { MessageKey: params.messageKey }),
            ...(params.transferRate && { TransferRate: params.transferRate }),
            ...(params.tickSize && { TickSize: params.tickSize })
        };

        // Set flags for token configuration
        let setFlag = 0;
        let clearFlag = 0;

        if (params.requireAuth) setFlag |= 0x00000002;
        if (params.requireDest) setFlag |= 0x00000001;
        if (params.disallowXRP) setFlag |= 0x00000008;
        if (params.globalFreeze) setFlag |= 0x00000080;
        if (params.noFreeze) setFlag |= 0x00000040;
        if (params.defaultRipple) setFlag |= 0x00020000;

        if (setFlag > 0) (accountSet as any).SetFlag = setFlag;
        if (clearFlag > 0) (accountSet as any).ClearFlag = clearFlag;

        const prepared = await agent.client.autofill(accountSet);
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
