import { z } from "zod";
import { Agent } from "../../agent";
import { type McpTool } from "../../types";

export const CancelOfferTool: McpTool = {
    name: "xrpl_cancel_offer",
    description: "Cancel an existing offer",
    schema: {
        offerSequence: z.number()
            .int()
            .positive()
            .describe("Sequence number of the offer to cancel")
    },
    handler: async (agent: Agent, input: Record<string, any>) => {
        try {
            const result = await agent.cancelOffer(input.offerSequence);
            return result;
        } catch (error) {
            return {
                status: "error",
                message: error instanceof Error ? error.message : "Unknown error occurred"
            };
        }
    },
};
