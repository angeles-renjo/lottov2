// src/app/lib/cache.ts
import { LottoGameType, LottoResult } from "./types";

interface CacheEntry {
  data: LottoResult;
  timestamp: number;
  expiresAt: number;
}

interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  maxEntries?: number;
}

export class LottoCache {
  private cache: Map<LottoGameType, CacheEntry>;
  private readonly config: CacheConfig;

  constructor(config: CacheConfig = { ttl: 5 * 60 * 1000 }) {
    // Default 5 minutes TTL
    this.cache = new Map();
    this.config = {
      ttl: config.ttl,
      maxEntries: config.maxEntries || 100,
    };
  }

  get(gameType: LottoGameType): LottoResult | null {
    const entry = this.cache.get(gameType);

    if (!entry) {
      return null;
    }

    // Check if entry has expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(gameType);
      return null;
    }

    return entry.data;
  }

  set(gameType: LottoGameType, data: LottoResult): void {
    const now = Date.now();

    // Create new cache entry
    const entry: CacheEntry = {
      data,
      timestamp: now,
      expiresAt: now + this.config.ttl,
    };

    // Remove oldest entry if cache is full
    if (this.config.maxEntries && this.cache.size >= this.config.maxEntries) {
      const oldestKey = this.findOldestEntry();
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    // Set new entry
    this.cache.set(gameType, entry);
  }

  invalidate(gameType: LottoGameType): void {
    this.cache.delete(gameType);
  }

  invalidateAll(): void {
    this.cache.clear();
  }

  isExpired(gameType: LottoGameType): boolean {
    const entry = this.cache.get(gameType);
    if (!entry) {
      return true;
    }
    return Date.now() > entry.expiresAt;
  }

  getTimeToExpiry(gameType: LottoGameType): number | null {
    const entry = this.cache.get(gameType);
    if (!entry) {
      return null;
    }
    return Math.max(0, entry.expiresAt - Date.now());
  }

  private findOldestEntry(): LottoGameType | undefined {
    let oldestKey: LottoGameType | undefined;
    let oldestTimestamp = Infinity;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTimestamp) {
        oldestTimestamp = entry.timestamp;
        oldestKey = key;
      }
    }

    return oldestKey;
  }

  // Debug methods
  getCacheStats() {
    return {
      size: this.cache.size,
      maxEntries: this.config.maxEntries,
      ttl: this.config.ttl,
      entries: Array.from(this.cache.entries()).map(([gameType, entry]) => ({
        gameType,
        expiresIn: Math.max(0, entry.expiresAt - Date.now()),
        isExpired: Date.now() > entry.expiresAt,
      })),
    };
  }
}
