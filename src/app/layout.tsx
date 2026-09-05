import type { Metadata, Viewport } from "next";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL("https://eiraproject.id"),
  title: "Eira Project — Fantasy Jersey Specialist",
  description:
    "Jersey fantasy dengan desain eksklusif. Koleksi baru setiap bulan.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    title: "Eira Project — Fantasy Jersey Specialist",
    description:
      "Jersey fantasy dengan desain eksklusif. Koleksi baru setiap bulan.",
    images: ["/images/6e97a62b-51e6-4309-80b4-4b1b3de5ae73.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eira Project — Fantasy Jersey Specialist",
    description:
      "Jersey fantasy dengan desain eksklusif. Koleksi baru setiap bulan.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen">
        <div className="aura"></div>
        <div className="grain"></div>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
