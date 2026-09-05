import type { Metadata } from "next";
import ProductDetailClient from "../ProductDetailClient";

export const metadata: Metadata = {
  title: "Golden Shards — Eira Project",
  description: "Jersey fantasy Golden Shards — desain eksklusif, dicetak full-print pada bahan Milano Dryfit.",
};

const product = {
  slug: "golden-shards",
  name: "Golden Shards",
  description: "Jersey fantasy dengan pecahan grafis tajam dan aksen emas. Dicetak full-print pada bahan Milano Dryfit, jahitan rapi, siap dipakai main atau harian.",
  price: "Rp 195.000",
  mainImg: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788600849/sd6rk3qic0nk8hctaget.png",
  thumbs: [
    { src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788600849/sd6rk3qic0nk8hctaget.png", alt: "Tampak depan" },
    { src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788600849/efbdsuj9qcocl4hy4ant.png", alt: "Tampak samping" },
  ],
  prev: { slug: "nebula-flux", name: "Nebula Flux" },
  next: null,
  index: 2,
  total: 3,
};

export default function GoldenShardsPage() {
  return <ProductDetailClient product={product} />;
}
