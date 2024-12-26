import { Skeleton } from "../ui/skeleton";
import { CardContent, Card } from "../ui/card";
export default function HomePageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Game Selector Tabs Skeleton */}
      <div className="grid grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg border ${
              i === 0 ? "border-blue-500" : "border-gray-200"
            }`}
          >
            <Skeleton className="h-6 w-24 mx-auto" />
            <Skeleton className="h-4 w-12 mx-auto mt-2" />
          </div>
        ))}
      </div>

      {/* Lotto Results Card Skeleton */}
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Game Title and Schedule */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" /> {/* Game title */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-12" /> {/* "Every:" label */}
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-12" /> {/* "Time:" label */}
                <Skeleton className="h-6 w-20" /> {/* Time value */}
              </div>
            </div>
          </div>

          {/* Draw Date */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24" /> {/* "Draw Date:" label */}
            <Skeleton className="h-6 w-32" /> {/* Date value */}
          </div>

          {/* Winning Numbers */}
          <div className="grid grid-cols-6 ">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square flex ">
                <Skeleton className="h-16 w-16 rounded-full" />
              </div>
            ))}
          </div>

          {/* Jackpot Prize */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" /> {/* "Jackpot Prize:" label */}
            <Skeleton className="h-8 w-48" /> {/* Prize amount */}
          </div>
        </CardContent>
      </Card>

      {/* Prize Pool Card Skeleton */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info and Disclaimer Skeletons */}
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>

        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <Skeleton className="h-16 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
