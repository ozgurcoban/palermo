import { Teko, Lobster, Lato } from "next/font/google";

export const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["100", "400", "700", "900"],
});

export const teko = Teko({
  subsets: ["latin"],
  variable: "--font-teko",
});

export const lobster = Lobster({
  subsets: ["latin"],
  variable: "--font-lobster",
  weight: "400",
});
