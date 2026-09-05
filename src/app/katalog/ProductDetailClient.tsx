"use client";

import { useState, useEffect } from "react";

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
      <header className="sticky top-0 z-30 border-b border-[#1b181f] bg-[#0a0a0a]/85 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <span className="disp track text-[11px] font-semibold uppercase">Eira Project</span>
          </a>
          <nav className="hidden md:flex items-center gap-9 text-[10px] track uppercase text-[var(--muted)]">
            <a href="/" className="text-[var(--ink)]">Katalog</a>
            <a href="#" className="hover:text-[var(--ink)] transition">Custom</a>
            <button type="button" className="hover:text-[var(--ink)] transition" onClick={() => setShowSizeChart(true)}>Size Guide</button>
            <a href="#" className="hover:text-[var(--ink)] transition">Tentang</a>
          </nav>
          <a href="#" className="rounded-full border border-[#2e2a34] px-5 py-2 text-[10px] track uppercase text-[var(--ink)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]">Pre-Order</a>
        </div>
      </header>

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
              <a href={waLink} target="_blank" rel="noopener" className="block w-full rounded-full bg-[var(--ink)] px-8 py-3.5 text-center text-[10px] track uppercase text-[#0a0a0a] transition hover:bg-[var(--gold)]">Order via WhatsApp →</a>
            </div>

            <div className="mt-9 grid grid-cols-3 gap-6 border-t border-[#1e1b23] pt-6">
              <div><p className="text-[9px] track uppercase text-[var(--muted)]">Bahan</p><p className="mt-2 text-[13px]">Milano Dryfit</p><p className="mt-1 text-[11px] text-[#6f6b74]">220 gsm</p></div>
              <div><p className="text-[9px] track uppercase text-[var(--muted)]">Produksi</p><p className="mt-2 text-[13px]">5–7 hari kerja</p><p className="mt-1 text-[11px] text-[#6f6b74]">Pre-order</p></div>
              <div><p className="text-[9px] track uppercase text-[var(--muted)]">Toleransi</p><p className="mt-2 text-[13px]">1–3 cm</p><p className="mt-1 text-[11px] text-[#6f6b74]">Cucian pertama</p></div>
            </div>
          </div>
        </div>

        <nav className="mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-8 border-t border-[#1e1b23] pt-8">
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

      <footer className="border-t border-[#1a171e]">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="disp track text-[10px] uppercase text-[var(--muted)]">Eira Project — Fantasy Jersey</span>
          <span className="text-[10px] track uppercase text-[#6f6b74]">Made to order · Milano Dryfit</span>
        </div>
      </footer>
      {/* SIZE GUIDE MODAL */}
      {showSizeChart && (
        <div className="fixed inset-0 z-80 flex items-center justify-center p-4" onClick={() => setShowSizeChart(false)}>
          <div className="absolute inset-0 bg-[#060708]/85 backdrop-blur-[6px]"></div>
          <div className="relative w-full max-w-[560px] max-h-[88vh] overflow-y-auto bg-[#111214] border border-[#292B30] transform transition-transform" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-4 px-5 sm:px-6 h-14 border-b border-[#292B30]">
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
