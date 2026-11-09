import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ontitled",
  description: "We make old giants dance again.",
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
