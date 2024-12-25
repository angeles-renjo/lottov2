import { WinningNumberProps } from "@/lib/types";

export default function WinningNumber({
  numbers,
  drawDate,
  highlightedNumbers = [],
}: WinningNumberProps) {
  return (
    <div className="space-y-2">
      <div className="text-sm text-gray-500">
        Draw Date: {new Date(drawDate).toLocaleDateString()}
      </div>
      <div className="flex flex-wrap gap-3">
        {numbers.map((number, index) => (
          <div
            key={index}
            className={`
              relative w-16 h-16 rounded-full
              flex items-center justify-center
              ${
                highlightedNumbers.includes(number)
                  ? "bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600"
                  : "bg-gradient-to-br from-red-400 via-red-500 to-red-600"
              }
              shadow-lg
              transform transition-all duration-300 hover:scale-105
              group
            `}
          >
            {/* Glass effect overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/50 to-transparent opacity-50" />

            {/* Inner ring */}
            <div className="absolute inset-[2px] rounded-full border border-white/20" />

            {/* Ball shine */}
            <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-white/40 blur-sm" />

            {/* Number */}
            <span className="relative text-2xl font-bold text-white drop-shadow">
              {number.toString().padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
