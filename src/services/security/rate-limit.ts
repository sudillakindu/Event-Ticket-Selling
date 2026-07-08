const memory = new Map<string, { count: number; resetAt: number }>();

export function createRateLimiter(windowMs: number, maxRequests: number) {
  return (key: string) => {
    const now = Date.now();
    const entry = memory.get(key);

    if (!entry || entry.resetAt <= now) {
      memory.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, remaining: maxRequests - 1 };
    }

    if (entry.count >= maxRequests) {
      return { allowed: false, remaining: 0 };
    }

    entry.count += 1;
    memory.set(key, entry);
    return { allowed: true, remaining: maxRequests - entry.count };
  };
}