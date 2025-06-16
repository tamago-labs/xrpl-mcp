import { z } from "zod";
import { Agent } from "../../agent";
import { type McpTool } from "../../types";

export const GetRecentTransactionsTool: McpTool = {
    name: "xrpl_get_recent_transactions",
    description: "Get recent transactions for an account",
    schema: {
        address: z.string()
            .regex(/^r[a-zA-Z0-9]{24,34}$/)
            .optional()
            .describe("Account address (optional, defaults to wallet address)"),
        limit: z.number()
            .int()
            .min(1)
            .max(100)
            .default(10)
            .describe("Number of transactions to retrieve (default: 10, max: 100)")
    },
    handler: async (agent: Agent, input: Record<string, any>) => {
        try {
            const transactions = await agent.getRecentTransactions(input.address, input.limit);
            return {
                status: "success",
                transactions
            };
        } catch (error) {
            return {
                status: "error",
                message: error instanceof Error ? error.message : "Unknown error occurred"
            };
        }
    },
};
