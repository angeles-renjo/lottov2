// src/app/api/lotto/results/route.ts
import { NextRequest, NextResponse } from "next/server";
import { lottoScraper } from "@/lib/scraper";
import {
  ApiResponse,
  LottoResult,
  LottoGameType,
  LOTTO_GAMES,
  ScraperResponse,
} from "@/lib/types";

export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<LottoResult>>> {
  try {
    console.log("Results API route called");

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const gameTypeParam = searchParams.get("gameType");

    console.log("Requested gameType:", gameTypeParam);

    // Validate gameType parameter
    if (!gameTypeParam) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_PARAM",
            message: "gameType parameter is required",
            timestamp: new Date(),
          },
        },
        { status: 400 }
      );
    }

    // Check if the gameType is valid
    if (
      !Object.values(LottoGameType).includes(gameTypeParam as LottoGameType)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_GAME_TYPE",
            message: `Invalid game type: ${gameTypeParam}. Valid types are: ${Object.values(
              LottoGameType
            ).join(", ")}`,
            timestamp: new Date(),
          },
        },
        { status: 400 }
      );
    }

    const gameType = gameTypeParam as LottoGameType;
    console.log("Processing request for game type:", gameType);

    // Try to fetch results
    const response: ScraperResponse = await lottoScraper.fetchLatestResults(
      gameType
    );

    if (!response.success || !response.data) {
      console.error("Scraper error:", response.error);
      return NextResponse.json(
        {
          success: false,
          error: response.error || {
            code: "FETCH_ERROR",
            message: "Failed to fetch lotto results",
            timestamp: new Date(),
          },
        },
        { status: 500 }
      );
    }

    // Return successful response with metadata
    return NextResponse.json({
      success: true,
      data: response.data,
      metadata: {
        timestamp: new Date(),
        requestId: crypto.randomUUID(),
        gameInfo: LOTTO_GAMES[gameType],
        cached: true, // Add this to indicate if the result came from cache
      },
    });
  } catch (error) {
    console.error("Results API Error:", {
      error:
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
            }
          : error,
    });

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
