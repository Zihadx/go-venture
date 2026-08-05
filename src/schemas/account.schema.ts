import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(2, "Name is too short").max(80, "Name is too long"),
  phone: z
    .string()
    .regex(/^(\+?\d[\d\s-]{6,14}\d)?$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  location: z.string().max(80, "Keep this under 80 characters").optional().or(z.literal("")),
});

export type AccountFormValues = z.infer<typeof accountSchema>;
