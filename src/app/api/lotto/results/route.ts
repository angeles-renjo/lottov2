import { NextRequest, NextResponse } from "next/server";
import { lottoScraper } from "@/lib/scraper";
import {
  ApiResponse,
  LottoResult,
  LottoGameType,
  LOTTO_GAMES,
} from "@/lib/types";

export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<LottoResult>>> {
  try {
    console.log("API route called"); // Debug log

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const gameTypeParam = searchParams.get("gameType");

    console.log("Received gameType:", gameTypeParam); // Debug log

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
    console.log("Validated gameType:", gameType); // Debug log

    // Set game type for scraper
    try {
      lottoScraper.setGameType(gameType);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "GAME_CONFIG_ERROR",
            message:
              error instanceof Error
                ? error.message
                : "Invalid game configuration",
            timestamp: new Date(),
          },
        },
        { status: 400 }
      );
    }

    // Fetch results
    console.log("Fetching results for game type:", gameType); // Debug log
    const response = await lottoScraper.fetchLatestResults();
    console.log("Scraper response:", response); // Debug log

    if (!response.success || !response.data) {
      console.error("Scraper error:", response.error); // Debug log
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
        gameInfo: LOTTO_GAMES[gameType], // Include game information in metadata
      },
    });
  } catch (error) {
    console.error("API Error:", error); // Debug log
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
