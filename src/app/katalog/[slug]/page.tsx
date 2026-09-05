import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductDetailClient from "../ProductDetailClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("name, description")
    .eq("slug", slug)
    .single();

  if (!product) return { title: "Produk Tidak Ditemukan — Eira Project" };

  return {
    title: `${product.name} — Eira Project`,
    description: product.description || `${product.name} — Eira Project`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch product
  const { data: product } = await supabase
    .from("products")
    .select("*, product_images(url, sort_order)")
    .eq("slug", slug)
    .order("sort_order", { foreignTable: "product_images" })
    .single();

  if (!product) notFound();

  // Fetch all products for prev/next navigation (sorted by sort_order)
  const { data: allProducts } = await supabase
    .from("products")
    .select("slug, name, sort_order")
    .order("sort_order", { ascending: true });

  const productList = allProducts ?? [];
  const currentIndex = productList.findIndex((p) => p.slug === slug);

  const prev = currentIndex > 0
    ? { slug: productList[currentIndex - 1].slug, name: productList[currentIndex - 1].name }
    : null;
  const next = currentIndex < productList.length - 1
    ? { slug: productList[currentIndex + 1].slug, name: productList[currentIndex + 1].name }
    : null;

  // Build thumbs from product_images
  const thumbs = (product.product_images ?? [])
    .sort((a: any, b: any) => a.sort_order - b.sort_order)
    .map((img: any) => ({ src: img.url, alt: product.name }));

  const mainImg = thumbs[0]?.src ?? "";

  const detail = {
    slug: product.slug,
    name: product.name,
    description: product.description || "",
    price: product.price,
    mainImg,
    thumbs,
    prev,
    next,
    index: currentIndex >= 0 ? currentIndex : 0,
    total: productList.length,
  };

  return <ProductDetailClient product={detail} />;
}
