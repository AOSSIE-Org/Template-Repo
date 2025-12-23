import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web3 Protocol Template | Stability Nexus",
  description:
    "A starter template for building Web3 protocols using Next.js and Tailwind CSS.",

  openGraph: {
    title: "Web3 Protocol Template",
    description:
      "Starter template for building Web3 protocols with modern frontend tooling.",
    url: "https://stability.nexus",
    siteName: "Stability Nexus",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
