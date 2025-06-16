import { Skeleton } from "@/components/ui/skeleton";

export const MenuChipsSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-2 pb-2">
      {/* Clear all button skeleton */}
      <Skeleton className="h-8 w-16 rounded-full" />
      
      {/* Chip skeletons */}
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton 
          key={index} 
          className="h-8 rounded-full"
          style={{ width: `${Math.random() * 30 + 70}px` }} // Random widths 70-100px
        />
      ))}
    </div>
  );
};