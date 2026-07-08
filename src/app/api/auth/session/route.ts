import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";
import { env } from "@/lib/env";
import { userRepository } from "@/repositories/user.repository";
import type { UserRecord } from "@/shared/types/domain";

export async function POST(request: Request) {
  const { idToken } = (await request.json()) as { idToken?: string };
  if (!idToken) {
    return NextResponse.json({ message: "Missing token" }, { status: 400 });
  }

  const decoded = await adminAuth.verifyIdToken(idToken);
  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn: 1000 * 60 * 60 * 24 * 5 });

  const existing = await userRepository.findByUid(decoded.uid);
  const user: UserRecord = {
    id: decoded.uid,
    uid: decoded.uid,
    email: decoded.email ?? "",
    displayName: decoded.name ?? decoded.email ?? "User",
    role: (decoded.role as UserRecord["role"]) || existing?.role || "customer",
    phoneNumber: existing?.phoneNumber,
    status: existing?.status ?? "active",
    createdAt: existing?.createdAt ?? Date.now(),
    updatedAt: Date.now()
  };
  await userRepository.upsertUser(user);

  const response = NextResponse.json({ ok: true, user: { uid: user.uid, email: user.email, role: user.role } });
  response.cookies.set(env.FIREBASE_SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 5
  });
  return response;
}