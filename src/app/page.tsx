"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LottoGameType, LottoResult } from "@/lib/types";
import HomePageSkeleton from "@/components/Skeleton/HomePageSkeleton";
import ErrorCard from "@/components/ErrorCard";
import LottoDisplay from "@/components/LottoDisplay";
import PrizePool from "@/components/PrizePool";
import LottoCheckInfo from "@/components/CheckInformation";
import LegalDisclaimer from "@/components/LegalDisclaimer";
// Types
interface PrizePoolResult {
  gameType: LottoGameType;
  gameName: string;
  jackpotAmount: number;
  drawDate: Date;
}

// Custom hooks for data fetching
function useLottoData() {
  const [lottoDisplayData, setLottoDisplayData] = useState<LottoResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/lotto/results?gameType=${encodeURIComponent(
            LottoGameType.ULTRA_LOTTO_658
          )}`
        );
        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.error?.message || "Failed to fetch display data"
          );
        }

        setLottoDisplayData(data.data);
      } catch (err) {
        console.error("Error fetching lotto data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { lottoDisplayData, isLoading, error };
}

function usePrizePoolData() {
  const [prizePoolData, setPrizePoolData] = useState<PrizePoolResult[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/lotto/prize");
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error?.message || "Failed to fetch prize pool");
        }

        const sortedData = data.data.sort(
          (a: PrizePoolResult, b: PrizePoolResult) => {
            if (a.gameType === LottoGameType.ULTRA_LOTTO_658) return -1;
            if (b.gameType === LottoGameType.ULTRA_LOTTO_658) return 1;
            return 0;
          }
        );

        setPrizePoolData(sortedData);
      } catch (err) {
        console.error("Error fetching prize pool:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { prizePoolData, isLoading, error };
}

// Main Page Component
export default function Home() {
  const {
    lottoDisplayData,
    isLoading: isLottoLoading,
    error: lottoError,
  } = useLottoData();
  const {
    prizePoolData,
    isLoading: isPrizePoolLoading,
    error: prizePoolError,
  } = usePrizePoolData();

  const isLoading = isLottoLoading || isPrizePoolLoading;
  const error = lottoError || prizePoolError;

  return (
    <motion.main
      className="p-6 flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-4xl font-bold mb-6">PCSO Lotto Results</h1>

      {error ? (
        <ErrorCard error={error} />
      ) : isLoading ? (
        <HomePageSkeleton />
      ) : (
        <div className="space-y-6">
          <LottoDisplay initialData={lottoDisplayData} />
          <PrizePool initialData={prizePoolData} />
          <LottoCheckInfo />
          <LegalDisclaimer />
        </div>
      )}
    </motion.main>
  );
}
