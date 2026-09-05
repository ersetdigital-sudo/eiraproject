"use client";

import { useState, useEffect } from "react";
import Navbar1 from "@/components/blocks/navbar1";

interface ProductDetail {
  slug: string;
  name: string;
  description: string;
  price: string;
  mainImg: string;
  thumbs: { src: string; alt: string }[];
  prev: { slug: string; name: string };
  next: { slug: string; name: string };
}

const SIZES = ["S", "M", "L", "XL", "2XL"];

export default function ProductDetailClient({ product }: { product: ProductDetail }) {
  const [activeImg, setActiveImg] = useState(product.mainImg);
  const [activeSize, setActiveSize] = useState("M");
  const [showSizeChart, setShowSizeChart] = useState(false);

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

  const waLink = `https://wa.me/6282299849418?text=${encodeURIComponent(`Halo Eira Project! Saya tertarik dengan ${product.name} ukuran ${activeSize}. Boleh minta info harga & ukuran?`)}`;

  return (
    <>
      {/* ===== MOBILE LAYOUT ===== */}
      <div className="lg:hidden min-h-[100dvh] bg-[var(--bg)]">
        <Navbar1 onSizeGuide={() => setShowSizeChart(true)} />
        {/* Hero Image */}
        <div className="relative w-full aspect-[4/5] bg-[var(--bg)]">
          <img src={activeImg} alt={product.name} className="w-full h-full object-cover" />
          {/* Back button */}
          <a href="/" className="absolute top-12 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#090A0C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"></path></svg>
          </a>
          {/* Gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--bg)] to-transparent"></div>
        </div>

        {/* Thumbnails */}
        <div className="px-4 -mt-8 relative z-10">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {product.thumbs.map((t, i) => (
              <div
                key={i}
                className={`shrink-0 w-[72px] h-[72px] rounded-lg border p-[5px] transition${activeImg === t.src ? " border-[var(--gold)] opacity-100" : " border-[var(--line)] opacity-60"}`}
                onClick={() => setActiveImg(t.src)}
              >
                <img
                  className="w-full h-full object-cover rounded-[5px]"
                  src={t.src}
                  alt={t.alt}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content Card */}
        <div className="px-5 pt-5 pb-44">
          <p className="flex items-center gap-2 text-[10px] track uppercase text-[var(--muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]"></span> Desain Terbaru · Limited
          </p>

          <h1 className="disp mt-3 text-[28px] font-extrabold uppercase leading-[1.05]">
            {product.name}
          </h1>

          <p className="disp mt-3 text-[20px] font-bold">{product.price}</p>

          <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">
            {product.description}
          </p>

          {/* Size Section */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-[10px] track uppercase text-[var(--muted)]">Pilih Ukuran</p>
            <button type="button" className="text-[11px] track uppercase text-[var(--gold)]" onClick={() => setShowSizeChart(true)}>Size Guide ›</button>
          </div>
          <div className="mt-3 flex gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                className={`size flex-1 py-2.5 text-[11px] track uppercase text-center${activeSize === s ? " [data-active=true]" : ""}`}
                data-active={activeSize === s ? "true" : "false"}
                onClick={() => setActiveSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Specs */}
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[var(--line)] pt-4">
            <div><p className="text-[9px] track uppercase text-[var(--muted)]">Bahan</p><p className="mt-1 text-[12px]">Milano Dryfit</p></div>
            <div><p className="text-[9px] track uppercase text-[var(--muted)]">Produksi</p><p className="mt-1 text-[12px]">5–7 hari</p></div>
            <div><p className="text-[9px] track uppercase text-[var(--muted)]">Toleransi</p><p className="mt-1 text-[12px]">1–3 cm</p></div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="fixed bottom-0 inset-x-0 z-50 border-t border-[var(--line)] bg-[var(--bg)] px-5 py-3 pb-6">
          <a href={waLink} target="_blank" rel="noopener" className="flex items-center justify-between w-full rounded-2xl bg-[var(--ink)] px-5 py-3.5 text-[#090A0C]">
            <span className="text-[11px] track uppercase font-semibold">Order via WhatsApp</span>
            <span className="text-[13px] font-bold">{product.price}</span>
          </a>
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden lg:block">
        <Navbar1 onSizeGuide={() => setShowSizeChart(true)} />

        <main className="mx-auto max-w-6xl px-6 pt-10 pb-20">
          <p className="text-[10px] track uppercase text-[var(--muted)]">
            <a href="/" className="hover:text-[var(--ink)]">← Katalog</a> / Desain Terbaru / <span className="text-[var(--ink)]">{product.name}</span>
          </p>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16">
            <div>
              <div className="stage overflow-hidden">
                <img src={activeImg} alt={product.name} className="w-full aspect-square object-cover" />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.thumbs.map((t, i) => (
                  <img
                    key={i}
                    className={`thumb aspect-square w-full object-cover${activeImg === t.src ? " [data-active=true]" : ""}`}
                    data-active={activeImg === t.src ? "true" : "false"}
                    src={t.src}
                    alt={t.alt}
                    onClick={() => setActiveImg(t.src)}
                  />
                ))}
              </div>
            </div>

            <div className="lg:pt-2">
              <p className="flex items-center gap-2 text-[10px] track uppercase text-[var(--muted)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]"></span> Desain Terbaru · Limited
              </p>

              <h1 className="disp mt-5 text-4xl sm:text-5xl font-extrabold uppercase leading-[1.05]">
                {product.name.split(" ").map((w, i, arr) => (
                  <span key={i}>{w}{i < arr.length - 1 ? <br /> : ""}</span>
                ))}
              </h1>

              <p className="mt-6 max-w-md text-[13px] leading-relaxed text-[var(--muted)]">
                {product.description}
              </p>

              <p className="disp mt-7 text-3xl font-bold">{product.price}</p>

              <div className="mt-8 flex items-center justify-between gap-4">
                <p className="text-[10px] track uppercase text-[var(--muted)]">Pilih Ukuran</p>
                <button type="button" className="text-[11px] track uppercase text-[var(--gold)] hover:opacity-75 transition" onClick={() => setShowSizeChart(true)}>Size Guide <span>›</span></button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`size px-6 py-2.5 text-[11px] track uppercase${activeSize === s ? " [data-active=true]" : ""}`}
                    data-active={activeSize === s ? "true" : "false"}
                    onClick={() => setActiveSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="mt-7">
                <a href={waLink} target="_blank" rel="noopener" className="block w-full rounded-full bg-[var(--ink)] px-8 py-3.5 text-center text-[10px] track uppercase text-[#090A0C] transition hover:bg-[var(--gold)]">Order via WhatsApp →</a>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-6 border-t border-[var(--line)] pt-6">
                <div><p className="text-[9px] track uppercase text-[var(--muted)]">Bahan</p><p className="mt-2 text-[13px] text-[var(--ink)]">Milano Dryfit</p><p className="mt-1 text-[11px] text-[var(--muted)]">220 gsm</p></div>
                <div><p className="text-[9px] track uppercase text-[var(--muted)]">Produksi</p><p className="mt-2 text-[13px] text-[var(--ink)]">5–7 hari kerja</p><p className="mt-1 text-[11px] text-[var(--muted)]">Pre-order</p></div>
                <div><p className="text-[9px] track uppercase text-[var(--muted)]">Toleransi</p><p className="mt-2 text-[13px] text-[var(--ink)]">1–3 cm</p><p className="mt-1 text-[11px] text-[var(--muted)]">Cucian pertama</p></div>
              </div>
            </div>
          </div>

          <nav className="mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-8 border-t border-[var(--line)] pt-8">
            <a href={`/katalog/${product.prev.slug}`} className="group">
              <p className="text-[10px] track uppercase text-[var(--muted)]">← Sebelumnya</p>
              <p className="disp mt-2 text-lg font-bold uppercase group-hover:text-[var(--gold)] transition">{product.prev.name}</p>
            </a>
            <a href={`/katalog/${product.next.slug}`} className="group sm:text-right">
              <p className="text-[10px] track uppercase text-[var(--muted)]">Selanjutnya →</p>
              <p className="disp mt-2 text-lg font-bold uppercase group-hover:text-[var(--gold)] transition">{product.next.name}</p>
            </a>
          </nav>
        </main>

        <footer className="border-t border-[var(--line)]">
          <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="disp track text-[10px] uppercase text-[var(--muted)]">Eira Project — Fantasy Jersey</span>
            <span className="text-[10px] track uppercase text-[var(--muted)]">Made to order · Milano Dryfit</span>
          </div>
        </footer>
      </div>

      {/* SIZE GUIDE MODAL */}
      {showSizeChart && (
        <div className="fixed inset-0 z-80 flex items-center justify-center p-4" onClick={() => setShowSizeChart(false)}>
          <div className="absolute inset-0 bg-[#060708]/85 backdrop-blur-[6px]"></div>
          <div className="relative w-full max-w-[560px] max-h-[88vh] overflow-y-auto bg-[var(--panel)] border border-[var(--line)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-4 px-5 sm:px-6 h-14 border-b border-[var(--line)]">
              <p className="text-[11px] track uppercase text-[var(--ink)]">Size Guide</p>
              <button type="button" className="text-[11px] track uppercase text-[var(--gold)] hover:opacity-75 transition" onClick={() => setShowSizeChart(false)}>Close ✕</button>
            </div>
            <div className="p-4 sm:p-6">
              <img src="/images/893f43c0-c0d2-4f14-8103-6313203f5042.jpg" alt="Size chart Eira Project" className="w-full h-auto rounded-sm" />
              <p className="mt-4 text-[12px] text-[#92939A] leading-relaxed">
                Toleransi ukuran bisa berbeda 1–3 cm karena proses produksi dan saat pencucian pertama.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
