// app/(site)/guide/page.tsx
import GameGuide from "@/components/GameGuide";
import { LottoGameType } from "@/lib/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "PCSO Lotto Games Guide",
  description:
    "Complete guide to PCSO lotto games including draw schedules, prize structures, and how to play instructions.",
};

export default function GuidePage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          PCSO Lotto Games Guide
        </h1>
        <p className="text-gray-600">
          Comprehensive guide to all PCSO lotto games. Select a game below to
          learn more about how to play, prize structures, and important
          information.
        </p>
      </div>

      <Separator />

      {/* Game Guides */}
      <div className="space-y-12">
        <GameGuide gameType={LottoGameType.ULTRA_LOTTO_658} />
        <GameGuide gameType={LottoGameType.GRAND_LOTTO_655} />
        <GameGuide gameType={LottoGameType.SUPER_LOTTO_649} />
        <GameGuide gameType={LottoGameType.MEGA_LOTTO_645} />
        <GameGuide gameType={LottoGameType.LOTTO_642} />
      </div>

      {/* Bottom Notice */}
      <Alert className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          All games are regulated by PCSO. Game schedules and prize structures
          may change without prior notice. Always refer to official PCSO
          announcements for the most accurate information.
        </AlertDescription>
      </Alert>
    </div>
  );
}
