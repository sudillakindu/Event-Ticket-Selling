import { z } from "zod";

export const approveReservationSchema = z.object({
  reservationId: z.string().min(1),
  notes: z.string().max(500).optional()
});