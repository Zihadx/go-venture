import { z } from "zod";

export const couponSchema = z.object({
  code: z
    .string()
    .min(3, "Code must be at least 3 characters")
    .max(20, "Code must be 20 characters or fewer")
    .regex(/^[A-Za-z0-9]+$/, "Letters and numbers only, no spaces or symbols"),
  discountPercent: z
    .number()
    .min(1, "Must be at least 1%")
    .max(90, "90% is the maximum discount allowed"),
  maxUsage: z
    .number()
    .int("Must be a whole number")
    .min(1, "Must allow at least 1 redemption"),
});

export type CouponFormValues = z.infer<typeof couponSchema>;
