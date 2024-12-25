import LottoDisplay from "@/components/LottoDisplay";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-6">
        PCSO Lotto Results
      </h1>
      <LottoDisplay />
    </main>
  );
}
