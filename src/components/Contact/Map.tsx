"use client";

import React, { useState } from "react";
import FadeUp from "@/components/ui/FadeUp";

function Map() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <FadeUp delay={0.3} duration={0.8}>
      <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200">
            <div className="flex h-full items-center justify-center text-gray-400">
              <span>Laddar karta...</span>
            </div>
          </div>
        )}

        <iframe
          title="Central bagdad karta"
          src="https://maps.google.com/maps?q=Sysslomansgatan%207,%20753%2011%20Uppsala&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{
            border: 0,
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
          allowFullScreen
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </FadeUp>
  );
}

export default React.memo(Map);
