import localFont from "next/font/local";

export const recoleta = localFont({
  src: [
    {
      path: "../fonts/Recoleta-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Recoleta-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-recoleta",
  display: "swap",
  preload: true,
});

export const lato = localFont({
  src: [
    {
      path: "../fonts/Lato-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Lato-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-lato",
  display: "swap",
  preload: true,
});

export const graduate = localFont({
  src: "../fonts/Graduate-Regular.woff2",
  variable: "--font-graduate",
  weight: "400",
  display: "swap",
  preload: false,
});
