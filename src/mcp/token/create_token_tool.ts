import { z } from "zod";
import { Agent } from "../../agent";
import { type McpTool } from "../../types";

export const CreateTokenTool: McpTool = {
    name: "xrpl_create_token",
    description: "Create a new token by setting account flags",
    schema: {
        currency: z.string()
            .regex(/^[A-Z0-9]{3}$/)
            .describe("Token currency code (3 characters)"),
        domain: z.string()
            .max(256)
            .optional()
            .describe("Domain name for the token issuer"),
        emailHash: z.string()
            .length(32)
            .optional()
            .describe("Email hash for the issuer (32 hex characters)"),
        transferRate: z.number()
            .int()
            .min(1000000000)
            .max(2000000000)
            .optional()
            .describe("Transfer rate (fee) for the token (1000000000 = 0%, 1010000000 = 1%)"),
        requireAuth: z.boolean()
            .default(false)
            .describe("Require authorization for trust lines"),
        requireDest: z.boolean()
            .default(false)
            .describe("Require destination tag"),
        disallowXRP: z.boolean()
            .default(false)
            .describe("Disallow XRP payments"),
        globalFreeze: z.boolean()
            .default(false)
            .describe("Enable global freeze"),
        noFreeze: z.boolean()
            .default(false)
            .describe("Disable freeze functionality"),
        defaultRipple: z.boolean()
            .default(false)
            .describe("Enable default ripple")
    },
    handler: async (agent: Agent, input: Record<string, any>) => {
        try {
            const result = await agent.createToken(input);
            return result;
        } catch (error) {
            return {
                status: "error",
                message: error instanceof Error ? error.message : "Unknown error occurred"
            };
        }
    },
};
