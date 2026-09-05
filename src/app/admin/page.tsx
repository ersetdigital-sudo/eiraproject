import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getCount(table: string): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  if (error || count === null) return 0;
  return count;
}

export default async function AdminDashboard() {
  const [products, newCount, soldOutCount] = await Promise.all([
    getCount("products"),
    (async () => {
      const supabase = await createClient();
      const { count } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("badge", "NEW");
      return count ?? 0;
    })(),
    (async () => {
      const supabase = await createClient();
      const { count } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("badge", "SOLD OUT");
      return count ?? 0;
    })(),
  ]);

  const cards = [
    { label: "Total Produk", value: products, color: "text-[var(--ink)]" },
    { label: "Status NEW", value: newCount, color: "text-[var(--gold)]" },
    { label: "SOLD OUT", value: soldOutCount, color: "text-[var(--muted)]" },
  ];

  return (
    <div>
      <h1 className="text-xl font-extrabold uppercase tracking-tight text-[var(--ink)]">
        Dashboard
      </h1>
      <p className="mt-2 text-[12px] text-[var(--muted)]">Ringkasan data produk Eira Project</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-6">
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
