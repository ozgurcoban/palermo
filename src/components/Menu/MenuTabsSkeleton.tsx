import { Skeleton } from "@/components/ui/skeleton";

export const MenuTabsSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {/* Simulate 4 tabs */}
      {Array.from({ length: 1 }).map((_, index) => (
        <Skeleton key={index} className="h-10 w-full rounded-lg" />
      ))}
    </div>
  );
};
