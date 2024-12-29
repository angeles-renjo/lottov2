// GameDisclaimer.tsx
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { LottoGameType } from "@/lib/types";

interface GameDisclaimerProps {
  gameType: LottoGameType;
}

const GAME_URLS: Record<LottoGameType, string> = {
  [LottoGameType.ULTRA_LOTTO_658]:
    "https://www.pcso.gov.ph/Games/Lotto/UltraLotto658.aspx",
  [LottoGameType.GRAND_LOTTO_655]:
    "https://www.pcso.gov.ph/Games/Lotto/GrandLotto655.aspx",
  [LottoGameType.SUPER_LOTTO_649]:
    "https://www.pcso.gov.ph/Games/Lotto/SuperLotto649.aspx",
  [LottoGameType.MEGA_LOTTO_645]:
    "https://www.pcso.gov.ph/Games/Lotto/MegaLotto645.aspx",
  [LottoGameType.LOTTO_642]:
    "https://www.pcso.gov.ph/Games/Lotto/Lotto642.aspx",
};

export default function GameDisclaimer({ gameType }: GameDisclaimerProps) {
  return (
    <Alert className="bg-yellow-50 border-yellow-200">
      <AlertCircle className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-800">
        This guide is for reference only. For the most up-to-date and official
        information, please visit the{" "}
        <a
          href={GAME_URLS[gameType]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold hover:text-yellow-900"
        >
          official PCSO website
        </a>
        .
      </AlertDescription>
    </Alert>
  );
}
