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
  mainImg: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788601179/pnwq7iwvjsb5fklfkiwi.png",
  thumbs: [
    { src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788601179/pnwq7iwvjsb5fklfkiwi.png", alt: "Tampak depan" },
    { src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788601181/lwqp0mufpci3yfojvxjg.png", alt: "Tampak samping" },
  ],
  prev: null,
  next: { slug: "nebula-flux", name: "Nebula Flux" },
  index: 0,
  total: 3,
};

export default function VelocityBlazePage() {
  return <ProductDetailClient product={product} />;
}
