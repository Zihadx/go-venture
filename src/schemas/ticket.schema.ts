import { z } from "zod";

export const ticketSchema = z.object({
  subject: z
    .string()
    .min(5, "Give it a bit more detail (at least 5 characters)")
    .max(120, "Keep the subject under 120 characters"),
  message: z
    .string()
    .min(10, "Tell us a bit more so we can help (at least 10 characters)")
    .max(2000, "Keep it under 2000 characters"),
});

export type TicketFormValues = z.infer<typeof ticketSchema>;
