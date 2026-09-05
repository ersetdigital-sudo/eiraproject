import { createClient } from "@/lib/supabase/server";
import { ProductsTable } from "@/components/admin/ProductsTable";

export const dynamic = "force-dynamic";

export default async function ProductsAdminPage() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*, product_images(*)")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <p className="text-[15px] font-bold text-[var(--ink)]">Gagal Memuat Produk</p>
        <p className="mt-2 text-[12px] text-[var(--muted)]">{error.message}</p>
      </div>
    );
  }

  return <ProductsTable products={products ?? []} />;
}
