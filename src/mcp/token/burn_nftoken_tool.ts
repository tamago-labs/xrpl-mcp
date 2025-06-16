import { z } from "zod";
import { Agent } from "../../agent";
import { type McpTool } from "../../types";

export const BurnNFTokenTool: McpTool = {
    name: "xrpl_burn_nftoken",
    description: "Burn an NFToken",
    schema: {
        nftokenID: z.string()
            .regex(/^[A-F0-9]{64}$/i)
            .describe("NFToken ID to burn (64 hex characters)")
    },
    handler: async (agent: Agent, input: Record<string, any>) => {
        try {
            const result = await agent.burnNFToken(input.nftokenID);
            return result;
        } catch (error) {
            return {
                status: "error",
                message: error instanceof Error ? error.message : "Unknown error occurred"
            };
        }
    },
};
