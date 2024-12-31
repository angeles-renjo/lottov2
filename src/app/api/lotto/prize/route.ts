import { NextRequest, NextResponse } from "next/server";
import { lottoScraper } from "@/lib/scraper";
import { LottoGameType, LOTTO_GAMES, ApiResponse } from "@/lib/types";

interface PrizePoolResult {
  gameType: LottoGameType;
  gameName: string;
  jackpotAmount: number;
  drawDate: Date;
}

export async function GET() {
  try {
    console.log("Prize Pool API route called");

    const results: PrizePoolResult[] = [];
    const gameTypes = Object.values(LottoGameType);

    // Process each game type sequentially to avoid rate limiting
    for (const gameType of gameTypes) {
      try {
        console.log(`Fetching results for ${gameType}`);
        const response = await lottoScraper.fetchLatestResults(gameType);

        if (response.success && response.data) {
          results.push({
            gameType,
            gameName: LOTTO_GAMES[gameType].name,
            jackpotAmount: response.data.jackpotAmount,
            drawDate: response.data.drawDate,
          });
        } else {
          console.error(`Failed to fetch ${gameType}:`, response.error);
        }
      } catch (error) {
        console.error(`Error processing ${gameType}:`, error);
        // Continue with other game types even if one fails
        continue;
      }
    }

    if (results.length === 0) {
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
