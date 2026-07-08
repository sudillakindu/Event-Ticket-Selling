import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { auditLogRepository } from "@/repositories/audit-log.repository";
import { qrTokenRepository } from "@/repositories/qr-token.repository";
import { ticketRepository } from "@/repositories/ticket.repository";
import { ticketUsageRepository } from "@/repositories/ticket-usage.repository";
import { getSessionUser } from "@/lib/firebase/session";
import { hasMinimumRole } from "@/services/security/rbac";
import { getClientBrowser, getClientIp } from "@/utils/http";
import { hashToken } from "@/utils/crypto";
import { qrValidationSchema } from "@/validators/qr";

export async function POST(request: Request) {
  const actor = await getSessionUser();
  if (!actor) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!hasMinimumRole(actor.role, "scanner-staff")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = qrValidationSchema.parse(await request.json());
  const tokenHash = hashToken(body.token);
  const qrToken = await qrTokenRepository.getByHash(tokenHash);

  if (!qrToken || qrToken.revokedAt || qrToken.expiresAt < Date.now()) {
    return NextResponse.json({ message: "Invalid token" }, { status: 404 });
  }

  const ticket = await ticketRepository.findByTokenHash(tokenHash);
  if (!ticket) {
    return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
  }

  const existingUsage = await ticketUsageRepository.getByTicketAndAccessItem(ticket.id, body.accessItemId);
  if (existingUsage) {
    return NextResponse.json({ message: "Access item already consumed" }, { status: 409 });
  }

  const usageRecord = {
    id: randomUUID(),
    ticketId: ticket.id,
    accessItemId: body.accessItemId,
    staffId: actor.uid,
    staffRole: actor.role,
    scannerDevice: request.headers.get("x-scanner-device") ?? "web",
    browser: getClientBrowser(request.headers.get("user-agent")),
    ipAddress: getClientIp(request.headers),
    consumedAt: Date.now(),
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  await ticketUsageRepository.save(usageRecord);
  await auditLogRepository.save({
    id: randomUUID(),
    actorId: actor.uid,
    actorRole: actor.role,
    action: "ticket.access.consume",
    entityType: "ticketUsage",
    entityId: usageRecord.id,
    metadata: usageRecord,
    createdAt: Date.now(),
    updatedAt: Date.now()
  });

  return NextResponse.json({ ok: true, ticketId: ticket.id, tokenHash, accessItemId: body.accessItemId });
}