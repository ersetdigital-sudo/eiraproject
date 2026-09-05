"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Navbar1 from "@/components/blocks/navbar1";

interface Product {
  slug: string;
  name: string;
  badge: string;
  series: string;
  price: string;
  img: string;
  status: "available" | "sold";
  order: number;
}

const SORT_OPTIONS = [
  { value: "newest", label: "Terbaru" },
  { value: "oldest", label: "Terlama" },
  { value: "price-low", label: "Harga Terendah" },
  { value: "price-high", label: "Harga Tertinggi" },
  { value: "name-az", label: "Nama A-Z" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

function parsePrice(price: string): number {
  return parseInt(price.replace(/\D/g, ""), 10);
}

function sortProducts(products: Product[], sort: SortValue): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => a.order - b.order);
    case "oldest":
      return sorted.sort((a, b) => b.order - a.order);
    case "price-low":
      return sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    case "price-high":
      return sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    case "name-az":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

export default function KatalogClient({
  available: initialAvailable,
  soldOut: initialSoldOut,
}: {
  available: Product[];
  soldOut: Product[];
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortValue>("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [gridCols, setGridCols] = useState<1 | 2>(1);
  const sortRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(() => sortProducts(initialAvailable, sort), [initialAvailable, sort]);

  const activeLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Terbaru";

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    if (sortOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [sortOpen]);

  // Re-observe for reveal animation after sort change
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    }, 50);
    return () => { clearTimeout(timer); io.disconnect(); };
  }, [sort]);

  return (
    <>
      {/* HEADER */}
      <Navbar1 />

      {/* HERO */}
      <section>
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
          <p className="track text-[10px] uppercase text-[var(--muted)]">Koleksi Jersey Fantasy · {sorted.length + initialSoldOut.length} Desain</p>
          <h1 className="disp mt-4 text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-[var(--ink)]">Katalog</h1>
          <p className="mt-4 max-w-md text-[13px] leading-relaxed text-[var(--muted)]">
            Lihat semua desain jersey fantasy Eira Project.<br />
            Pilih desain yang kamu suka dan lihat detailnya.
          </p>
          <div className="mt-8 h-px w-full bg-[var(--line)]"></div>
        </div>
      </section>

      <main id="katalog" className="mx-auto max-w-6xl px-6 pb-24">
        {/* Sort Dropdown + Grid Toggle */}
        <div className="flex items-center justify-between -mt-2">
          {/* Grid toggle — mobile only */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              type="button"
              onClick={() => setGridCols(1)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${gridCols === 1 ? "text-[var(--gold)] bg-white/5" : "text-[var(--muted)] hover:text-[var(--ink)]"}`}
              aria-label="Tampilan 1 kolom"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="5" rx="1"/><rect x="3" y="10" width="18" height="5" rx="1"/><rect x="3" y="17" width="18" height="5" rx="1"/></svg>
            </button>
            <button
              type="button"
              onClick={() => setGridCols(2)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${gridCols === 2 ? "text-[var(--gold)] bg-white/5" : "text-[var(--muted)] hover:text-[var(--ink)]"}`}
              aria-label="Tampilan 2 kolom"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>
            </button>
          </div>

          <div ref={sortRef} className="relative ml-auto">
            <button
              type="button"
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-[10px] track uppercase text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--ink)] transition-colors cursor-pointer"
            >
              <span>Urutkan:</span>
              <span className="text-[var(--ink)]">{activeLabel}</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {sortOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-[0_16px_48px_rgba(0,0,0,.5)] overflow-hidden z-50">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setSort(opt.value);
                      setSortOpen(false);
                    }}
                    className={[
                      "w-full text-left px-4 py-2.5 text-[11px] transition-colors cursor-pointer",
                      sort === opt.value
                        ? "text-[var(--gold)] bg-white/5"
                        : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-white/5",
                    ].join(" ")}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* DESAIN TERBARU */}
        <div className="mt-10 flex items-end justify-between">
          <div>
            <h2 className="disp track-sm text-[13px] font-semibold uppercase">Desain Terbaru</h2>
            <p className="mt-2 text-[10px] track uppercase text-[var(--muted)]">{sorted.length} Desain</p>
          </div>
          <span className="text-[10px] track uppercase text-[var(--gold)]">Tersedia</span>
        </div>

        <div ref={gridRef} className={`mt-6 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 ${gridCols === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
          {sorted.map((p, i) => (
            <article
              key={p.slug}
              className="card group overflow-hidden reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="relative overflow-hidden rounded-t-[17px] bg-[var(--bg)]">
                <img src={p.img} alt={p.name} className="w-full aspect-[4/5] object-cover" />
                <span className="absolute left-3 sm:left-5 top-3 sm:top-5 rounded-full border border-[var(--line)] bg-black/50 px-2 sm:px-3 py-1 text-[8px] sm:text-[9px] track uppercase text-[var(--gold)]">{p.badge}</span>
              </div>
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-3 sm:pt-5">
                <h3 className="disp track-sm text-[11px] sm:text-[12px] font-semibold uppercase">{p.name}</h3>
                <p className="mt-2 sm:mt-3 text-[12px] sm:text-[13px] text-[var(--ink)]">{p.price}</p>
                <a href={`/katalog/${p.slug}`} className="cta-link mt-3 sm:mt-4 inline-flex items-center gap-2 text-[9px] sm:text-[10px] track uppercase text-[var(--gold)]">Lihat Detail →</a>
              </div>
            </article>
          ))}
        </div>

        {initialSoldOut.length > 0 && (
          <>
            <div className="mt-20 h-px w-full bg-[var(--line)]"></div>

            {/* KOLEKSI SEBELUMNYA */}
            <div className="mt-12 flex items-end justify-between">
              <div>
                <h2 className="disp track-sm text-[13px] font-semibold uppercase text-[var(--muted)]">Koleksi Sebelumnya</h2>
                <p className="mt-2 text-[10px] track uppercase text-[var(--muted)]">Sudah Habis · {initialSoldOut.length} Desain</p>
              </div>
            </div>

            <div className={`mt-6 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 ${gridCols === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
              {initialSoldOut.map((p, i) => (
                <article
                  key={p.slug}
                  className="card sold group overflow-hidden opacity-80"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="relative overflow-hidden rounded-t-[17px] bg-[var(--bg)]">
                    <img src={p.img} alt={p.name} className="w-full aspect-[4/5] object-cover" />
                    <span className="absolute left-5 top-5 rounded-full border border-[var(--line)] bg-black/60 px-3 py-1 text-[9px] track uppercase text-[var(--muted)]">Sold Out</span>
                  </div>
                  <div className="px-6 pb-6 pt-5">
                    <h3 className="disp track-sm text-[12px] font-semibold uppercase text-[var(--muted)]">{p.name}</h3>
                    <p className="mt-3 text-[13px] text-[var(--muted)] line-through">{p.price}</p>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="disp track text-[10px] uppercase text-[var(--muted)]">Eira Project — Fantasy Jersey</span>
          <span className="text-[10px] track uppercase text-[var(--muted)]">Made to order · Milano Dryfit</span>
        </div>
      </footer>
    </>
  );
}
