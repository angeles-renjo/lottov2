import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import { PartyPopper, AlertCircle } from "lucide-react";
import {
  LottoGameType,
  LOTTO_GAMES,
  NumberCheckerProps,
  CheckResult,
} from "@/lib/types";
import { Button } from "./ui/button";

export default function NumberChecker({
  gameType,
  winningNumbers,
  drawDate,
}: NumberCheckerProps) {
  const [numbers, setNumbers] = useState<string[]>(Array(6).fill(""));
  const [showDialog, setShowDialog] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentGame = LOTTO_GAMES[gameType];

  const handleNumberChange = (index: number, value: string) => {
    // Allow empty value for clearing input
    if (value === "") {
      const newNumbers = [...numbers];
      newNumbers[index] = value;
      setNumbers(newNumbers);
      setError(null);
      return;
    }

    // Check if input is a valid number
    const isValidNumber = /^\d+$/.test(value);
    if (!isValidNumber) {
      return;
    }

    // Check if number is within game range
    const numberValue = parseInt(value);
    if (numberValue > currentGame.maxNumber) {
      return;
    }

    // Update numbers array
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
    setError(null);
  };

  const checkNumbers = () => {
    // Validate all numbers are filled
    if (numbers.some((n) => !n)) {
      setError("Please fill in all numbers");
      return;
    }

    // Convert to numbers and validate uniqueness
    const numberSet = new Set(numbers.map((n) => parseInt(n)));
    if (numberSet.size !== 6) {
      setError("Numbers must be unique");
      return;
    }

    // Find matches
    const matches = numbers
      .map((n) => parseInt(n))
      .filter((n) => winningNumbers.includes(n))
      .sort((a, b) => a - b);

    setResult({ matches });
    setShowDialog(true);
  };

  const resetNumbers = () => {
    setNumbers(Array(6).fill(""));
    setResult(null);
    setError(null);
    setShowDialog(false);
  };

  const getResultMessage = (matchCount: number) => {
    switch (matchCount) {
      case 6:
        return "Congratulations! You've won the jackpot! 🎉";
      case 5:
        return "Amazing! You're very close! 🌟";
      case 4:
        return "Great job! That's a significant match! ✨";
      case 3:
        return "Good going! You've got some matches! 👍";
      default:
        return "Better luck next time! Keep trying! 🍀";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Check Your Numbers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col items-center">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {numbers.map((number, index) => (
              <input
                key={index}
                type="text"
                value={number}
                onChange={(e) => handleNumberChange(index, e.target.value)}
                className="w-full p-4 text-center text-lg font-medium border rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 
                          transition-all duration-200"
                maxLength={2}
                inputMode="numeric"
                placeholder={(index + 1).toString()}
              />
            ))}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.div>
          )}

          <Button
            onClick={checkNumbers}
            className="p-6 bg-blue-600 text-white rounded-lg 
                     hover:bg-blue-700 transition-colors duration-200
                     font-medium text-lg"
          >
            Check Numbers
          </Button>
        </CardContent>
      </Card>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl flex items-center gap-2 justify-center">
              {result?.matches?.length === 6 ? (
                <PartyPopper className="h-8 w-8 text-yellow-500" />
              ) : (
                <AlertCircle className="h-8 w-8 text-blue-500" />
              )}
              <span>Result</span>
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4 text-center pt-4">
                {result && (
                  <>
                    <div className="text-xl font-medium">
                      {getResultMessage(result.matches.length)}
                    </div>
                    <div className="text-lg text-gray-600">
                      You matched {result.matches.length} number
                      {result.matches.length !== 1 ? "s" : ""}
                    </div>
                    {result.matches.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {result.matches.map((num) => (
                          <Badge
                            key={num}
                            variant="secondary"
                            className="px-4 py-2 text-lg bg-blue-100 text-blue-700"
                          >
                            {num.toString().padStart(2, "0")}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction
              onClick={resetNumbers}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Try Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
