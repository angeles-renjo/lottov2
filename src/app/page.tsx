"use client";
import { useState, useEffect } from "react";
import LottoDisplay from "@/components/LottoDisplay";
import PrizePool from "@/components/PrizePool";
import { motion, AnimatePresence } from "framer-motion";
import { LottoGameType, LOTTO_GAMES } from "@/lib/types";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const gameTypes = Object.values(LottoGameType);

        const results = await Promise.all(
          gameTypes.map(async (gameType) => {
            const response = await fetch(
              `/api/lotto/results?gameType=${encodeURIComponent(gameType)}`
            );
            const data = await response.json();

            if (!data.success) {
              console.error(`Error fetching ${gameType}:`, data.error);
              return null;
            }

            return {
              ...data.data,
              gameName: LOTTO_GAMES[gameType].name,
              gameType: gameType,
            };
          })
        );

        const validResults = results.filter((r) => r !== null);
        setData({
          lottoDisplay: validResults[0],
          prizePool: validResults,
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Show loading overlay immediately
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

  // Show error if any
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

  // Show all content together when data is ready
  return (
    <motion.main
      className="p-6 flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-4xl font-bold mb-6">PCSO Lotto Results</h1>

      <div className="space-y-6">
        <LottoDisplay initialData={data?.lottoDisplay} />
        <PrizePool initialData={data?.prizePool} />
      </div>
    </motion.main>
  );
}
