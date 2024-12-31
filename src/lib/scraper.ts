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

export class LottoScraper {
  private readonly baseUrl: string =
    "https://www.pcso.gov.ph/SearchLottoResult.aspx";
  private cache: LottoCache;

  constructor() {
    this.cache = new LottoCache({ ttl: 5 * 60 * 1000 });
  }

  async fetchLatestResults(gameType: LottoGameType): Promise<ScraperResponse> {
    try {
      // Check if valid game type
      if (!LOTTO_GAMES[gameType]) {
        throw this.handleError(
          "INVALID_GAME",
          `Invalid game type: ${gameType}`
        );
      }

      // Check cache first
      const cachedResult = this.cache.get(gameType);
      if (cachedResult) {
        console.log(`Cache hit for game type: ${gameType}`);
        return { success: true, data: cachedResult };
      }

      console.log(
        `Cache miss for game type: ${gameType}, fetching from source...`
      );

      const html = await this.fetchPage();
      const $ = cheerio.load(html);

      // Get the results table
      const table = $("#cphContainer_cpContent_GridView1");
      if (!table.length) {
        throw this.handleError("NO_RESULTS", "Results table not found");
      }

      // Find the row for the specific game type
      const gameConfig = LOTTO_GAMES[gameType];
      const gameRow = table
        .find("tr")
        .filter((_, el) => {
          const gameName = $(el).find("td").first().text().trim();
          return gameName === gameConfig.name;
        })
        .first();

      if (!gameRow.length) {
        throw this.handleError(
          "GAME_NOT_FOUND",
          `Game ${gameConfig.name} not found in results`
        );
      }

      // Extract data from the row
      const cells = gameRow.find("td");
      const combinationsStr = $(cells[1]).text().trim();
      const dateStr = $(cells[2]).text().trim();
      const jackpotStr = $(cells[3]).text().trim();
      const winnersStr = $(cells[4]).text().trim();

      // Parse winning numbers
      const numbers = combinationsStr
        .split("-")
        .map((num) => parseInt(num.trim(), 10))
        .filter((num) => !isNaN(num));

      // Validate number count
      if (numbers.length !== LOTTO_CONSTANTS.NUMBERS_PER_DRAW) {
        throw this.handleError(
          "INVALID_NUMBERS",
          `Expected ${LOTTO_CONSTANTS.NUMBERS_PER_DRAW} numbers, got ${numbers.length}`
        );
      }

      // Validate number range
      const isValidRange = numbers.every(
        (num) =>
          num >= LOTTO_CONSTANTS.MIN_NUMBER &&
          num <= LOTTO_GAMES[gameType].maxNumber
      );

      if (!isValidRange) {
        throw this.handleError(
          "INVALID_NUMBER_RANGE",
          `Numbers must be between ${LOTTO_CONSTANTS.MIN_NUMBER} and ${LOTTO_GAMES[gameType].maxNumber}`
        );
      }

      const lottoResult: LottoResult = {
        drawDate: new Date(dateStr),
        drawNumber: "N/A", // Not available in the table
        winningNumbers: numbers,
        jackpotAmount: this.formatAmount(jackpotStr),
        winners: parseInt(winnersStr, 10) || 0,
      };

      // Store in cache before returning
      this.cache.set(gameType, lottoResult);

      return {
        success: true,
        data: lottoResult,
      };
    } catch (error) {
      console.error("Scraper error:", error);
      const errorDetails =
        error instanceof Error
          ? this.handleError("SCRAPER_ERROR", error.message)
          : this.handleError("UNKNOWN_ERROR", "An unknown error occurred");

      return {
        success: false,
        error: errorDetails,
      };
    }
  }

  private async fetchPage(): Promise<string> {
    try {
      const response = await axios.get(this.baseUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        timeout: 10000,
      });

      if (!response.data) {
        throw new Error("Empty response received");
      }

      return response.data;
    } catch (error) {
      console.error("Fetch error details:", {
        message: error instanceof Error ? error.message : "Unknown error",
        url: this.baseUrl,
      });
      throw this.handleError(
        "FETCH_ERROR",
        `Failed to fetch lotto page: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  private formatAmount(amountStr: string): number {
    // Remove PHP, commas, and convert to number
    return Number(amountStr.replace(/[₱,]/g, "")) || 0;
  }

  private handleError(code: string, message: string): ErrorDetails {
    return {
      code,
      message,
      timestamp: new Date(),
    };
  }

  // Debug method to get cache statistics
  getCacheStats() {
    return this.cache.getCacheStats();
  }
}

// Export a singleton instance
export const lottoScraper = new LottoScraper();
