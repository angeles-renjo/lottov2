// src/app/api/test/cache/route.ts
import { NextRequest, NextResponse } from "next/server";
import { lottoScraper } from "@/lib/scraper";
import { LottoGameType, ScraperResponse } from "@/lib/types";

interface TestResult {
  test: string;
  timing: string;
  cacheStats: {
    size: number;
    maxEntries: number | undefined;
    ttl: number;
    entries: {
      gameType: LottoGameType;
      expiresIn: number;
      isExpired: boolean;
    }[];
  };
  data: ScraperResponse;
}

export async function GET(_request: NextRequest) {
  const results: TestResult[] = [];
  const gameTypes = [
    LottoGameType.ULTRA_LOTTO_658,
    LottoGameType.GRAND_LOTTO_655,
  ];

  try {
    // Test 1: Initial fetch (should be cache miss)
    console.time("Test 1: Initial Fetch");
    const firstFetch = await lottoScraper.fetchLatestResults(gameTypes[0]);
    console.timeEnd("Test 1: Initial Fetch");
    results.push({
      test: "Initial Fetch",
      timing: "See console",
      cacheStats: lottoScraper.getCacheStats(),
      data: firstFetch,
    });

    // Test 2: Immediate second fetch (should be cache hit)
    console.time("Test 2: Cache Hit");
    const secondFetch = await lottoScraper.fetchLatestResults(gameTypes[0]);
    console.timeEnd("Test 2: Cache Hit");
    results.push({
      test: "Cache Hit Verification",
      timing: "See console",
      cacheStats: lottoScraper.getCacheStats(),
      data: secondFetch,
    });

    // Test 3: Different game type fetch (should be cache miss)
    console.time("Test 3: Different Game");
    const differentGame = await lottoScraper.fetchLatestResults(gameTypes[1]);
    console.timeEnd("Test 3: Different Game");
    results.push({
      test: "Different Game Type",
      timing: "See console",
      cacheStats: lottoScraper.getCacheStats(),
      data: differentGame,
    });

    // Return successful response with test results
    return NextResponse.json({
      success: true,
      testResults: results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cache test route error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
        testResults: results, // Include partial results if any
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
