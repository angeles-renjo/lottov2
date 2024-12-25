import {
  ValidationResult,
  LottoGameType,
  LOTTO_GAMES,
  LOTTO_CONSTANTS,
} from "./types";

/**
 * Validates an array of lotto numbers based on game type
 */
export function validateLottoNumbers(
  numbers: number[],
  gameType: LottoGameType = LottoGameType.ULTRA_LOTTO_658
): ValidationResult {
  const game = LOTTO_GAMES[gameType];
  const errors: string[] = [];

  // Check array length
  if (numbers.length !== LOTTO_CONSTANTS.NUMBERS_PER_DRAW) {
    errors.push(
      `Must have exactly ${LOTTO_CONSTANTS.NUMBERS_PER_DRAW} numbers`
    );
  }

  // Check for duplicates
  const uniqueNumbers = new Set(numbers);
  if (uniqueNumbers.size !== numbers.length) {
    errors.push("Numbers must be unique");
  }

  // Validate each number
  numbers.forEach((num) => {
    if (!Number.isInteger(num)) {
      errors.push(`${num} is not a valid integer`);
    }
    if (num < LOTTO_CONSTANTS.MIN_NUMBER || num > game.maxNumber) {
      errors.push(
        `${num} is out of range (${LOTTO_CONSTANTS.MIN_NUMBER}-${game.maxNumber})`
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}

/**
 * Validates a draw date
 */
export function validateDrawDate(date: Date): ValidationResult {
  const errors: string[] = [];

  // Check if date is valid
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    errors.push("Invalid date format");
  }

  // Check if date is not in future
  if (date > new Date()) {
    errors.push("Draw date cannot be in the future");
  }

  // Check if date is not too old (e.g., before PCSO started)
  const oldestAllowedDate = new Date("1995-01-01"); // Adjust based on actual PCSO history
  if (date < oldestAllowedDate) {
    errors.push("Draw date is too old");
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}

/**
 * Validates jackpot amount
 */
export function validateJackpotAmount(amount: number): ValidationResult {
  const errors: string[] = [];

  if (!Number.isFinite(amount)) {
    errors.push("Invalid jackpot amount");
  }

  if (amount < 0) {
    errors.push("Jackpot amount cannot be negative");
  }

  // Add reasonable maximum if needed
  const maxJackpot = 1_000_000_000_000; // 1 trillion PHP
  if (amount > maxJackpot) {
    errors.push(`Jackpot amount exceeds maximum allowed (${maxJackpot})`);
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}

/**
 * Validates draw number format
 */
export function validateDrawNumber(drawNumber: string): ValidationResult {
  const errors: string[] = [];

  // Example format: "1234" or "XXXX"
  const drawNumberRegex = /^\d{4}$/;

  if (!drawNumberRegex.test(drawNumber)) {
    errors.push("Draw number must be exactly 4 digits");
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}

/**
 * Validates a complete lotto result
 */
export function validateLottoResult(result: {
  drawDate: Date;
  drawNumber: string;
  winningNumbers: number[];
  jackpotAmount: number;
  winners: number;
  gameType?: LottoGameType;
}): ValidationResult {
  const errors: string[] = [];

  // Validate each component
  const dateValidation = validateDrawDate(result.drawDate);
  const numbersValidation = validateLottoNumbers(
    result.winningNumbers,
    result.gameType
  );
  const jackpotValidation = validateJackpotAmount(result.jackpotAmount);
  const drawNumberValidation = validateDrawNumber(result.drawNumber);

  // Combine all validation errors
  if (!dateValidation.isValid) {
    errors.push(...(dateValidation.errors || []));
  }
  if (!numbersValidation.isValid) {
    errors.push(...(numbersValidation.errors || []));
  }
  if (!jackpotValidation.isValid) {
    errors.push(...(jackpotValidation.errors || []));
  }
  if (!drawNumberValidation.isValid) {
    errors.push(...(drawNumberValidation.errors || []));
  }

  // Validate winners count
  if (!Number.isInteger(result.winners) || result.winners < 0) {
    errors.push("Invalid winners count");
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}
