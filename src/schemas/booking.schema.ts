import { z } from "zod";

export const travelerSchema = z.object({
  name: z.string().min(2, "Enter the traveler's full name"),
  age: z
    .string()
    .min(1, "Required")
    .refine((v) => Number(v) > 0 && Number(v) < 120, "Enter a valid age"),
  passport: z.string().optional(),
});

export const emergencyContactSchema = z.object({
  name: z.string().min(2, "Enter a contact name"),
  phone: z.string().regex(/^\+?\d[\d\s-]{6,14}\d$/, "Enter a valid phone number"),
});

export const travelerStepSchema = z.object({
  travelers: z.array(travelerSchema).min(1, "At least one traveler is required"),
  emergencyContact: emergencyContactSchema,
});

export type TravelerStepValues = z.infer<typeof travelerStepSchema>;
