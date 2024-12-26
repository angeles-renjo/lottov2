"use client";
import { useState, useEffect } from "react";
import { LottoGameType, LottoResult } from "@/lib/types";
import GameSelector from "./GameSelector";
import WinningNumber from "./WinningNumber";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface LottoDisplayProps {
  initialData: LottoResult | null;
}

export default function LottoDisplay({ initialData }: LottoDisplayProps) {
  const [results, setResults] = useState<LottoResult | null>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [gameType, setGameType] = useState<LottoGameType>(
    LottoGameType.GRAND_LOTTO_655
  );

  useEffect(() => {
    // Only fetch if gameType changes and it's not the initial load
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

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error?.message || "Failed to fetch results");
        }

        setResults(data.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchResults();
  }, [gameType, initialData]);

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

  if (!results) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-yellow-700">No results available</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-6">
        <GameSelector selectedGame={gameType} onGameChange={setGameType} />

        <Separator className="my-4" />

        <motion.div
          key={gameType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <WinningNumber
            numbers={results.winningNumbers}
            drawDate={results.drawDate}
          />
        </motion.div>

        <Separator className="my-4" />

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              className="space-y-2"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Jackpot Prize:</span>
                <Badge
                  variant="outline"
                  className="text-lg text-emerald-500 px-3 py-1"
                >
                  ₱{results.jackpotAmount.toLocaleString()}
                </Badge>
              </div>
            </motion.div>

            {results.nextDrawPrize && (
              <motion.div
                className="space-y-2"
                initial={{ x: 20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Next Draw Prize:</span>
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    ₱{results.nextDrawPrize.toLocaleString()}
                  </Badge>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
