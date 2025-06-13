"use client";

import { Button } from "@/components/ui/button";
import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface CarouselControlsProps {
  current: number;
  count: number;
  onSlideChange: (index: number) => void;
}

export function CarouselControls({ current, count, onSlideChange }: CarouselControlsProps) {
  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <CarouselPrevious className="position-static relative left-auto top-auto translate-x-0 translate-y-0" />
      
      <div className="flex gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={cn(
              "h-2 rounded-full p-0 transition-all",
              current === index + 1
                ? "w-6 bg-primary hover:bg-primary/80"
                : "w-2 bg-primary/30 hover:bg-primary/50"
            )}
            onClick={() => onSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <CarouselNext className="position-static relative right-auto top-auto translate-x-0 translate-y-0" />
    </div>
  );
}