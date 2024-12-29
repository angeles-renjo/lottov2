import { Skeleton } from "../ui/skeleton";
import { CardContent, Card } from "../ui/card";

export default function HomePageSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      {/* Game Selector Tabs Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`p-2 md:p-4 rounded-lg border ${
              i === 0 ? "border-blue-500" : "border-gray-200"
            }`}
          >
            <Skeleton className="h-4 md:h-6 w-16 md:w-24 mx-auto" />
            <Skeleton className="h-3 md:h-4 w-8 md:w-12 mx-auto mt-2" />
          </div>
        ))}
      </div>

      {/* Lotto Results Card Skeleton */}
      <Card>
        <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Game Title and Schedule */}
          <div className="space-y-3 md:space-y-4">
            <Skeleton className="h-6 md:h-8 w-36 md:w-48" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-5 md:h-6 w-16 md:w-20" />
              </div>
            </div>
          </div>

          {/* Draw Date */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 md:h-6 w-20 md:w-24" />
            <Skeleton className="h-5 md:h-6 w-24 md:w-32" />
          </div>

          {/* Winning Numbers */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square flex justify-center">
                <Skeleton className="h-12 w-12 md:h-16 md:w-16 rounded-full" />
              </div>
            ))}
          </div>

          {/* Jackpot Prize */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <Skeleton className="h-5 md:h-6 w-24 md:w-32" />
            <Skeleton className="h-6 md:h-8 w-36 md:w-48" />
          </div>
        </CardContent>
      </Card>

      {/* Prize Pool Card Skeleton */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3 md:space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-12 md:h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info and Disclaimer Skeletons */}
      <div className="space-y-3 md:space-y-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <Skeleton className="h-6 md:h-8 w-36 md:w-48 mb-3 md:mb-4" />
            <Skeleton className="h-16 md:h-20 w-full" />
          </CardContent>
        </Card>

        <Card className="bg-gray-50">
          <CardContent className="p-4 md:p-6">
            <Skeleton className="h-12 md:h-16 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
