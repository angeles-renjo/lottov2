// GameSelector.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LottoGameType, LOTTO_GAMES } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

interface GameSelectorProps {
  selectedGame: LottoGameType;
  onGameChange: (gameType: LottoGameType) => void;
}

const GAME_DISPLAY_NAMES: Record<LottoGameType, string> = {
  [LottoGameType.ULTRA_LOTTO_658]: "ULTRA LOTTO 6/58",
  [LottoGameType.GRAND_LOTTO_655]: "GRAND LOTTO 6/55",
  [LottoGameType.SUPER_LOTTO_649]: "SUPER LOTTO 6/49",
  [LottoGameType.MEGA_LOTTO_645]: "MEGALOTTO 6/45",
  [LottoGameType.LOTTO_642]: "LOTTO 6/42",
};

const DRAW_SCHEDULES: Record<LottoGameType, string[]> = {
  [LottoGameType.ULTRA_LOTTO_658]: ["Tuesday", "Friday", "Sunday"],
  [LottoGameType.GRAND_LOTTO_655]: ["Monday", "Wednesday", "Saturday"],
  [LottoGameType.SUPER_LOTTO_649]: ["Tuesday", "Thursday", "Sunday"],
  [LottoGameType.MEGA_LOTTO_645]: ["Monday", "Wednesday", "Friday"],
  [LottoGameType.LOTTO_642]: ["Tuesday", "Thursday", "Saturday"],
};

const GameSelector = ({ selectedGame, onGameChange }: GameSelectorProps) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {Object.values(LOTTO_GAMES).map((game) => {
          const isSelected = selectedGame === game.type;

          return (
            <motion.button
              key={game.type}
              onClick={() => onGameChange(game.type)}
              className={`
                relative w-full rounded-lg border-2 transition-all duration-200
                ${
                  isSelected
                    ? "border-blue-500 shadow-lg"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold tracking-wide text-center">
                      {GAME_DISPLAY_NAMES[game.type]
                        .split(" ")
                        .map((word, i) => (
                          <span key={i} className="block">
                            {word}
                          </span>
                        ))}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedGame}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h4 className="text-lg font-bold">
                  {GAME_DISPLAY_NAMES[selectedGame]}
                </h4>
                <div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Every:</span>
                      <div className="flex flex-wrap gap-2">
                        {DRAW_SCHEDULES[selectedGame].map((day) => (
                          <Badge
                            key={day}
                            variant="secondary"
                            className="bg-blue-50 hover:bg-blue-100 text-blue-700"
                          >
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Time:</span>
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700"
                      >
                        9:00 PM
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GameSelector;
