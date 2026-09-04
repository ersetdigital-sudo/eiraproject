import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://eiraproject.id"),
  title: "Eira Project — Custom Jersey & Apparel",
  description:
    "Jersey custom dengan desain eksklusif untuk Team, Racing, Football, dan Community. Design by request — order langsung via WhatsApp.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    title: "Eira Project — Custom Jersey & Apparel",
    description:
      "Jersey custom desain eksklusif — Team • Racing • Football • Community. Design by request.",
    images: ["/images/6e97a62b-51e6-4309-80b4-4b1b3de5ae73.jpg"],
  },
  twitter: {
    card: "summary_large_image",
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
    <html lang="id">
      <body className="min-h-screen">
        <div className="aura"></div>
        <div className="grain"></div>
        {children}
      </body>
    </html>
  );
}
