import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
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

export const dynamic = "force-dynamic";

export default async function Katalog() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("name, slug, badge, price, series, sort_order, product_images(url, sort_order)")
    .order("sort_order", { ascending: true });

  const items = (products ?? []).map((p) => ({
    slug: p.slug,
    name: p.name,
    badge: p.badge,
    series: p.series || "",
    price: p.price,
    img: p.product_images?.[0]?.url ?? "",
    status: p.badge === "SOLD OUT" ? "sold" as const : "available" as const,
    order: p.sort_order,
  }));

  const available = items.filter((p) => p.status === "available");
  const soldOut = items.filter((p) => p.status === "sold");

  return <KatalogClient available={available} soldOut={soldOut} />;
}
