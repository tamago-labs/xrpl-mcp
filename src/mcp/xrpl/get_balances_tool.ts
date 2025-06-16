import { z } from "zod";
import { Agent } from "../../agent";
import { type McpTool } from "../../types";

export const GetBalancesTool: McpTool = {
    name: "xrpl_get_balances",
    description: "Get all token balances for a given address",
    schema: {
        address: z.string()
            .regex(/^r[a-zA-Z0-9]{24,34}$/)
            .optional()
            .describe("XRPL address to get balances for (optional, defaults to wallet address)")
    },
    handler: async (agent: Agent, input: Record<string, any>) => {
        try {
            const balances = await agent.getBalances(input.address);
            return {
                status: "success",
                balances
            };
        } catch (error) {
            return {
                status: "error",
                message: error instanceof Error ? error.message : "Unknown error occurred"
            };
        }
    },
};
