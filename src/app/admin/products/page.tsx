"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ProductsTable } from "@/components/admin/ProductsTable";
import type { Product } from "@/lib/types";

function SkeletonTable() {
  return (
    <div className="admin-page-enter">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="admin-skeleton h-7 w-32 mb-2" />
          <div className="admin-skeleton h-4 w-48" />
        </div>
        <div className="admin-skeleton h-9 w-32 rounded-full" />
      </div>
      <div className="flex gap-3 mb-6">
        <div className="admin-skeleton h-10 flex-1 rounded-xl" />
        <div className="admin-skeleton h-10 w-36 rounded-xl" />
      </div>
      <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] overflow-hidden">
        <div className="p-4 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="admin-skeleton h-10 w-10 rounded-lg shrink-0" />
              <div className="flex-1">
                <div className="admin-skeleton h-4 w-32 mb-1" />
                <div className="admin-skeleton h-3 w-20" />
              </div>
              <div className="admin-skeleton h-5 w-16 rounded-full hidden sm:block" />
              <div className="admin-skeleton h-7 w-14 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("*, product_images(*)")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
        } else {
          setProducts(data ?? []);
        }
      });
  }, []);

  if (error) {
    return (
      <div className="admin-page-enter flex flex-col items-center justify-center py-20 px-4 text-center">
        <p className="text-[15px] font-bold text-[var(--ink)]">Gagal Memuat Produk</p>
        <p className="mt-2 text-[12px] text-[var(--muted)]">{error}</p>
      </div>
    );
  }

  if (!products) return <SkeletonTable />;

  return (
    <div className="admin-page-enter">
      <ProductsTable products={products} />
    </div>
  );
}
