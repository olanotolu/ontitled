import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ontitled",
  description: "A minimal black and white link page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
