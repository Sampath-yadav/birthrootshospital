// Simple in-memory limiter: N hits per key per window. Resets on redeploy.
// TODO(user): swap for a shared store (Redis/Upstash) before running more than one instance.
const buckets = new Map<string, number[]>();

export function allow(key: string, max = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  return true;
}

export function clientIp(headers: Headers) {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
