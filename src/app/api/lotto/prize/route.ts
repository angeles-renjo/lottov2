// src/app/api/lotto/prize/route.ts
import { NextResponse } from "next/server";
import { lottoScraper } from "@/lib/scraper";
import { LottoGameType, LOTTO_GAMES } from "@/lib/types";

interface PrizePoolResult {
  gameType: LottoGameType;
  gameName: string;
  jackpotAmount: number;
  drawDate: Date;
}

export async function GET() {
  try {
    console.log("Prize Pool API route called");

    // Fetch all results at once
    const allResults = await lottoScraper.fetchAllResults();

    if (!allResults || allResults.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "FETCH_ERROR",
            message: "Failed to fetch any lotto results",
            timestamp: new Date(),
          },
        },
        { status: 500 }
      );
    }

    // Transform results into PrizePoolResult format
    const results: PrizePoolResult[] = allResults
      .filter(
        (response) => response.success && response.data && response.gameType
      )
      .map((response) => ({
        gameType: response.gameType as LottoGameType, // Type assertion since we filtered nulls
        gameName: LOTTO_GAMES[response.gameType as LottoGameType].name,
        jackpotAmount: response.data!.jackpotAmount,
        drawDate: response.data!.drawDate,
      }));

    if (results.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "TRANSFORM_ERROR",
            message: "Failed to transform lotto results",
            timestamp: new Date(),
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: results,
      metadata: {
        timestamp: new Date(),
        requestId: crypto.randomUUID(),
      },
    });
  } catch (error) {
    console.error("Prize Pool API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
          timestamp: new Date(),
        },
      },
      { status: 500 }
    );
  }
}
