"use client";
import { useState, useEffect } from "react";
import LottoDisplay from "@/components/LottoDisplay";
import PrizePool from "@/components/PrizePool";
import { motion } from "framer-motion";
import { LottoGameType, LottoResult } from "@/lib/types";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import LottoCheckInfo from "@/components/CheckInformation";

// Define the prize pool result type
interface PrizePoolResult {
  gameType: LottoGameType;
  gameName: string;
  jackpotAmount: number;
  drawDate: Date;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [lottoDisplayData, setLottoDisplayData] = useState<LottoResult | null>(
    null
  );
  const [prizePoolData, setPrizePoolData] = useState<PrizePoolResult[] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Lotto Display data (Ultra Lotto 6/58 as default)
        const displayResponse = await fetch(
          `/api/lotto/results?gameType=${encodeURIComponent(
            LottoGameType.ULTRA_LOTTO_658
          )}`
        );
        const displayData = await displayResponse.json();

        if (!displayData.success) {
          throw new Error(
            displayData.error?.message || "Failed to fetch display data"
          );
        }

        // Fetch Prize Pool data (all games)
        const prizePoolResponse = await fetch("/api/lotto/prize");
        const prizePoolData = await prizePoolResponse.json();

        if (!prizePoolData.success) {
          throw new Error(
            prizePoolData.error?.message || "Failed to fetch prize pool"
          );
        }

        // Sort prize pool data to ensure Ultra Lotto comes first
        const sortedPrizePoolData = prizePoolData.data.sort(
          (a: PrizePoolResult, b: PrizePoolResult) => {
            if (a.gameType === LottoGameType.ULTRA_LOTTO_658) return -1;
            if (b.gameType === LottoGameType.ULTRA_LOTTO_658) return 1;
            return 0;
          }
        );

        setLottoDisplayData(displayData.data);
        setPrizePoolData(sortedPrizePoolData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <motion.div
        className="fixed inset-0 bg-white flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-900" />
          <p className="text-gray-600">Loading lottery results...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.main
      className="p-6 flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-4xl font-bold mb-6">PCSO Lotto Results</h1>

      <div className="space-y-6">
        <LottoDisplay initialData={lottoDisplayData} />
        <PrizePool initialData={prizePoolData} />
        <LottoCheckInfo />
        <LegalDisclaimer />
      </div>
    </motion.main>
  );
}
