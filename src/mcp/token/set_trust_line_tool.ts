import { z } from "zod";
import { Agent } from "../../agent";
import { type McpTool } from "../../types";

export const SetTrustLineTool: McpTool = {
    name: "xrpl_set_trust_line",
    description: "Set a trust line for a token",
    schema: {
        currency: z.string()
            .regex(/^[A-Z0-9]{3}$/)
            .describe("Currency code for the token (3 characters)"),
        issuer: z.string()
            .regex(/^r[a-zA-Z0-9]{24,34}$/)
            .describe("Token issuer address"),
        limit: z.string()
            .regex(/^\d+(\.\d+)?$/)
            .describe("Trust limit amount")
    },
    handler: async (agent: Agent, input: Record<string, any>) => {
        try {
            const result = await agent.setTrustLine(input.currency, input.issuer, input.limit);
            return result;
        } catch (error) {
            return {
                status: "error",
                message: error instanceof Error ? error.message : "Unknown error occurred"
            };
        }
    },
};
