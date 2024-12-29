import { WinningNumberProps } from "@/lib/types";
import { Badge } from "./ui/badge";

export default function WinningNumber({
  numbers,
  drawDate,
  highlightedNumbers = [],
}: WinningNumberProps) {
  return (
    <div className="space-y-2">
      <Badge variant="secondary" className="text-sm font-bold text-gray-500">
        Draw Date: {new Date(drawDate).toLocaleDateString()}
      </Badge>
      <div className="flex flex-wrap justify-around ">
        {numbers.map((number, index) => (
          <div
            key={index}
            className={`
              relative w-24 h-24 rounded-full
              flex items-center justify-center
              ${
                highlightedNumbers.includes(number)
                  ? "bg-gradient-to-br from-red-400 via-red-500 to-red-600"
                  : "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600"
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

            {/* Number */}
            <span className="relative text-4xl font-extrabold text-white drop-shadow">
              {number.toString().padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
