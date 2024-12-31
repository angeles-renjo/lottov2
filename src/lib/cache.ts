// src/lib/cache.ts
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

interface CacheStats {
  size: number;
  maxEntries: number | undefined;
  ttl: number;
  entries: Array<{
    gameType: LottoGameType;
    expiresIn: number;
    isExpired: boolean;
  }>;
}

export class LottoCache {
  private cache: Map<LottoGameType, CacheEntry>;
  private readonly config: CacheConfig;
  private lastBulkUpdate: number | null = null;

  constructor(config: CacheConfig = { ttl: 5 * 60 * 1000 }) {
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

  // New method for bulk operations
  setBulk(entries: { gameType: LottoGameType; data: LottoResult }[]): void {
    const now = Date.now();
    this.lastBulkUpdate = now;

    entries.forEach(({ gameType, data }) => {
      const entry: CacheEntry = {
        data,
        timestamp: now,
        expiresAt: now + this.config.ttl,
      };
      this.cache.set(gameType, entry);
    });

    // Clean up old entries if we exceed maxEntries
    while (this.config.maxEntries && this.cache.size > this.config.maxEntries) {
      const oldestKey = this.findOldestEntry();
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }
  }

  // Get all valid cache entries
  getAll(): Map<LottoGameType, LottoResult> {
    const now = Date.now();
    const validEntries = new Map<LottoGameType, LottoResult>();

    this.cache.forEach((entry, gameType) => {
      if (now <= entry.expiresAt) {
        validEntries.set(gameType, entry.data);
      }
    });

    return validEntries;
  }

  // Check if all game types are cached and valid
  isAllCached(gameTypes: LottoGameType[]): boolean {
    const now = Date.now();
    return gameTypes.every((gameType) => {
      const entry = this.cache.get(gameType);
      return entry && now <= entry.expiresAt;
    });
  }

  // Get the time since last bulk update
  getTimeSinceLastBulkUpdate(): number | null {
    if (!this.lastBulkUpdate) return null;
    return Date.now() - this.lastBulkUpdate;
  }

  invalidate(gameType: LottoGameType): void {
    this.cache.delete(gameType);
  }

  invalidateAll(): void {
    this.cache.clear();
    this.lastBulkUpdate = null;
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

  getCacheStats(): CacheStats {
    const now = Date.now();
    return {
      size: this.cache.size,
      maxEntries: this.config.maxEntries || undefined,
      ttl: this.config.ttl,
      entries: Array.from(this.cache.entries()).map(([gameType, entry]) => ({
        gameType,
        expiresIn: Math.max(0, entry.expiresAt - now),
        isExpired: now > entry.expiresAt,
      })),
    };
  }
}
