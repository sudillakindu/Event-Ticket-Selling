import crypto from "crypto";

export function generateSecureToken(length = 32): string {
  return crypto.randomBytes(length).toString("base64url");
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function generateTicketNumber(): string {
  return `TKT-${crypto.randomUUID().slice(0, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
}