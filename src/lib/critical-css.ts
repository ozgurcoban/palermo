export const criticalCSS = `
  /* Critical CSS for above-the-fold content */
  .hero-title {
    font-family: var(--font-recoleta);
    font-size: clamp(2.5rem, 10vw, 6rem);
    line-height: 1.1;
    font-weight: 700;
    color: white;
    text-shadow: 0 2px 4px rgba(0,0,0,0.8);
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
`;