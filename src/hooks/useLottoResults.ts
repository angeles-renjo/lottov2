// useLottoResults.ts
import { useState, useEffect } from "react";
import { LottoGameType, LottoResult } from "@/lib/types";

export function useLottoResults(
  gameType: LottoGameType,
  initialData: LottoResult | null
) {
  const [data, setData] = useState<LottoResult | null>(initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (gameType === LottoGameType.GRAND_LOTTO_655 && initialData) {
      return;
    }

    const fetchResults = async () => {
      try {
        setError(null);
        const response = await fetch(
          `/api/lotto/results?gameType=${encodeURIComponent(gameType)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.error?.message || "Failed to fetch results");
        }

        setData(result.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchResults();
  }, [gameType, initialData]);

  return { data, error };
}
