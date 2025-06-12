export const criticalCSS = `
  /* Critical CSS - Only absolute essentials for above-fold rendering */
  
  /* CSS Custom Properties must be available immediately */
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
  
  /* Prevent layout shift */
  html {
    overflow-x: hidden;
  }
  
  body {
    margin: 0;
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }
  
  /* Hero title critical styles */
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
  
  /* FadeUp animation for hero */
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
`;