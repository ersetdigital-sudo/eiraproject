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

        {/* Hero Image — rounded bottom, padded */}
        <div className="relative mx-4 mt-2 overflow-hidden rounded-b-[32px]">
          <div className="relative aspect-[4/5] bg-[var(--panel)]">
            <img src={activeImg} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {/* Gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--bg)] to-transparent"></div>
          {/* Back button — floating over hero */}
          <a href="/katalog" className="absolute top-12 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-md border border-white/40">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#090A0C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"></path></svg>
          </a>
        </div>

        {/* Thumbnails */}
        <div className="px-4 mt-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {product.thumbs.map((t, i) => (
              <div
                key={i}
                className={`shrink-0 w-[72px] h-[72px] rounded-xl border p-[5px] transition${activeImg === t.src ? " border-[var(--gold)] opacity-100" : " border-[var(--line)] opacity-60"}`}
                onClick={() => setActiveImg(t.src)}
              >
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={t.src}
                  alt={t.alt}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pt-5 pb-44">
          {/* Title row */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="disp text-[22px] font-extrabold uppercase leading-[1.1] text-[var(--ink)]">
                {product.name}
              </h1>
              <p className="mt-1 text-[11px] text-[var(--muted)]">Eira Project · Limited Edition</p>
            </div>
            <span className="shrink-0 rounded-full bg-[var(--gold)] px-3 py-1 text-[11px] font-bold text-[#090A0C]">NEW</span>
          </div>

          {/* Meta badges */}
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2.5">
            <span className="flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              5–7 hari
            </span>
            <span className="w-px h-3 bg-[var(--line)]"></span>
            <span className="flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.38 3.46L16 2 12 5.69 8 2l-4.38 1.46a2 2 0 00-1.34 1.87v14.34A2 2 0 004.62 21.54L8 20l4 3.69L16 20l4.38 1.54a2 2 0 002.34-1.87V5.33a2 2 0 00-1.34-1.87z"/></svg>
              Milano Dryfit
            </span>
            <span className="w-px h-3 bg-[var(--line)]"></span>
            <span className="flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              Free Ongkir
            </span>
          </div>

          {/* Price + Size row */}
          <div className="mt-5 flex items-end justify-between border-b border-[var(--line)] pb-4">
            <div>
              <p className="text-[10px] track uppercase text-[var(--muted)]">Harga</p>
              <p className="disp mt-1 text-[26px] font-extrabold leading-none text-[var(--ink)]">{product.price}</p>
            </div>
            <div className="text-right">
              <button type="button" className="text-[11px] track uppercase text-[var(--gold)]" onClick={() => setShowSizeChart(true)}>Size Guide ›</button>
            </div>
          </div>

          {/* Size Section */}
          <div className="mt-4">
            <p className="text-[10px] track uppercase text-[var(--muted)] mb-2">Pilih Ukuran</p>
            <div className="flex gap-2">
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
          </div>

          {/* Description */}
          <div className="mt-5">
            <p className="text-[13px] font-bold text-[var(--ink)] mb-1.5">Deskripsi</p>
            <p className="text-[12px] leading-relaxed text-[var(--muted)]">
              {product.description}
            </p>
          </div>

          {/* Specs */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-center">
              <p className="text-[9px] track uppercase text-[var(--muted)]">Bahan</p>
              <p className="mt-1 text-[11px] font-semibold text-[var(--ink)]">Milano Dryfit</p>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-center">
              <p className="text-[9px] track uppercase text-[var(--muted)]">Produksi</p>
              <p className="mt-1 text-[11px] font-semibold text-[var(--ink)]">5–7 hari</p>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-center">
              <p className="text-[9px] track uppercase text-[var(--muted)]">Toleransi</p>
              <p className="mt-1 text-[11px] font-semibold text-[var(--ink)]">1–3 cm</p>
            </div>
          </div>
        </div>

        {/* Sticky Footer CTA — wireframe style */}
        <div className="fixed bottom-0 inset-x-0 z-50 border-t border-[var(--line)] bg-[#121417]/95 backdrop-blur-md px-5 py-3 pb-6">
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <p className="text-[9px] track uppercase text-[var(--muted)]">Total</p>
              <p className="disp text-[18px] font-extrabold leading-none text-[var(--gold)]">{product.price}</p>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener"
              className="flex-1 flex items-center justify-center gap-2 h-12 rounded-full bg-[var(--gold)] text-[#090A0C] text-[13px] font-bold shadow-[0_4px_20px_rgba(200,169,107,.35)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden lg:block">
        <Navbar1 onSizeGuide={() => setShowSizeChart(true)} />

        <main className="mx-auto max-w-6xl px-6 pt-10 pb-20">
          <p className="text-[10px] track uppercase text-[var(--muted)]">
            <a href="/katalog" className="hover:text-[var(--ink)]">← Katalog</a> / Desain Terbaru / <span className="text-[var(--ink)]">{product.name}</span>
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
