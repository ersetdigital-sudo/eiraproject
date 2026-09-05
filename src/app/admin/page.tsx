"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Stats {
  total: number;
  newCount: number;
  soldOutCount: number;
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-6">
      <div className="admin-skeleton h-3 w-20 mb-3" />
      <div className="admin-skeleton h-8 w-16" />
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("products").select("*", { count: "exact", head: true }).eq("badge", "NEW"),
      supabase.from("products").select("*", { count: "exact", head: true }).eq("badge", "SOLD OUT"),
    ]).then(([all, newRes, soldRes]) => {
      setStats({
        total: all.count ?? 0,
        newCount: newRes.count ?? 0,
        soldOutCount: soldRes.count ?? 0,
      });
    });
  }, []);

  const cards = [
    { label: "Total Produk", value: stats?.total, color: "text-[var(--ink)]" },
    { label: "Status NEW", value: stats?.newCount, color: "text-[var(--gold)]" },
    { label: "SOLD OUT", value: stats?.soldOutCount, color: "text-[var(--muted)]" },
  ];

  return (
    <div className="admin-page-enter">
      <h1 className="text-xl font-extrabold uppercase tracking-tight text-[var(--ink)]">
        Dashboard
      </h1>
      <p className="mt-2 text-[12px] text-[var(--muted)]">Ringkasan data produk Eira Project</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {!stats
          ? [1, 2, 3].map((i) => <SkeletonCard key={i} />)
          : cards.map((c) => (
              <div key={c.label} className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-6 transition-opacity duration-300">
                <p className="text-[10px] uppercase tracking-[.22em] text-[var(--muted)]">{c.label}</p>
                <p className={`mt-3 text-3xl font-extrabold ${c.color}`}>
                  {c.value}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}
