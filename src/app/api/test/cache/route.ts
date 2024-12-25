// src/app/api/test/cache/route.ts
import { NextRequest, NextResponse } from "next/server";
import { lottoScraper } from "@/lib/scraper";
import { LottoGameType } from "@/lib/types";

export async function GET(request: NextRequest) {
  const results = [];
  const gameType = LottoGameType.ULTRA_LOTTO_658;

  try {
    // Test 1: Initial fetch (should be cache miss)
    console.time("First Request");
    const firstFetch = await lottoScraper.fetchLatestResults();
    console.timeEnd("First Request");
    results.push({
      test: "Initial Fetch",
      timing: "See console",
      cacheStats: lottoScraper.getCacheStats(),
      data: firstFetch,
    });

    // Test 2: Immediate second fetch (should be cache hit)
    console.time("Second Request");
    const secondFetch = await lottoScraper.fetchLatestResults();
    console.timeEnd("Second Request");
    results.push({
      test: "Immediate Second Fetch",
      timing: "See console",
      cacheStats: lottoScraper.getCacheStats(),
      data: secondFetch,
    });

    // Test 3: Change game type and fetch (should be cache miss)
    lottoScraper.setGameType(LottoGameType.GRAND_LOTTO_655);
    console.time("Different Game Request");
    const differentGame = await lottoScraper.fetchLatestResults();
    console.timeEnd("Different Game Request");
    results.push({
      test: "Different Game Type",
      timing: "See console",
      cacheStats: lottoScraper.getCacheStats(),
      data: differentGame,
    });

    // Test 4: Manual cache invalidation test
    lottoScraper.invalidateCache(LottoGameType.ULTRA_LOTTO_658);
    console.time("Post-Invalidation Request");
    const postInvalidation = await lottoScraper.fetchLatestResults();
    console.timeEnd("Post-Invalidation Request");
    results.push({
      test: "Post Cache Invalidation",
      timing: "See console",
      cacheStats: lottoScraper.getCacheStats(),
      data: postInvalidation,
    });

    return NextResponse.json({
      success: true,
      testResults: results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
