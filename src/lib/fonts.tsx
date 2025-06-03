import { Lobster, Lato, Graduate } from "next/font/google";
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

export const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

export const lobster = Lobster({
  subsets: ["latin"],
  variable: "--font-lobster",
  weight: "400",
  display: "swap",
  preload: false,
});

export const graduate = Graduate({
  subsets: ["latin"],
  variable: "--font-graduate",
  weight: "400",
  display: "swap",
  preload: false,
});
