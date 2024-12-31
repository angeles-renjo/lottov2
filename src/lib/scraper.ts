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
  private readonly baseUrl: string = LOTTO_CONSTANTS.BASE_URL;
  private cache: LottoCache;

  constructor() {
    // Initialize cache with 5 minute TTL
    this.cache = new LottoCache({ ttl: 5 * 60 * 1000 });
  }

  async fetchLatestResults(gameType: LottoGameType): Promise<ScraperResponse> {
    try {
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
        return {
          success: true,
          data: cachedResult,
        };
      }

      console.log(
        `Cache miss for game type: ${gameType}, fetching from source...`
      );

      const html = await this.fetchPage();
      const $ = cheerio.load(html);

      const container = $(
        "#cphContainer_cphContainer_LottoResults_pDrawResults"
      );

      if (!container.length) {
        throw this.handleError("NO_RESULTS", "Results container not found");
      }

      const gameConfig = LOTTO_GAMES[gameType];
      const gameDiv = container.find(
        `.draw-game:has(img[src*="${gameConfig.imageId}.png"])`
      );

      if (!gameDiv.length) {
        throw this.handleError(
          "GAME_NOT_FOUND",
          `Game ${gameConfig.name} not found`
        );
      }

      const numbers: number[] = [];
      gameDiv.find(".draw-number").each((_, el) => {
        const num = parseInt($(el).text().trim(), 10);
        if (!isNaN(num)) {
          numbers.push(num);
        }
      });

      if (numbers.length !== LOTTO_CONSTANTS.NUMBERS_PER_DRAW) {
        throw this.handleError(
          "INVALID_NUMBERS",
          `Expected ${LOTTO_CONSTANTS.NUMBERS_PER_DRAW} numbers, got ${numbers.length}`
        );
      }

      const dateStr = gameDiv.find(".jackpot-date").text().trim();
      const jackpotStr = gameDiv.find(".jackpot-amount").text().trim();
      const winnersStr = gameDiv.find(".jackpot-winner").text().trim();

      const winners = parseInt(winnersStr.split(" ")[0], 10);

      const lottoResult: LottoResult = {
        drawDate: new Date(dateStr),
        drawNumber: "N/A",
        winningNumbers: numbers,
        jackpotAmount: this.formatAmount(jackpotStr),
        winners: isNaN(winners) ? 0 : winners,
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
      const response = await axios.get(`${this.baseUrl}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; LottoBot/1.0)",
          Accept: "text/html",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });
      return response.data;
    } catch (_) {
      throw this.handleError("FETCH_ERROR", "Failed to fetch lotto page");
    }
  }

  private formatAmount(amountStr: string): number {
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
