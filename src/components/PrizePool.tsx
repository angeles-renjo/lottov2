// src/components/PrizePool.tsx

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { LottoGameType } from "@/lib/types";
import { getNextDrawDate } from "@/lib/lottoSchedule";

interface PrizePoolResult {
  gameType: LottoGameType;
  gameName: string;
  jackpotAmount: number;
  drawDate: Date;
}

interface PrizePoolProps {
  initialData?: PrizePoolResult[] | null;
}

const PrizePool = ({ initialData }: PrizePoolProps) => {
  const [results, setResults] = useState<PrizePoolResult[]>(initialData || []);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialData);

  useEffect(() => {
    const fetchPrizePool = async () => {
      if (initialData) return;

      try {
        const response = await fetch("/api/lotto/prize");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error?.message || "Failed to fetch prize pool");
        }

        setResults(data.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrizePool();
  }, [initialData]);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <p className="text-red-700">{error}</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6 space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                {i < 5 && <div className="h-px bg-gray-200 my-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <h1 className="text-2xl font-bold p-4">Lotto Prize Pool</h1>
      <CardContent className="p-6 space-y-6">
        {results.map((result, index) => (
          <AnimatePresence key={result.gameType} mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{result.gameName}</h3>
                <div className="flex flex-col gap-2">
                  <Badge variant="destructive" className="text-sm w-fit">
                    Last Draw:{" "}
                    {new Date(result.drawDate).toLocaleDateString("en-PH", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-sm text-blue-500 w-fit"
                  >
                    Next Draw:{" "}
                    {getNextDrawDate(result.gameType).toLocaleDateString(
                      "en-PH",
                      {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </Badge>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Jackpot Prize:</span>
                <Badge
                  variant="outline"
                  className="text-lg text-emerald-500 px-3 py-1"
                >
                  ₱{result.jackpotAmount.toLocaleString()}
                </Badge>
              </div>

              {index < results.length - 1 && <Separator className="my-4" />}
            </motion.div>
          </AnimatePresence>
        ))}
      </CardContent>
    </Card>
  );
};

export default PrizePool;
