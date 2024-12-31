"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Calculator, Info } from "lucide-react";
import { LOTTO_GAMES, LottoGameType, LOTTO_CONSTANTS } from "@/lib/types";
import { GAME_GUIDES } from "@/lib/gameGuideType";
import GameDisclaimer from "./GameDisclaimer";

interface GameGuideProps {
  gameType: LottoGameType;
}

export default function GameGuide({ gameType }: GameGuideProps) {
  const game = LOTTO_GAMES[gameType];
  const guideData = GAME_GUIDES[gameType];

  if (!game || !guideData) return null;

  return (
    <div className="w-full space-y-6">
      {/* Top Disclaimer */}
      <GameDisclaimer gameType={gameType} />

      <Card className="w-full">
        <CardContent className="p-6 space-y-6">
          {/* Header Section */}
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">{game.name}</h2>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>
                  {guideData.drawSchedule.days.join(", ")} at{" "}
                  {guideData.drawSchedule.time}
                </span>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg">
              Range: 1-{game.maxNumber}
            </Badge>
          </div>

          <Separator />

          {/* Prize Structure */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold">Prize Structure</h3>
            </div>
            <div className="grid gap-2">
              {guideData.prizes.map((prize, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-700">{prize.description}</span>
                  <Badge variant={index === 0 ? "default" : "outline"}>
                    {typeof prize.amount === "number"
                      ? `₱${prize.amount.toLocaleString()}`
                      : prize.amount}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* How to Play */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">How to Play</h3>
            <ul className="space-y-2 list-disc pl-5 text-gray-600">
              {guideData.howToPlay.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Important Notes */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Important Notes</h3>
            </div>
            <Alert className="bg-blue-50">
              <AlertDescription>
                <ul className="list-disc pl-4 space-y-1 text-gray-700">
                  {guideData.importantNotes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </div>

          <Separator />

          {/* Where to Claim */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Where to Claim Prizes</h3>
            <div className="grid gap-2">
              {guideData.whereToClaimPrizes.map((claim, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-700">{claim.range}</span>
                  <span className="text-sm text-gray-600">
                    {claim.location}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
