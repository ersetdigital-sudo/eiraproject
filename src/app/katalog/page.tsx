import type { Metadata } from "next";
import KatalogClient from "./KatalogClient";

export const metadata: Metadata = {
  title: "Katalog — Eira Project",
  description:
    "Jersey fantasy dengan desain eksklusif. Koleksi baru setiap bulan.",
  openGraph: {
    type: "website",
    title: "Katalog — Eira Project",
    description:
      "Jersey fantasy dengan desain eksklusif. Koleksi baru setiap bulan.",
  },
  twitter: { card: "summary_large_image" },
};

export default function Katalog() {
  return <KatalogClient />;
}
