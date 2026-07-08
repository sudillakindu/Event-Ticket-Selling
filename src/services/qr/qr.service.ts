import QRCode from "qrcode";
import { env } from "@/lib/env";
import { generateSecureToken, hashToken } from "@/utils/crypto";

export function buildQrUrl(token: string): string {
  return `${env.NEXT_PUBLIC_APP_URL}/scan/${token}`;
}

export async function createQrCodeDataUrl(token: string): Promise<string> {
  return QRCode.toDataURL(buildQrUrl(token), {
    errorCorrectionLevel: "M",
    margin: 2,
    scale: 8,
    color: {
      dark: "#064e3b",
      light: "#ffffff"
    }
  });
}

export function createQrToken(): { token: string; tokenHash: string } {
  const token = generateSecureToken(32);
  return { token, tokenHash: hashToken(token) };
}