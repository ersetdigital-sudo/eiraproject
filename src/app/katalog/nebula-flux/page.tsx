import type { Metadata } from "next";
import ProductDetailClient from "../ProductDetailClient";

export const metadata: Metadata = {
  title: "Nebula Flux — Eira Project",
  description: "Jersey fantasy Nebula Flux — desain eksklusif, dicetak full-print pada bahan Milano Dryfit.",
};

const product = {
  slug: "nebula-flux",
  name: "Nebula Flux",
  description: "Jersey fantasy dengan motif marmer bergelombang dan gradasi lembut. Dicetak full-print pada bahan Milano Dryfit, jahitan rapi, siap dipakai main atau harian.",
  price: "Rp 195.000",
  mainImg: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788600229/yjv6ll3mgbsvmpxfcgix.png",
  thumbs: [
    { src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788600229/yjv6ll3mgbsvmpxfcgix.png", alt: "Tampak depan" },
    { src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788600400/w9wqkdiv2q0kmpoqrnhc.png", alt: "Tampak samping" },
  ],
  prev: { slug: "velocity-blaze", name: "Velocity Blaze" },
  next: { slug: "golden-shards", name: "Golden Shards" },
  index: 1,
  total: 3,
};

export default function NebulaFluxPage() {
  return <ProductDetailClient product={product} />;
}
