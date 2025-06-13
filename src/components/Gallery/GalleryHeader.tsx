"use client";

import MaskText from "@/components/ui/MaskText";

interface GalleryHeaderProps {
  title: string;
  description?: string;
}

export function GalleryHeader({ title, description }: GalleryHeaderProps) {
  return (
    <>
      <MaskText
        delay={0.2}
        phrases={[title]}
        className="title-secondary text-center font-recoleta font-bold leading-tight"
        as="h2"
      />

      {description && (
        <div className="mt-6 w-full">
          <MaskText
            delay={0.4}
            phrases={[description]}
            className="text-body mx-auto max-w-md text-justify opacity-80"
          />
        </div>
      )}
    </>
  );
}