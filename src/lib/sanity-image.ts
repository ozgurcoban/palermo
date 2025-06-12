import urlFor from "./urlFor";

interface ImageSizes {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  "2xl"?: number;
}

interface OptimizedImage {
  src: string;
  srcSet: string;
  sizes: string;
  width?: number;
  height?: number;
}

interface CarouselImageProps {
  src: string;
  width: number;
  height: number;
}

// Default breakpoints matching Tailwind
const DEFAULT_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// Generate optimized image with srcSet for responsive loading
export function getOptimizedImage(
  source: any,
  sizes: ImageSizes | number = {},
  aspectRatio?: number
): OptimizedImage {
  // If sizes is a number, use it as the max width
  if (typeof sizes === "number") {
    const width = sizes;
    const height = aspectRatio ? Math.round(width / aspectRatio) : undefined;
    
    const imageBuilder = urlFor(source).width(width).fit('crop').auto('format').quality(85);
    if (height) {
      imageBuilder.height(height);
    }
    
    return {
      src: imageBuilder.url(),
      srcSet: generateSrcSet(source, width, height),
      sizes: `(max-width: ${width}px) 100vw, ${width}px`,
      width,
      height,
    };
  }

  // Otherwise use responsive sizes
  const sizeEntries = Object.entries(sizes).filter(([_, width]) => width);
  
  if (sizeEntries.length === 0) {
    // Default responsive sizes
    const defaultSizes = {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    };
    return getOptimizedImage(source, defaultSizes, aspectRatio);
  }

  // Generate srcSet entries
  const srcSetEntries: string[] = [];
  let maxWidth = 0;

  sizeEntries.forEach(([breakpoint, width]) => {
    if (width && width > maxWidth) maxWidth = width;
    const height = aspectRatio ? Math.round(width / aspectRatio) : undefined;
    
    // Generate multiple resolutions for each breakpoint
    [1, 2].forEach((multiplier) => {
      const w = width * multiplier;
      const h = height ? height * multiplier : undefined;
      
      const imageBuilder = urlFor(source).width(w).fit('crop').auto('format').quality(85);
      if (h) {
        imageBuilder.height(h);
      }
      
      srcSetEntries.push(
        `${imageBuilder.url()} ${w}w`
      );
    });
  });

  // Generate sizes attribute
  const sizesAttr = sizeEntries
    .map(([breakpoint, width], index) => {
      const bp = DEFAULT_BREAKPOINTS[breakpoint as keyof typeof DEFAULT_BREAKPOINTS];
      if (index === sizeEntries.length - 1) {
        return `${width}px`;
      }
      return `(max-width: ${bp}px) ${width}px`;
    })
    .join(", ");

  const defaultHeight = aspectRatio ? Math.round(maxWidth / aspectRatio) : undefined;

  const imageBuilder = urlFor(source).width(maxWidth).fit('crop').auto('format').quality(85);
  if (defaultHeight) {
    imageBuilder.height(defaultHeight);
  }

  return {
    src: imageBuilder.url(),
    srcSet: srcSetEntries.join(", "),
    sizes: sizesAttr,
    width: maxWidth,
    height: defaultHeight,
  };
}

// Generate srcSet for a single size
function generateSrcSet(source: any, width: number, height?: number): string {
  const entries: string[] = [];
  
  // Generate 1x, 1.5x, and 2x versions
  [1, 1.5, 2].forEach((multiplier) => {
    const w = Math.round(width * multiplier);
    const h = height ? Math.round(height * multiplier) : undefined;
    
    const imageBuilder = urlFor(source).width(w).fit('crop').auto('format').quality(85);
    if (h) {
      imageBuilder.height(h);
    }
    
    entries.push(
      `${imageBuilder.url()} ${multiplier}x`
    );
  });

  return entries.join(", ");
}

// Helper to get blur data URL for placeholder
export function getBlurDataUrl(source: any): string {
  return urlFor(source)
    .width(40)
    .height(30)
    .blur(20)
    .quality(30)
    .fit('crop')
    .url();
}

// Helper for background images that need CSS url()
export function getBackgroundImage(source: any, width = 1920): string {
  return urlFor(source)
    .width(width)
    .fit('crop')
    .auto('format')
    .quality(85)
    .url();
}

// Quick optimized image helper for common sizes
export function getOptimizedImageUrl(source: any, width: number, height?: number, quality = 85): string {
  const imageBuilder = urlFor(source)
    .width(width)
    .fit('crop')
    .auto('format')
    .quality(quality);
  
  if (height) {
    imageBuilder.height(height);
    // Force exact dimensions with rect parameter
    imageBuilder.rect(0, 0, width, height);
  }
  
  return imageBuilder.url();
}

// Optimized carousel image for Next.js Image component
export function getCarouselImage(source: any): CarouselImageProps {
  // Desktop dimensions for src (Next.js will handle responsive sizes)
  const width = 1200;
  const height = 600;
  
  return {
    src: getOptimizedImageUrl(source, width, height, 85),
    width,
    height,
    // Let Next.js handle srcSet generation based on deviceSizes
  };
}

// Get responsive carousel image URL based on viewport
export function getResponsiveCarouselUrl(source: any): string {
  // This will be called client-side to get the appropriate image
  if (typeof window === 'undefined') {
    return getOptimizedImageUrl(source, imageSizes.carousel.desktop.width, imageSizes.carousel.desktop.height, 85);
  }
  
  const width = window.innerWidth;
  
  if (width <= 640) {
    return getOptimizedImageUrl(source, imageSizes.carousel.mobile.width, imageSizes.carousel.mobile.height, 85);
  } else if (width <= 1024) {
    return getOptimizedImageUrl(source, imageSizes.carousel.tablet.width, imageSizes.carousel.tablet.height, 85);
  }
  
  return getOptimizedImageUrl(source, imageSizes.carousel.desktop.width, imageSizes.carousel.desktop.height, 85);
}

// Predefined sizes for common use cases
export const imageSizes = {
  gallery: {
    mobile: { width: 300, height: 200 },
    tablet: { width: 400, height: 300 },
    desktop: { width: 600, height: 400 }
  },
  hero: {
    mobile: { width: 800, height: 600 },
    tablet: { width: 1200, height: 800 },
    desktop: { width: 1920, height: 1080 }
  },
  carousel: {
    mobile: { width: 531, height: 400 },
    tablet: { width: 711, height: 400 },
    desktop: { width: 1200, height: 600 }
  },
  thumbnail: {
    small: { width: 150, height: 150 },
    medium: { width: 300, height: 300 },
    large: { width: 600, height: 600 }
  }
};