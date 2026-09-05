"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function loadProducts() {
    setLoading(true);
    let query = supabase
      .from("products")
      .select("*, product_images(*)")
      .order("sort_order", { ascending: true });

    if (filter !== "all") {
      query = query.eq("badge", filter);
    }

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    const { data } = await query;
    setProducts(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, [filter, search]);

  async function handleDelete() {
    if (!deleteId) return;
    const product = products.find((p) => p.id === deleteId);

    // Delete images from Cloudinary
    if (product?.product_images) {
      for (const img of product.product_images) {
        const publicId = img.url.split("/").slice(-2).join("/").replace(/\.[^.]+$/, "");
        await fetch("/api/cloudinary/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id: publicId }),
        });
      }
    }

    await supabase.from("product_images").delete().eq("product_id", deleteId);
    await supabase.from("products").delete().eq("id", deleteId);
    setDeleteId(null);
    loadProducts();
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="disp text-xl font-extrabold uppercase tracking-tight text-[var(--ink)]">Produk</h1>
          <p className="mt-2 text-[12px] text-[var(--muted)]">Kelola semua produk jersey</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-2.5 text-[10px] track uppercase font-bold text-[#090A0C] hover:opacity-90 transition"
        >
          + Tambah Produk
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari produk..."
          className="flex-1 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-2.5 text-[12px] text-[var(--ink)] placeholder-[var(--muted)] outline-none focus:border-[var(--gold)] transition-colors"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-2.5 text-[12px] text-[var(--ink)] outline-none focus:border-[var(--gold)] transition-colors cursor-pointer"
        >
          <option value="all">Semua Status</option>
          <option value="NEW">NEW</option>
          <option value="LIMITED">LIMITED</option>
          <option value="SOLD OUT">SOLD OUT</option>
        </select>
      </div>

      {/* Table */}
      <div className="mt-6 rounded-xl border border-[var(--line)] bg-[var(--panel)] overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 rounded-lg bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-[13px] text-[var(--muted)]">Belum ada produk</p>
            <Link href="/admin/products/new" className="mt-4 inline-block text-[11px] track uppercase text-[var(--gold)] hover:underline">
              Tambah Produk Pertama →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--line)]">
                  <th className="px-4 py-3 text-[9px] track uppercase text-[var(--muted)] font-medium">Produk</th>
                  <th className="px-4 py-3 text-[9px] track uppercase text-[var(--muted)] font-medium hidden sm:table-cell">Harga</th>
                  <th className="px-4 py-3 text-[9px] track uppercase text-[var(--muted)] font-medium hidden sm:table-cell">Badge</th>
                  <th className="px-4 py-3 text-[9px] track uppercase text-[var(--muted)] font-medium hidden md:table-cell">Urutan</th>
                  <th className="px-4 py-3 text-[9px] track uppercase text-[var(--muted)] font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-[var(--line)] last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.product_images?.[0] && (
                          <img src={p.product_images[0].url} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        )}
                        <div>
                          <p className="text-[12px] font-semibold text-[var(--ink)]">{p.name}</p>
                          <p className="text-[10px] text-[var(--muted)] sm:hidden">{p.price}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-[var(--ink)] hidden sm:table-cell">{p.price}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] track uppercase font-medium ${
                        p.badge === "NEW" ? "bg-[var(--gold)]/10 text-[var(--gold)]" :
                        p.badge === "LIMITED" ? "bg-amber-500/10 text-amber-400" :
                        "bg-white/5 text-[var(--muted)]"
                      }`}>
                        {p.badge}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-[var(--muted)] hidden md:table-cell">{p.sort_order}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${p.id}`}
                          className="px-3 py-1.5 rounded-lg text-[10px] track uppercase text-[var(--muted)] hover:text-[var(--ink)] hover:bg-white/5 transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteId(p.id)}
                          className="px-3 py-1.5 rounded-lg text-[10px] track uppercase text-[var(--muted)] hover:text-red-400 hover:bg-red-400/5 transition-colors cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6">
            <p className="disp text-[15px] font-bold uppercase text-[var(--ink)]">Hapus Produk?</p>
            <p className="mt-2 text-[12px] text-[var(--muted)]">Produk dan semua foto akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl border border-[var(--line)] px-4 py-2.5 text-[11px] track uppercase text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-xl bg-red-500/80 px-4 py-2.5 text-[11px] track uppercase font-bold text-white hover:bg-red-500 transition-colors cursor-pointer"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
