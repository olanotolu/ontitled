import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ontitled.",
  description: "Reality is not finished.",
  icons: { icon: "/icon.svg" },
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
