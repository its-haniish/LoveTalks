import { z } from "zod";

export const getAllChatSessionsSchema = z.object({
    mentorId: z.string().length(24).optional(),
    userId: z.string().length(24).optional(),
}).refine(
    (data) => data.mentorId || data.userId,
    {
        message: "Either mentorId or userId is required.",
        path: ["mentorId", "userId"],
    }
);
