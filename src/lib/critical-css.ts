export const criticalCSS = `
  /* Critical CSS for above-the-fold content */
  
  /* CSS Reset - Minimal for performance */
  *, ::before, ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: hsl(var(--border));
  }
  
  html {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -moz-tab-size: 4;
    tab-size: 4;
    font-family: var(--font-lato), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  
  body {
    margin: 0;
    line-height: inherit;
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    overflow-x: hidden;
  }
  
  /* CSS Custom Properties - Color scheme */
  :root {
    --background: 24 75% 95%;
    --foreground: 24 5% 10%;
    --card: 24 50% 90%;
    --card-foreground: 24 5% 15%;
    --popover: 24 72% 95%;
    --popover-foreground: 24 95% 10%;
    --primary: 24 27% 24%;
    --primary-foreground: 0 0% 100%;
    --secondary: 24 30% 70%;
    --secondary-foreground: 0 0% 0%;
    --muted: 14 30% 85%;
    --muted-foreground: 24 5% 35%;
    --accent: 14 30% 80%;
    --accent-foreground: 24 5% 15%;
    --destructive: 0 72% 30%;
    --destructive-foreground: 24 5% 90%;
    --border: 24 30% 50%;
    --input: 24 30% 28%;
    --ring: 24 27% 24%;
    --radius: 0.5rem;
    --accent-soft-apricot: 24, 60%, 90%;
  }
  
  .dark {
    --background: 220 26% 8%;
    --foreground: 220 5% 90%;
    --card: 220 26% 11%;
    --card-foreground: 220 5% 90%;
    --popover: 220 26% 6%;
    --popover-foreground: 220 5% 90%;
    --primary: 210 25% 55%;
    --primary-foreground: 220 26% 8%;
    --secondary: 220 14% 20%;
    --secondary-foreground: 220 5% 90%;
    --muted: 215 20% 28%;
    --muted-foreground: 220 10% 65%;
    --accent: 210 20% 40%;
    --accent-foreground: 220 5% 90%;
    --destructive: 0 72% 50%;
    --destructive-foreground: 220 5% 90%;
    --border: 215 20% 32%;
    --input: 215 20% 32%;
    --ring: 210 25% 55%;
    --accent-soft-apricot: 220, 15%, 25%;
  }
  
  /* Container */
  .container {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    max-width: 100vw;
    overflow: hidden;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  @media (min-width: 640px) {
    .container {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
  
  @media (min-width: 1024px) {
    .container {
      max-width: 1444px;
    }
  }
  
  /* Typography essentials */
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
  }
  
  p {
    margin: 0;
  }
  
  a {
    color: inherit;
    text-decoration: inherit;
  }
  
  img, video {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  button {
    background-color: transparent;
    background-image: none;
    padding: 0;
    line-height: inherit;
    color: inherit;
    cursor: pointer;
    font-family: inherit;
    font-size: 100%;
    font-weight: inherit;
    margin: 0;
  }
  
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
    margin-bottom: 1rem;
  }
  
  /* Navbar critical styles */
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background-color: hsl(var(--background));
    border-bottom: 1px solid hsl(var(--border));
  }
  
  /* Hero image container - removed animation */
  .hero-image-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  /* FadeUp animation for hero content */
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(2rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeUp {
    animation: fadeUp 0.6s ease-out forwards;
    opacity: 0;
  }
  
  /* Utility classes needed for above-fold */
  .relative { position: relative; }
  .absolute { position: absolute; }
  .fixed { position: fixed; }
  .z-10 { z-index: 10; }
  .z-20 { z-index: 20; }
  .z-50 { z-index: 50; }
  .flex { display: flex; }
  .h-full { height: 100%; }
  .w-full { width: 100%; }
  .w-screen { width: 100vw; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .text-center { text-align: center; }
  .overflow-hidden { overflow: hidden; }
  .object-cover { object-fit: cover; }
  
  /* Font utilities */
  .font-lato { font-family: var(--font-lato); }
  .font-recoleta { font-family: var(--font-recoleta); }
  .font-graduate { font-family: var(--font-graduate); }
  
  /* Color utilities for hero */
  .text-light { color: #ffffff; }
  .bg-black\\/40 { background-color: rgba(0, 0, 0, 0.4); }
  
  /* Spacing utilities */
  .mb-4 { margin-bottom: 1rem; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  
  @media (min-width: 640px) {
    .sm\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
  }
`;