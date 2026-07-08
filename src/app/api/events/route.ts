import { NextResponse } from "next/server";
import { eventRepository } from "@/repositories/event.repository";
import { getSessionUser } from "@/lib/firebase/session";
import { hasMinimumRole } from "@/services/security/rbac";
import { eventSchema } from "@/validators/event";

export async function GET() {
  const events = await eventRepository.list();
  return NextResponse.json({ events });
}

export async function POST(request: Request) {
  const actor = await getSessionUser();
  if (!actor) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!hasMinimumRole(actor.role, "organizer")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const payload = eventSchema.parse(await request.json());
  const event = await eventRepository.save({
    organizerId: actor.uid,
    ...payload
  });
  return NextResponse.json({ event }, { status: 201 });
}