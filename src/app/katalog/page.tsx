import type { Metadata } from "next";
import "./katalog.css";
import KatalogClient from "./KatalogClient";

export const metadata: Metadata = {
  title: "Katalog Fantasy Jersey — Eira Project",
  description:
    "Katalog fantasy jersey Eira Project. Desain eksklusif, nama & nomor gratis. Order langsung via WhatsApp.",
  openGraph: {
    type: "website",
    title: "Katalog Fantasy Jersey — Eira Project",
    description:
      "Desain eksklusif, koleksi baru setiap bulan. Order langsung via WhatsApp.",
  },
  twitter: { card: "summary_large_image" },
};

export default function Katalog() {
  return <KatalogClient />;
}
