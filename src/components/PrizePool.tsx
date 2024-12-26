"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { LottoResult } from "@/lib/types";

interface PrizePoolProps {
  initialData: (LottoResult & { gameName: string })[] | null;
}

const PrizePool = ({ initialData }: PrizePoolProps) => {
  const [results, setResults] = useState<
    (LottoResult & { gameName: string })[]
  >(initialData || []);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <Card className="">
      <h1 className="text-4xl font-bold p-4">Lotto Prize Pool</h1>
      <CardContent className="p-6 space-y-6">
        <AnimatePresence mode="wait">
          {results.map((result, index) => (
            <motion.div
              key={result.gameName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{result.gameName}</h3>
              </div>

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
                      ₱{result.jackpotAmount.toLocaleString()}
                    </Badge>
                  </div>
                </motion.div>

                {result.nextDrawPrize && (
                  <motion.div
                    className="space-y-2"
                    initial={{ x: 20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Next Draw Prize:</span>
                      <Badge variant="secondary" className="text-sm px-3 py-1">
                        ₱{result.nextDrawPrize.toLocaleString()}
                      </Badge>
                    </div>
                  </motion.div>
                )}
              </div>

              {index < results.length - 1 && <Separator className="my-4" />}
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default PrizePool;
