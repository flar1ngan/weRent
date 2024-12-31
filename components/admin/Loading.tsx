import { Skeleton } from "../ui/skeleton";

export function StatsLoadingContainer() {
  return (
    <div className="mt-8 grid md:grid-cols-3 gap-3 lg: grid-cols-3">
      <Skeleton className="w-full h-20 rounded" />
      <Skeleton className="w-full h-20 rounded" />
      <Skeleton className="w-full h-20 rounded" />
    </div>
  );
}
