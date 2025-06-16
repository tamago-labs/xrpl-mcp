import { z } from "zod";
import { Agent } from "../../agent";
import { type McpTool } from "../../types";

export const CreateOfferTool: McpTool = {
    name: "xrpl_create_offer",
    description: "Create a trading offer on the DEX",
    schema: {
        takerGets: z.union([
            z.string().describe("Amount of XRP in drops"),
            z.object({
                currency: z.string().regex(/^[A-Z0-9]{3}$/),
                value: z.string().regex(/^\d+(\.\d+)?$/),
                issuer: z.string().regex(/^r[a-zA-Z0-9]{24,34}$/)
            })
        ]).describe("What the taker gets"),
        takerPays: z.union([
            z.string().describe("Amount of XRP in drops"),
            z.object({
                currency: z.string().regex(/^[A-Z0-9]{3}$/),
                value: z.string().regex(/^\d+(\.\d+)?$/),
                issuer: z.string().regex(/^r[a-zA-Z0-9]{24,34}$/)
            })
        ]).describe("What the taker pays"),
        expiration: z.number()
            .int()
            .min(0)
            .optional()
            .describe("Offer expiration time (XRPL timestamp)")
    },
    handler: async (agent: Agent, input: Record<string, any>) => {
        try {
            const result = await agent.createOffer(input);
            return result;
        } catch (error) {
            return {
                status: "error",
                message: error instanceof Error ? error.message : "Unknown error occurred"
            };
        }
    },
};
