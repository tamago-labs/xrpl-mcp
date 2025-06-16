import { z } from "zod";
import { Agent } from "../../agent";
import { type McpTool } from "../../types";

export const GetTransactionTool: McpTool = {
    name: "xrpl_get_transaction",
    description: "Get transaction details by hash",
    schema: {
        hash: z.string()
            .regex(/^[A-F0-9]{64}$/i)
            .describe("Transaction hash (64 hex characters)")
    },
    handler: async (agent: Agent, input: Record<string, any>) => {
        try {
            const transaction = await agent.getTransaction(input.hash);
            return {
                status: "success",
                transaction
            };
        } catch (error) {
            return {
                status: "error",
                message: error instanceof Error ? error.message : "Unknown error occurred"
            };
        }
    },
};
