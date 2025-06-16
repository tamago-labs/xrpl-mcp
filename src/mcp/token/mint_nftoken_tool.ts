import { z } from "zod";
import { Agent } from "../../agent";
import { type McpTool } from "../../types";

export const MintNFTokenTool: McpTool = {
    name: "xrpl_mint_nftoken",
    description: "Mint a new NFToken",
    schema: {
        uri: z.string()
            .url()
            .max(512)
            .optional()
            .describe("URI for the NFToken metadata"),
        flags: z.number()
            .int()
            .min(0)
            .max(15)
            .optional()
            .describe("NFToken flags (0-15)"),
        transferFee: z.number()
            .int()
            .min(0)
            .max(50000)
            .optional()
            .describe("Transfer fee (0-50000, representing 0-50%)"),
        taxon: z.number()
            .int()
            .min(0)
            .max(4294967295)
            .optional()
            .describe("NFToken taxon")
    },
    handler: async (agent: Agent, input: Record<string, any>) => {
        try {
            const result = await agent.mintNFToken(input);
            return result;
        } catch (error) {
            return {
                status: "error",
                message: error instanceof Error ? error.message : "Unknown error occurred"
            };
        }
    },
};
