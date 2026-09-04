export interface ProductView {
  label: string;
  src: string;
}

export interface Product {
  num: string;
  name: string;
  cat: string;
  glow: string;
  price: string;
  img: string;
  desc: string;
  views: ProductView[];
}

export const SIZES = [
  ["S", 56, 68],
  ["M", 58, 70],
  ["L", 60, 72],
  ["XL", 62, 74],
  ["2XL", 64, 76],
] as const;

export const products: Product[] = [
  {
    num: "01",
    name: "Velocity Blaze",
    cat: "Drop 01 / 2026",
    glow: "g1",
    price: "Rp 195.000",
    img: "/images/7dd1f74e-653b-407e-8aa3-f3823b11c91b.png",
    desc: "A high-energy racing-inspired fantasy jersey featuring dynamic geometric graphics and a bold orange, pink and deep-purple palette.",
    views: [
      { label: "Front", src: "/images/7dd1f74e-653b-407e-8aa3-f3823b11c91b.png" },
      { label: "Side", src: "/images/c8f67d04-4a6f-4161-8b64-0a891f2ecf6c.png" },
      { label: "Back", src: "/images/0e87a677-1f67-48df-9ea2-37fb53f122eb.png" },
    ],
  },
  {
    num: "02",
    name: "Nebula Flux",
    cat: "Drop 01 / 2026",
    glow: "g2",
    price: "Rp 195.000",
    img: "/images/831017d0-f7a3-4c07-93d3-1256a5324375.png",
    desc: "A fluid marbled fantasy design built from deep plum, magenta and amber currents — a calm, cosmic take on the modern football kit.",
    views: [
      { label: "Front", src: "/images/831017d0-f7a3-4c07-93d3-1256a5324375.png" },
      { label: "Side", src: "/images/ba839273-f6c3-48f5-8abf-890ea3af9bae.png" },
      { label: "Back", src: "/images/673669a3-8bf2-43f6-ab38-db255d1bce96.png" },
    ],
  },
  {
    num: "03",
    name: "Golden Shards",
    cat: "Drop 01 / 2026",
    glow: "g3",
    price: "Rp 185.000",
    img: "/images/e83ab667-0ed9-4255-89b9-a0ed228f2730.png",
    desc: "Fractured amber and navy shards form a sharp, community-driven graphic language — loud on the pitch, disciplined up close.",
    views: [
      { label: "Front", src: "/images/e83ab667-0ed9-4255-89b9-a0ed228f2730.png" },
      { label: "Side", src: "/images/bbe4ccbc-ba73-4f91-a234-52263fb7e935.png" },
      { label: "Back", src: "/images/83e3e297-f8d9-4aab-be27-eca330e264a3.png" },
    ],
  },
];

export function getWaLink(product: Product, size?: string): string {
  const text = size
    ? `Halo Eira Project, saya tertarik dengan Fantasy Jersey — ${product.name} ukuran ${size}. Saya ingin mendapatkan informasi cara order.`
    : `Halo Eira Project, saya tertarik dengan Fantasy Jersey — ${product.name}. Saya ingin mendapatkan informasi ukuran dan cara order.`;
  return `https://wa.me/6282299849418?text=${encodeURIComponent(text)}`;
}
