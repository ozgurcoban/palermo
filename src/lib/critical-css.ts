export const criticalCSS = `
  /* Critical CSS for above-the-fold content */
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
    tracking-wider: true;
  }
  
  .font-lato {
    font-family: var(--font-lato);
  }
  
  .text-light {
    color: #fafafa;
  }
  
  /* Prevent layout shift */
  img {
    max-width: 100%;
    height: auto;
  }
  
  /* Badge styles */
  .rounded-sm {
    border-radius: 0.25rem;
  }
  
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
  
  /* Button styles */
  .rounded-full {
    border-radius: 9999px;
  }
  
  .bg-accent {
    background-color: rgb(var(--accent));
  }
  
  .text-accent-foreground {
    color: rgb(var(--accent-foreground));
  }
  
  /* Layout utilities */
  .relative {
    position: relative;
  }
  
  .absolute {
    position: absolute;
  }
  
  .inset-0 {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  
  .z-10 {
    z-index: 10;
  }
  
  .z-20 {
    z-index: 20;
  }
  
  .h-full {
    height: 100%;
  }
  
  .w-full {
    width: 100%;
  }
  
  .overflow-hidden {
    overflow: hidden;
  }
  
  .flex {
    display: flex;
  }
  
  .flex-col {
    flex-direction: column;
  }
  
  .items-center {
    align-items: center;
  }
  
  .justify-center {
    justify-content: center;
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