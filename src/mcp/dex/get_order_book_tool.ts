import { z } from "zod";
import { Agent } from "../../agent";
import { type McpTool } from "../../types";

export const GetOrderBookTool: McpTool = {
    name: "xrpl_get_order_book",
    description: "Get order book for a trading pair",
    schema: {
        takerGets: z.union([
            z.literal("XRP").describe("XRP currency"),
            z.object({
                currency: z.string().regex(/^[A-Z0-9]{3}$/),
                issuer: z.string().regex(/^r[a-zA-Z0-9]{24,34}$/)
            })
        ]).describe("Base currency (what taker gets)"),
        takerPays: z.union([
            z.literal("XRP").describe("XRP currency"),
            z.object({
                currency: z.string().regex(/^[A-Z0-9]{3}$/),
                issuer: z.string().regex(/^r[a-zA-Z0-9]{24,34}$/)
            })
        ]).describe("Quote currency (what taker pays)"),
        limit: z.number()
            .int()
            .min(1)
            .max(100)
            .default(20)
            .describe("Number of offers to retrieve (default: 20, max: 100)")
    },
    handler: async (agent: Agent, input: Record<string, any>) => {
        try {
            const { getOrderBook } = await import('../../tools/dex/orderbook');
            
            // Convert 'XRP' string to proper format
            const takerGets = input.takerGets === 'XRP' ? { currency: 'XRP' } : input.takerGets;
            const takerPays = input.takerPays === 'XRP' ? { currency: 'XRP' } : input.takerPays;
            
            const orderBook = await getOrderBook(agent, takerGets, takerPays, input.limit);
            return {
                status: "success",
                orderBook
            };
        } catch (error) {
            return {
                status: "error",
                message: error instanceof Error ? error.message : "Unknown error occurred"
            };
        }
    },
};
