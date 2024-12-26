"use client";
import LottoPrizeClaiming from "@/components/LottoPrizeClaiming";
import SweepstakesPrizeClaiming from "@/components/SweepStakeClaim";

export default function ClaimPage() {
  return (
    <div className="space-y-6 flex flex-col items-center p-2">
      <LottoPrizeClaiming />
      <SweepstakesPrizeClaiming />
    </div>
  );
}
