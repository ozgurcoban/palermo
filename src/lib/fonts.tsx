import { Lobster, Lato, Lobster_Two } from "next/font/google";
import localFont from "next/font/local";

export const recoleta = localFont({
  src: [
    {
      path: "../fonts/Recoleta-Thin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Recoleta-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Recoleta-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Recoleta-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Recoleta-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Recoleta-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Recoleta-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-recoleta",
});

export const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["100", "400", "700", "900"],
});

export const lobster = Lobster({
  subsets: ["latin"],
  variable: "--font-lobster",
  weight: "400",
});

export const lobsterTwo = Lobster_Two({
  subsets: ["latin"],
  variable: "--font-lobster-two",
  weight: ["400", "700"],
});
