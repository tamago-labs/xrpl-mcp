import { z } from "zod";
import { Agent } from "../../agent";
import { type McpTool } from "../../types";

export const SendPaymentTool: McpTool = {
    name: "xrpl_send_payment",
    description: "Send XRP or tokens to another address",
    schema: {
        destination: z.string()
            .regex(/^r[a-zA-Z0-9]{24,34}$/)
            .describe("Destination XRPL address"),
        amount: z.union([
            z.string().describe("Amount of XRP to send"),
            z.object({
                currency: z.string(),
                value: z.string(),
                issuer: z.string().regex(/^r[a-zA-Z0-9]{24,34}$/)
            })
        ]).describe("Amount to send (XRP as string or token object)"),
        destinationTag: z.number()
            .int()
            .min(0)
            .max(4294967295)
            .optional()
            .describe("Optional destination tag")
    },
    handler: async (agent: Agent, input: Record<string, any>) => {
        try {
            const result = await agent.sendPayment({
                destination: input.destination,
                amount: input.amount,
                destinationTag: input.destinationTag
            });
            return result;
        } catch (error) {
            return {
                status: "error",
                message: error instanceof Error ? error.message : "Unknown error occurred"
            };
        }
    },
};
