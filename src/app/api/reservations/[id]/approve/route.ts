import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { reservationRepository } from "@/repositories/reservation.repository";
import { userRepository } from "@/repositories/user.repository";
import { eventRepository } from "@/repositories/event.repository";
import { ticketVariantRepository } from "@/repositories/ticket-variant.repository";
import { ticketRepository } from "@/repositories/ticket.repository";
import { qrTokenRepository } from "@/repositories/qr-token.repository";
import { getSessionUser } from "@/lib/firebase/session";
import { hasMinimumRole } from "@/services/security/rbac";
import { createQrCodeDataUrl, createQrToken, buildQrUrl } from "@/services/qr/qr.service";
import { sendTicketEmail } from "@/services/email/email.service";
import { ticketEmailText } from "@/services/email/templates";
import { generateTicketNumber } from "@/utils/crypto";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await getSessionUser();
  if (!actor) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!hasMinimumRole(actor.role, "organizer")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const reservation = await reservationRepository.getById(id);
  if (!reservation) {
    return NextResponse.json({ message: "Reservation not found" }, { status: 404 });
  }

  const [customer, event, variant] = await Promise.all([
    userRepository.findByUid(reservation.customerId),
    eventRepository.getById(reservation.eventId),
    ticketVariantRepository.getById(reservation.variantId)
  ]);

  if (!customer || !event || !variant) {
    return NextResponse.json({ message: "Reservation data incomplete" }, { status: 422 });
  }

  const qr = createQrToken();
  const ticketNumber = generateTicketNumber();
  const ticketId = randomUUID();
  const qrLink = buildQrUrl(qr.token);
  const qrImageUrl = await createQrCodeDataUrl(qr.token);

  await qrTokenRepository.save({
    id: qr.tokenHash,
    ticketId,
    tokenHash: qr.tokenHash,
    expiresAt: event.endsAt + 1000 * 60 * 60 * 24,
    createdAt: Date.now(),
    updatedAt: Date.now()
  });

  await ticketRepository.save({
    id: ticketId,
    reservationId: reservation.id,
    customerId: customer.uid,
    eventId: event.id,
    variantId: variant.id,
    ticketNumber,
    qrTokenHash: qr.tokenHash,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now()
  });

  await reservationRepository.save({
    ...reservation,
    status: "approved",
    updatedAt: Date.now()
  });

  await sendTicketEmail({
    to: customer.email,
    customerName: customer.displayName,
    eventName: event.title,
    ticketVariant: variant.name,
    ticketNumber,
    qrImageUrl,
    qrLink
  });

  return NextResponse.json({
    ok: true,
    ticket: {
      id: ticketId,
      ticketNumber,
      qrTokenHash: qr.tokenHash,
      qrLink,
      qrImageUrl
    }
  });
}