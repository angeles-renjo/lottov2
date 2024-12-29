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
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (!data.success)
          throw new Error(data.error?.message || "Failed to fetch prize pool");
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
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-2">
          <p className="text-red-700 text-sm">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-3">
          <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-3"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-around items-center">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white shadow-sm">
      <h2 className="text-xl font-semibold p-3 text-center text-gray-800 border-b">
        Lotto Prize Pool
      </h2>
      <CardContent className="p-3 divide-y divide-gray-100">
        {results.map((result, index) => (
          <AnimatePresence key={result.gameType} mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.1 }}
              className="py-3 first:pt-0 last:pb-0"
            >
              <div className="flex justify-around items-center">
                <div className="w-48">
                  <h3 className="text-base font-medium text-gray-800">
                    {result.gameName}
                  </h3>
                </div>

                <div className="flex gap-2 w-48">
                  <Badge
                    variant="destructive"
                    className="text-xs whitespace-nowrap"
                  >
                    Last:{" "}
                    {new Date(result.drawDate).toLocaleDateString("en-PH", {
                      month: "short",
                      day: "numeric",
                    })}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-xs text-blue-500 whitespace-nowrap"
                  >
                    Next:{" "}
                    {getNextDrawDate(result.gameType).toLocaleDateString(
                      "en-PH",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 w-48">
                  <span className="text-sm text-gray-500">Prize:</span>
                  <Badge variant="outline" className="text-sm text-emerald-500">
                    ₱{result.jackpotAmount.toLocaleString()}
                  </Badge>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ))}
      </CardContent>
    </Card>
  );
};

export default PrizePool;
