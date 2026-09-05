"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { DashboardStats } from "@/lib/types";

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    async function load() {
      const { data: products } = await supabase
        .from("products")
        .select("badge");

      if (products) {
        setStats({
          total: products.length,
          newCount: products.filter((p) => p.badge === "NEW").length,
          soldOutCount: products.filter((p) => p.badge === "SOLD OUT").length,
        });
      }
    }
    load();
  }, []);

  const cards = [
    { label: "Total Produk", value: stats?.total ?? "—", color: "text-[var(--ink)]" },
    { label: "Status NEW", value: stats?.newCount ?? "—", color: "text-[var(--gold)]" },
    { label: "SOLD OUT", value: stats?.soldOutCount ?? "—", color: "text-[var(--muted)]" },
  ];

  return (
    <div>
      <h1 className="disp text-xl font-extrabold uppercase tracking-tight text-[var(--ink)]">Dashboard</h1>
      <p className="mt-2 text-[12px] text-[var(--muted)]">Ringkasan data produk Eira Project</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-6">
            <p className="text-[10px] track uppercase text-[var(--muted)]">{c.label}</p>
            <p className={`disp mt-3 text-3xl font-extrabold ${c.color}`}>
              {stats ? c.value : (
                <span className="inline-block w-12 h-8 rounded bg-white/5 animate-pulse" />
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
