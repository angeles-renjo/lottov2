// lib/scraper.ts
import axios from "axios";
import * as cheerio from "cheerio";
import {
  LottoResult,
  ScraperResponse,
  ErrorDetails,
  LottoGameType,
  LOTTO_GAMES,
  LOTTO_CONSTANTS,
} from "./types";
import { LottoCache } from "./cache";

interface ParsedGameResult {
  gameName: string;
  combinations: string;
  drawDate: string;
  jackpot: string;
  winners: string;
}

export class LottoScraper {
  private readonly baseUrl: string =
    "https://www.pcso.gov.ph/SearchLottoResult.aspx";
  private cache: LottoCache;

  constructor() {
    this.cache = new LottoCache({ ttl: 5 * 60 * 1000 }); // 5 minutes TTL
  }

  private handleError(code: string, message: string): ErrorDetails {
    return {
      code,
      message,
      timestamp: new Date(),
    };
  }

  private formatAmount(amountStr: string): number {
    return Number(amountStr.replace(/[₱,]/g, "")) || 0;
  }

  private parseNumbers(combinationsStr: string): number[] {
    return combinationsStr
      .split("-")
      .map((num) => parseInt(num.trim(), 10))
      .filter((num) => !isNaN(num));
  }

  private async fetchPage(): Promise<string> {
    try {
      const response = await axios.get(this.baseUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          "Sec-Fetch-Dest": "document",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-Site": "none",
          "Sec-Fetch-User": "?1",
          "Upgrade-Insecure-Requests": "1",
        },
        timeout: 15000,
      });

      if (!response.data) {
        throw new Error("Empty response received");
      }

      return response.data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw this.handleError(
        "FETCH_ERROR",
        `Failed to fetch lotto page: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  private parseGameResults($: cheerio.CheerioAPI): ParsedGameResult[] {
    const results: ParsedGameResult[] = [];
    const table = $("#cphContainer_cpContent_GridView1");

    table.find("tr").each((_, row) => {
      const cells = $(row).find("td");
      if (cells.length >= 5) {
        results.push({
          gameName: $(cells[0]).text().trim(),
          combinations: $(cells[1]).text().trim(),
          drawDate: $(cells[2]).text().trim(),
          jackpot: $(cells[3]).text().trim(),
          winners: $(cells[4]).text().trim(),
        });
      }
    });

    return results;
  }

  private findGameTypeByName(gameName: string): LottoGameType | null {
    for (const [type, config] of Object.entries(LOTTO_GAMES)) {
      if (config.name === gameName) {
        return type as LottoGameType;
      }
    }
    return null;
  }

  async fetchAllResults(): Promise<ScraperResponse[]> {
    try {
      // Check if we have valid cached results for any game
      const cachedResults: Map<LottoGameType, LottoResult> = new Map();
      let needsFetch = false;

      // Check cache for all game types
      Object.values(LottoGameType).forEach((gameType) => {
        const cached = this.cache.get(gameType);
        if (cached) {
          cachedResults.set(gameType, cached);
        } else {
          needsFetch = true;
        }
      });

      // If we have all results cached and they're valid, return them
      if (
        !needsFetch &&
        cachedResults.size === Object.keys(LottoGameType).length
      ) {
        return Array.from(cachedResults.entries()).map(([gameType, data]) => ({
          success: true,
          data,
          gameType,
        }));
      }

      // Fetch and parse all results
      const html = await this.fetchPage();
      const $ = cheerio.load(html);
      const parsedResults = this.parseGameResults($);

      const responses: ScraperResponse[] = [];

      for (const result of parsedResults) {
        const gameType = this.findGameTypeByName(result.gameName);
        if (!gameType) continue; // Skip non-matching games

        const numbers = this.parseNumbers(result.combinations);
        if (numbers.length !== LOTTO_CONSTANTS.NUMBERS_PER_DRAW) continue;

        const lottoResult: LottoResult = {
          drawDate: new Date(result.drawDate),
          drawNumber: "N/A", // Not available in the table
          winningNumbers: numbers,
          jackpotAmount: this.formatAmount(result.jackpot),
          winners: parseInt(result.winners, 10) || 0,
        };

        // Cache the result
        this.cache.set(gameType, lottoResult);

        responses.push({
          success: true,
          data: lottoResult,
          gameType,
        });
      }

      return responses;
    } catch (error) {
      console.error("Scraper error:", error);
      throw this.handleError(
        "SCRAPER_ERROR",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }

  async fetchLatestResults(gameType: LottoGameType): Promise<ScraperResponse> {
    try {
      // Check cache first
      const cachedResult = this.cache.get(gameType);
      if (cachedResult) {
        console.log(`Cache hit for game type: ${gameType}`);
        return { success: true, data: cachedResult };
      }

      // Fetch all results
      const allResults = await this.fetchAllResults();
      const gameResult = allResults.find((r) => r.gameType === gameType);

      if (!gameResult || !gameResult.success) {
        throw this.handleError(
          "GAME_NOT_FOUND",
          `No results found for game type: ${gameType}`
        );
      }

      return gameResult;
    } catch (error) {
      console.error("Error fetching latest results:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? this.handleError("FETCH_ERROR", error.message)
            : this.handleError("UNKNOWN_ERROR", "An unknown error occurred"),
      };
    }
  }

  // Debug method to get cache statistics
  getCacheStats() {
    return this.cache.getCacheStats();
  }
}

// Export a singleton instance
export const lottoScraper = new LottoScraper();
