import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  useChips: boolean;
};

export const MenuItemsSkeleton = ({ useChips }: Props) => {
  return (
    <div className="h-full w-full px-4 pb-24 lg:pb-0">
      <div className="space-y-6">
        {/* Subcategories */}
        {Array.from({ length: 1 }).map((_, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            {/* Subcategory header with price badges */}
            <div className="flex items-center justify-end border-b border-gray-200 pb-2">
              {/* <Skeleton className="h-6 w-40 rounded" /> */}
              <div className="flex items-end gap-3">
                <Skeleton className="h-5 w-16 rounded" />
                <span className="text-gray-400">/</span>
                <Skeleton className="h-5 w-12 rounded" />
              </div>
            </div>

            {!useChips && (
              <div className="border-b border-gray-200 pb-6 pt-4 text-center">
                <Skeleton className="mx-auto h-8 w-56 rounded-lg" />
              </div>
            )}

            {/* Menu items */}
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, itemIndex) => (
                <div key={itemIndex} className="space-y-2">
                  {/* Item container */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      {/* Pizza name */}
                      <Skeleton className="h-5 w-28 rounded" />
                      {/* Ingredients */}
                      <Skeleton className="h-3 w-36 rounded" />
                      {/* Badge (sometimes) */}
                      {itemIndex % 3 === 0 && (
                        <div className="mt-1">
                          <Skeleton className="h-5 w-20 rounded-full" />
                        </div>
                      )}
                    </div>
                    {/* Price column */}
                    <div className="flex-shrink-0">
                      <Skeleton className="h-5 w-[70px] rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
