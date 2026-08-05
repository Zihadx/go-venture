import { z } from "zod";

export const packageSchema = z.object({
  title: z.string().min(5, "Title should be at least 5 characters").max(100),
  description: z.string().min(20, "Give travelers a real description (at least 20 characters)").max(500),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  category: z.string().min(2, "Pick or enter a category"),
  image: z.string().url("Must be a valid image URL"),
  duration: z.number().int().min(1, "At least 1 day").max(60, "60 days is the max"),
  pricePerHead: z.number().min(50, "Price seems too low").max(20000, "Price seems too high"),
  maxTravelers: z.number().int().min(1).max(20),
  status: z.enum(["active", "draft", "archived"]),
});

export type PackageFormValues = z.infer<typeof packageSchema>;
