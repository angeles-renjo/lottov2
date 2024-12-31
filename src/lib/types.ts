// Game Types
export enum LottoGameType {
  GRAND_LOTTO_655 = "GRAND_655",
  ULTRA_LOTTO_658 = "ULTRA_658",
  SUPER_LOTTO_649 = "SUPER_649",
  MEGA_LOTTO_645 = "MEGA_645",
  LOTTO_642 = "LOTTO_642",
}

export interface LottoGame {
  type: LottoGameType;
  path: string;
  name: string;
  maxNumber: number;
  imageId: string; // Added to store the image identifier
}

// Constants
export const LOTTO_CONSTANTS = {
  MIN_NUMBER: 1,
  NUMBERS_PER_DRAW: 6,
  BASE_URL: "https://www.pcso.gov.ph/SearchLottoResult.aspx",
} as const;

// Game Configurations
export const LOTTO_GAMES: Record<LottoGameType, LottoGame> = {
  [LottoGameType.ULTRA_LOTTO_658]: {
    type: LottoGameType.ULTRA_LOTTO_658,
    path: "/gaming/games/lottery/ultra-lotto-6-58",
    name: "Ultra Lotto 6/58",
    maxNumber: 58,
    imageId: "658",
  },
  [LottoGameType.GRAND_LOTTO_655]: {
    type: LottoGameType.GRAND_LOTTO_655,
    path: "/gaming/games/lottery/grand-lotto-6-55",
    name: "Grand Lotto 6/55",
    maxNumber: 55,
    imageId: "6551",
  },
  [LottoGameType.SUPER_LOTTO_649]: {
    type: LottoGameType.SUPER_LOTTO_649,
    path: "/gaming/games/lottery/super-lotto-6-49",
    name: "Superlotto 6/49",
    maxNumber: 49,
    imageId: "6491",
  },
  [LottoGameType.MEGA_LOTTO_645]: {
    type: LottoGameType.MEGA_LOTTO_645,
    path: "/gaming/games/lottery/mega-lotto-6-45",
    name: "Megalotto 6/45",
    maxNumber: 45,
    imageId: "6451",
  },
  [LottoGameType.LOTTO_642]: {
    type: LottoGameType.LOTTO_642,
    path: "/gaming/games/lottery/lotto-6-42",
    name: "Lotto 6/42",
    maxNumber: 42,
    imageId: "6421",
  },
};

// Rest of your existing types remain the same
export interface LottoResult {
  drawDate: Date;
  drawNumber: string;
  winningNumbers: number[];
  jackpotAmount: number;
  winners: number;
  nextDrawPrize?: number;
}

export interface ScraperResponse {
  success: boolean;
  data?: LottoResult;
  error?: ErrorDetails;
}

export interface ErrorDetails {
  code: string;
  message: string;
  timestamp: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ErrorDetails;
  metadata?: ResponseMetadata;
}

export interface ResponseMetadata {
  timestamp: Date;
  requestId: string;
  cached?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}

export interface LottoSearchParams {
  startDate?: Date;
  endDate?: Date;
  drawNumber?: string;
  limit?: number;
  page?: number;
}

export interface LottoStatistics {
  mostFrequentNumbers: Array<{
    number: number;
    frequency: number;
  }>;
  jackpotHistory: Array<{
    date: Date;
    amount: number;
  }>;
  winnerStats: {
    totalWinners: number;
    averageJackpot: number;
    highestJackpot: number;
  };
}

export interface LottoDisplayProps {
  results: LottoResult[];
  isLoading?: boolean;
  error?: ErrorDetails;
}

export interface WinningNumberProps {
  numbers: number[];
  drawDate: Date;
  highlightedNumbers?: number[];
}

export type DateString = string;
export type Currency = number;

//checker
export interface NumberCheckerProps {
  gameType: LottoGameType;
  winningNumbers: number[];
  drawDate: Date;
}

export interface CheckResult {
  matches: number[];
  prizeCategory?: string;
}
