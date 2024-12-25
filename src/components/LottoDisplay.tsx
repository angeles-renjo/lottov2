"use client";
import { useState, useEffect } from "react";
import { LottoGameType, LottoResult, LOTTO_GAMES } from "@/lib/types";

export default function LottoDisplay() {
  const [results, setResults] = useState<LottoResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameType, setGameType] = useState<LottoGameType>(
    LottoGameType.GRAND_LOTTO_655
  );

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `/api/lotto/results?gameType=${encodeURIComponent(gameType)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error?.message || "Failed to fetch results");
        }

        setResults(data.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [gameType]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 text-blue border-green-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-700">No results available</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <select
          className="w-full p-2 border  rounded-md"
          value={gameType}
          onChange={(e) => setGameType(e.target.value as LottoGameType)}
        >
          {Object.values(LOTTO_GAMES).map((game) => (
            <option key={game.type} value={game.type}>
              {game.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{LOTTO_GAMES[gameType].name}</h2>
          <span className="text-sm text-gray-500">
            Draw #{results.drawNumber}
          </span>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-500">
            Draw Date: {new Date(results.drawDate).toLocaleDateString()}
          </div>
          <div className="flex flex-wrap gap-3">
            {results.winningNumbers.map((number, index) => (
              <div
                key={index}
                className="
                  relative w-16 h-16 rounded-full
                  flex items-center justify-center
                  bg-gradient-to-br from-red-400 via-red-500 to-red-600
                  shadow-lg
                  transform transition-all duration-300 hover:scale-105
                  group
                "
              >
                {/* Glass effect overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/50 to-transparent opacity-50" />

                {/* Inner ring */}
                <div className="absolute inset-[2px] rounded-full border border-white/20" />

                {/* Ball shine */}
                <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-white/40 blur-sm" />

                {/* Number */}
                <span className="relative text-2xl font-bold text-white drop-shadow">
                  {number.toString().padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Jackpot Prize:</span>
            <span className="font-bold">
              ₱{results.jackpotAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Winners:</span>
            <span className="font-bold">{results.winners}</span>
          </div>
          {results.nextDrawPrize && (
            <div className="flex justify-between">
              <span className="text-gray-600">Next Draw Prize:</span>
              <span className="font-bold">
                ₱{results.nextDrawPrize.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
