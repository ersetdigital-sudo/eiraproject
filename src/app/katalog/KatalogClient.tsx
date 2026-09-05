"use client";

import { useState, useEffect, useRef } from "react";

const PRODUCTS = [
  {
    slug: "velocity-blaze",
    name: "Velocity Blaze",
    badge: "New",
    series: "Racing Series",
    price: "Rp 195.000",
    img: "/images/e4859694-55d7-4fc5-8941-befeb46d1fde.png",
    status: "available" as const,
  },
  {
    slug: "nebula-flux",
    name: "Nebula Flux",
    badge: "New",
    series: "Football Series",
    price: "Rp 195.000",
    img: "/images/db45a9f9-af41-4cad-9611-6d2be74937af.png",
    status: "available" as const,
  },
  {
    slug: "golden-shards",
    name: "Golden Shards",
    badge: "New",
    series: "Community Series",
    price: "Rp 195.000",
    img: "/images/75c59814-6786-48b7-a111-d846c580a0a2.png",
    status: "available" as const,
  },
];

const SOLD_OUT = [
  { name: "Aurora Drift", price: "Rp 195.000", img: "/images/9ac8e2ce-b1f6-4853-b56b-cd1e90a70d2d.png" },
  { name: "Ember Tide", price: "Rp 195.000", img: "/images/db45a9f9-af41-4cad-9611-6d2be74937af.png" },
  { name: "Solar Rift", price: "Rp 195.000", img: "/images/75c59814-6786-48b7-a111-d846c580a0a2.png" },
  { name: "Violet Storm", price: "Rp 195.000", img: "/images/5a185889-bc31-46c1-9cb5-7d795094036b.png" },
  { name: "Midnight Prism", price: "Rp 195.000", img: "/images/9ac8e2ce-b1f6-4853-b56b-cd1e90a70d2d.png" },
  { name: "Frost Sigil", price: "Rp 195.000", img: "/images/db45a9f9-af41-4cad-9611-6d2be74937af.png" },
];

export default function KatalogClient() {
  const [search, setSearch] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-[#1b181f] bg-[#0a0a0a]/85 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/images/5e21403a-2272-41f3-8998-91afe658fb87.png" alt="Eira Project" className="h-7 w-7 rounded-full" />
            <span className="disp track text-[11px] font-semibold uppercase">Eira Project</span>
          </a>
          <nav className="hidden md:flex items-center gap-9 text-[10px] track uppercase text-[var(--muted)]">
            <a href="/katalog" className="text-[var(--ink)]">Katalog</a>
            <a href="#" className="hover:text-[var(--ink)] transition">Size Guide</a>
            <a href="#" className="hover:text-[var(--ink)] transition">Tentang</a>
          </nav>
          <label className="flex items-center gap-2 rounded-full border border-[#232027] bg-[#121016] px-4 py-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8b8790" strokeWidth="2"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.2-3.2"></path></svg>
            <input
              placeholder="Cari desain..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-24 sm:w-40 bg-transparent text-[11px] text-[var(--ink)] placeholder-[#6f6b74] outline-none"
            />
          </label>
        </div>
      </header>

      {/* HERO */}
      <section className="glow">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
          <p className="track text-[10px] uppercase text-[var(--muted)]">Koleksi Jersey Fantasy · 24 Desain</p>
          <h1 className="disp mt-4 text-4xl sm:text-5xl font-extrabold uppercase tracking-tight">Katalog</h1>
          <p className="mt-4 max-w-md text-[13px] leading-relaxed text-[var(--muted)]">
            Lihat semua desain jersey fantasy Eira Project.<br />
            Pilih desain yang kamu suka dan lihat detailnya.
          </p>
          <div className="mt-8 h-px w-full bg-[#1e1b23]"></div>
        </div>
      </section>

      <main id="katalog" className="mx-auto max-w-6xl px-6 pb-24">
        {/* Sort */}
        <div className="flex items-center justify-end -mt-2">
          <div className="flex items-center gap-2 rounded-full border border-[#232027] px-4 py-2 text-[10px] track uppercase text-[var(--muted)]">
            <span>Urut:</span><span className="text-[var(--ink)]">Terbaru</span>
          </div>
        </div>

        {/* DESAIN TERBARU */}
        <div className="mt-10 flex items-end justify-between">
          <div>
            <h2 className="disp track-sm text-[13px] font-semibold uppercase">Desain Terbaru</h2>
            <p className="mt-2 text-[10px] track uppercase text-[var(--muted)]">{PRODUCTS.length} Desain</p>
          </div>
          <span className="text-[10px] track uppercase text-[var(--gold)]">Tersedia</span>
        </div>

        <div ref={gridRef} className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PRODUCTS.map((p, i) => (
            <article
              key={p.slug}
              className="card group overflow-hidden reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="relative overflow-hidden rounded-t-[17px] bg-[#0d0b10]">
                <img src={p.img} alt={p.name} className="w-full aspect-[4/5] object-cover" />
                <span className="absolute left-5 top-5 rounded-full border border-[#3a3440] bg-black/50 px-3 py-1 text-[9px] track uppercase text-[var(--gold)]">{p.badge}</span>
              </div>
              <div className="px-6 pb-6 pt-5">
                <h3 className="disp track-sm text-[12px] font-semibold uppercase">{p.name}</h3>
                <p className="mt-3 text-[13px] text-[var(--ink)]">{p.price}</p>
                <a href={`/katalog/${p.slug}`} className="cta-link mt-4 inline-flex items-center gap-2 text-[10px] track uppercase text-[var(--gold)]">Lihat Detail →</a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 h-px w-full bg-[#1a171e]"></div>

        {/* KOLEKSI SEBELUMNYA */}
        <div className="mt-12 flex items-end justify-between">
          <div>
            <h2 className="disp track-sm text-[13px] font-semibold uppercase text-[var(--muted)]">Koleksi Sebelumnya</h2>
            <p className="mt-2 text-[10px] track uppercase text-[#6f6b74]">Sudah Habis · {SOLD_OUT.length} Desain</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SOLD_OUT.map((p, i) => (
            <article
              key={p.name}
              className="card sold group overflow-hidden opacity-80"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="relative overflow-hidden rounded-t-[17px] bg-[#0c0a0e]">
                <img src={p.img} alt={p.name} className="w-full aspect-[4/5] object-cover" />
                <span className="absolute left-5 top-5 rounded-full border border-[#2a262f] bg-black/60 px-3 py-1 text-[9px] track uppercase text-[#8b8790]">Sold Out</span>
              </div>
              <div className="px-6 pb-6 pt-5">
                <h3 className="disp track-sm text-[12px] font-semibold uppercase text-[var(--muted)]">{p.name}</h3>
                <p className="mt-3 text-[13px] text-[#6f6b74] line-through">{p.price}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4">
          <a href="#" className="rounded-full border border-[#2e2a34] px-8 py-3 text-[10px] track uppercase text-[var(--ink)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]">Muat 9 Desain Lagi</a>
          <p className="text-[10px] track uppercase text-[#6f6b74]">Menampilkan 9 dari 24 desain</p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#1a171e]">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="disp track text-[10px] uppercase text-[var(--muted)]">Eira Project — Fantasy Jersey</span>
          <span className="text-[10px] track uppercase text-[#6f6b74]">Made to order · Milano Dryfit</span>
        </div>
      </footer>
    </>
  );
}
