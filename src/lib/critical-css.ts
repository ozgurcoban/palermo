export const criticalCSS = `
  /* Critical CSS for above-the-fold content */
  /* Only includes styles that cannot be achieved with Tailwind utilities */
  
  /* Hero title with complex text effects */
  .hero-title {
    font-family: var(--font-graduate);
    font-size: clamp(2.5rem, 12vw, 6rem);
    line-height: 1.1;
    font-weight: 700;
    color: #4a3728;
    -webkit-text-stroke: 6px white;
    paint-order: stroke fill;
    text-shadow: 1px 1px 0 #4a3728, -1px -1px 0 #4a3728, 1px -1px 0 #4a3728, -1px 1px 0 #4a3728;
    letter-spacing: 0.05em;
    text-align: center;
  }
  
  /* Hero fade animations - CSS only, no JS blocking */
  @keyframes heroFadeUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .hero-fade-1 {
    animation: heroFadeUp 0.7s ease-out 0.5s both;
  }
  
  .hero-fade-2 {
    animation: heroFadeUp 0.7s ease-out 0.8s both;
  }
  
  .hero-fade-3 {
    animation: heroFadeUp 0.7s ease-out 1.1s both;
  }
  
  .hero-fade-4 {
    animation: heroFadeUp 0.7s ease-out 1.4s both;
  }
  
  .hero-fade-5 {
    animation: heroFadeUp 0.7s ease-out 1.7s both;
  }
`;
