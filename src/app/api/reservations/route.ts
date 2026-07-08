import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { reservationRepository } from "@/repositories/reservation.repository";
import { getSessionUser } from "@/lib/firebase/session";
import { reservationSchema } from "@/validators/reservation";

export async function POST(request: Request) {
  const actor = await getSessionUser();
  if (!actor) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const payload = reservationSchema.parse(await request.json());

  const reservation = {
    id: randomUUID(),
    customerId: actor.uid,
    eventId: payload.eventId,
    variantId: payload.variantId,
    quantity: payload.quantity,
    paymentProofUrl: payload.paymentProofUrl,
    note: payload.note,
    status: "pending" as const,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  await reservationRepository.save(reservation);
  return NextResponse.json({ reservation }, { status: 201 });
}