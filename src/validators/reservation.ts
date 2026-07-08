import { z } from "zod";

export const reservationSchema = z.object({
  eventId: z.string().min(1),
  variantId: z.string().min(1),
  quantity: z.number().int().positive().max(10),
  paymentMethod: z.enum(["cash", "bank-transfer", "offline"]),
  paymentProofUrl: z.string().url(),
  note: z.string().max(500).optional()
});