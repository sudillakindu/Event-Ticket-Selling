import { z } from "zod";

export const qrValidationSchema = z.object({
  token: z.string().min(20),
  accessItemId: z.string().min(1)
});