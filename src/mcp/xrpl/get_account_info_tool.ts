import { z } from "zod";
import { Agent } from "../../agent";
import { type McpTool } from "../../types";

export const GetAccountInfoTool: McpTool = {
    name: "xrpl_get_account_info",
    description: "Get account information for a given address",
    schema: {
        address: z.string()
            .regex(/^r[a-zA-Z0-9]{24,34}$/)
            .optional()
            .describe("XRPL address to get info for (optional, defaults to wallet address)")
    },
    handler: async (agent: Agent, input: Record<string, any>) => {
        try {
            const accountInfo = await agent.getAccountInfo(input.address);
            return {
                status: "success",
                accountInfo
            };
        } catch (error) {
            return {
                status: "error",
                message: error instanceof Error ? error.message : "Unknown error occurred"
            };
        }
    },
};
