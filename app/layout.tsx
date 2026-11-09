import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ontitled — We make old giants dance again.",
  description: "We make old giants dance again.",
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
