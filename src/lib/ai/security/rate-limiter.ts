export interface RateLimiterStore {
  consume(key: string, limit: number, windowMs: number): Promise<{ success: boolean; remaining: number; resetMs: number }>;
}

class InMemoryRateLimiterStore implements RateLimiterStore {
  private requests: Map<string, number[]> = new Map();

  async consume(key: string, limit: number, windowMs: number) {
    const now = Date.now();
    const windowStart = now - windowMs;

    const timestamps = this.requests.get(key) || [];
    const recent = timestamps.filter((t) => t > windowStart);

    if (recent.length >= limit) {
      const oldestInWindow = recent[0];
      const resetMs = oldestInWindow ? oldestInWindow + windowMs - now : windowMs;
      return { success: false, remaining: 0, resetMs };
    }

    recent.push(now);
    this.requests.set(key, recent);

    // Periodic cleanup of stale keys
    if (this.requests.size > 1000) {
      for (const [k, v] of this.requests.entries()) {
        const valid = v.filter((t) => t > windowStart);
        if (valid.length === 0) {
          this.requests.delete(k);
        } else {
          this.requests.set(k, valid);
        }
      }
    }

    return {
      success: true,
      remaining: limit - recent.length,
      resetMs: windowMs,
    };
  }
}

let globalStore: RateLimiterStore = new InMemoryRateLimiterStore();

export function setRateLimiterStore(store: RateLimiterStore) {
  globalStore = store;
}

export async function checkRateLimit(
  identifier: string,
  limit: number = 30,
  windowMs: number = 60000
) {
  return globalStore.consume(identifier, limit, windowMs);
}
