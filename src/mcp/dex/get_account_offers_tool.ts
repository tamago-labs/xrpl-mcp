import { z } from "zod";
import { Agent } from "../../agent";
import { type McpTool } from "../../types";

export const GetAccountOffersTool: McpTool = {
    name: "xrpl_get_account_offers",
    description: "Get all active offers for an account",
    schema: {
        address: z.string()
            .regex(/^r[a-zA-Z0-9]{24,34}$/)
            .optional()
            .describe("Account address (optional, defaults to wallet address)")
    },
    handler: async (agent: Agent, input: Record<string, any>) => {
        try {
            const { getAccountOffers } = await import('../../tools/dex/orderbook');
            const offers = await getAccountOffers(agent, input.address || agent.walletAddress);
            return {
                status: "success",
                offers
            };
        } catch (error) {
            return {
                status: "error",
                message: error instanceof Error ? error.message : "Unknown error occurred"
            };
        }
    },
};
