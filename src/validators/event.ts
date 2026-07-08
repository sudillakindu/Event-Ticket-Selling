import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3).max(150),
  description: z.string().min(20),
  location: z.string().min(2),
  bannerUrl: z.string().url().optional(),
  startsAt: z.number().int().positive(),
  endsAt: z.number().int().positive(),
  capacity: z.number().int().positive(),
  status: z.enum(["draft", "published", "archived"]).default("draft")
});