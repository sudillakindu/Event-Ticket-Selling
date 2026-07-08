export function getClientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
}

export function getClientBrowser(userAgent: string | null): string {
  if (!userAgent) return "unknown";
  return userAgent.slice(0, 120);
}