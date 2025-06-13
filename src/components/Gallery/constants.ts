// Gallery carousel constants and configurations

// Image preloading configuration - triggers early for smooth loading
export const IMAGE_PRELOAD_CONFIG = {
  threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] as number[],
  rootMargin: "0px 0px 400px 0px", // Start preloading when gallery is 400px from viewport
  intersectionRatio: 0.1,
} as const;

// Autoplay configuration - triggers early to show image 2 before gallery is centered
export const AUTOPLAY_CONFIG_INTERSECTION = {
  threshold: [0, 0.1, 0.3] as number[],
  rootMargin: "0px 0px 150px 0px", // Start autoplay 150px before gallery is visible
  intersectionRatio: 0.1, // Start autoplay when 10% visible (earlier trigger)
} as const;

// Legacy config (keep for compatibility)
export const INTERSECTION_CONFIG = IMAGE_PRELOAD_CONFIG;

export const AUTOPLAY_CONFIG = {
  delay: 2800, // Faster transition to show image 2 before user reaches gallery
  stopOnInteraction: false,
  stopOnMouseEnter: true,
  playOnInit: false,
} as const;

export const CAROUSEL_CONFIG = {
  align: "start" as const,
  loop: true,
};

export const ANIMATION_STYLES = {
  gradient: {
    backgroundSize: "200% 200%",
  },
  shimmer: {
    background:
      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)",
    backgroundSize: "200% 100%",
  },
} as const;

export const IMAGE_CONFIG = {
  sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px",
  priority: false,
  loading: "lazy" as const,
  placeholder: "blur" as const,
} as const;
