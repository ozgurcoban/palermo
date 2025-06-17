"use client";

import Image from "next/image";
import MaskText from "@/components/ui/MaskText";
import FadeUp from "@/components/ui/FadeUp";
import { getImageDimensions } from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";
import { getClient } from "../../sanity/lib/client";
import { useGetLocale } from "@/config";

const client = getClient();
const builder = urlBuilder(client);

interface IntroSectionProps {
  data?: IntroSection;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ data }) => {
  const locale = useGetLocale();
  
  if (!data?.title || !data?.image || !data?.highlights) return null;

  const { width, height } = getImageDimensions(data.image.asset);
  const imageUrl = builder
    .image(data.image)
    .width(800)
    .height(600)
    .auto("format")
    .url();

  return (
    <section className="w-full py-16 md:py-20 lg:py-24">
      <div className="container">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-20">
          {/* Text Column */}
          <div className="flex-1 max-w-prose space-y-8">
            <MaskText
              as="h2"
              className="font-graduate text-3xl font-bold leading-tight text-primary md:text-4xl lg:text-5xl"
              phrases={[data.title[locale]]}
              delay={0.2}
            />
            
            <div className="space-y-8">
              {data.highlights.map((highlight, index) => (
                <FadeUp key={highlight._key} delay={0.4 + index * 0.1}>
                  <div className="space-y-3">
                    <h3 className="font-recoleta text-xl font-semibold leading-tight text-primary md:text-2xl lg:text-[26px]">
                      {highlight.subtitle[locale]}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                      {highlight.description[locale]}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <FadeUp delay={0.6} className="flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt={
                  typeof data.image.alt === 'object' 
                    ? data.image.alt[locale] 
                    : data.image.alt || "Restaurant atmosphere"
                }
                width={width}
                height={height}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};