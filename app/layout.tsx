import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";

import "./globals.css";
import Preloader from "./components/Preloader";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Omposition — Synthetic Lab for Physical AI",
  description:
    "The sandbox where robots learn before they enter the world. Generate worlds, tasks, failures, and annotated synthetic data for humanoid robots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
