import type { Metadata } from "next";
import ProductDetailClient from "../ProductDetailClient";

export const metadata: Metadata = {
  title: "Golden Shards — Eira Project",
  description: "Jersey fantasy dengan pecahan grafis tajam dan aksen emas. Dicetak full-print pada bahan Milano Dryfit.",
};

const product = {
  slug: "golden-shards",
  name: "Golden Shards",
  description: "Jersey fantasy dengan pecahan grafis tajam dan aksen emas. Dicetak full-print pada bahan Milano Dryfit, jahitan rapi, siap dipakai main atau harian.",
  price: "Rp 195.000",
  mainImg: "/images/75c59814-6786-48b7-a111-d846c580a0a2.png",
  thumbs: [
    { src: "/images/75c59814-6786-48b7-a111-d846c580a0a2.png", alt: "Tampak depan" },
    { src: "/images/9ac8e2ce-b1f6-4853-b56b-cd1e90a70d2d.png", alt: "Tampak samping" },
    { src: "/images/5a185889-bc31-46c1-9cb5-7d795094036b.png", alt: "Detail bahan" },
    { src: "/images/db45a9f9-af41-4cad-9611-6d2be74937af.png", alt: "Tampak alternatif" },
  ],
  prev: { slug: "nebula-flux", name: "Nebula Flux" },
  next: { slug: "velocity-blaze", name: "Velocity Blaze" },
};

export default function GoldenShardsPage() {
  return <ProductDetailClient product={product} />;
}
