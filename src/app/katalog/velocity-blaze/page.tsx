import type { Metadata } from "next";
import ProductDetailClient from "../ProductDetailClient";

export const metadata: Metadata = {
  title: "Velocity Blaze — Eira Project",
  description: "Jersey fantasy Velocity Blaze — desain eksklusif, dicetak full-print pada bahan Milano Dryfit.",
};

const product = {
  slug: "velocity-blaze",
  name: "Velocity Blaze",
  description: "Jersey fantasy dengan grafis dinamis dan detail rapi. Dicetak full-print pada bahan Milano Dryfit, jahitan rapi, siap dipakai main atau harian.",
  price: "Rp 195.000",
  mainImg: "/images/e4859694-55d7-4fc5-8941-befeb46d1fde.png",
  thumbs: [
    { src: "/images/e4859694-55d7-4fc5-8941-befeb46d1fde.png", alt: "Tampak depan" },
    { src: "/images/efd64b80-e5cc-4146-a703-63cae082859d.png", alt: "Tampak samping" },
    { src: "/images/f5f526ba-1cb8-4c3b-b713-6fb2be8bcdaa.png", alt: "Detail bahan" },
    { src: "/images/6ccefc8e-e96c-4f98-9912-41410a64a9ea.png", alt: "Tampak depan alternatif" },
  ],
  prev: null,
  next: { slug: "nebula-flux", name: "Nebula Flux" },
  index: 0,
  total: 3,
};

export default function VelocityBlazePage() {
  return <ProductDetailClient product={product} />;
}
