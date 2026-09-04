"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import "./katalog.css";

const PRODUCTS = [
  {
    n: "01",
    name: "Velocity Blaze",
    cat: "Drop 01 / 2026",
    glow: "g1",
    price: "Rp 195.000",
    img: "/images/7dd1f74e-653b-407e-8aa3-f3823b11c91b.png",
    desc: "A high-energy racing-inspired fantasy jersey featuring dynamic geometric graphics and a bold orange, pink and deep-purple palette.",
    views: [
      { v: "Front", src: "/images/7dd1f74e-653b-407e-8aa3-f3823b11c91b.png" },
      { v: "Side", src: "/images/c8f67d04-4a6f-4161-8b64-0a891f2ecf6c.png" },
      { v: "Back", src: "/images/0e87a677-1f67-48df-9ea2-37fb53f122eb.png" },
    ],
  },
  {
    n: "02",
    name: "Nebula Flux",
    cat: "Drop 01 / 2026",
    glow: "g2",
    price: "Rp 195.000",
    img: "/images/831017d0-f7a3-4c07-93d3-1256a5324375.png",
    desc: "A fluid marbled fantasy design built from deep plum, magenta and amber currents — a calm, cosmic take on the modern football kit.",
    views: [
      { v: "Front", src: "/images/831017d0-f7a3-4c07-93d3-1256a5324375.png" },
      { v: "Side", src: "/images/ba839273-f6c3-48f5-8abf-890ea3af9bae.png" },
      { v: "Back", src: "/images/673669a3-8bf2-43f6-ab38-db255d1bce96.png" },
    ],
  },
  {
    n: "03",
    name: "Golden Shards",
    cat: "Drop 01 / 2026",
    glow: "g3",
    price: "Rp 185.000",
    img: "/images/e83ab667-0ed9-4255-89b9-a0ed228f2730.png",
    desc: "Fractured amber and navy shards form a sharp, community-driven graphic language — loud on the pitch, disciplined up close.",
    views: [
      { v: "Front", src: "/images/e83ab667-0ed9-4255-89b9-a0ed228f2730.png" },
      { v: "Side", src: "/images/bbe4ccbc-ba73-4f91-a234-52263fb7e935.png" },
      { v: "Back", src: "/images/83e3e297-f8d9-4aab-be27-eca330e264a3.png" },
    ],
  },
];

const SIZES = [
  ["S", 56, 68],
  ["M", 58, 70],
  ["L", 60, 72],
  ["XL", 62, 74],
  ["2XL", 64, 76],
];

function waLink(p: (typeof PRODUCTS)[number], size: string | null) {
  const t = size
    ? "Halo Eira Project, saya tertarik dengan Fantasy Jersey — " + p.name + " ukuran " + size + ". Saya ingin mendapatkan informasi cara order."
    : "Halo Eira Project, saya tertarik dengan Fantasy Jersey — " + p.name + ". Saya ingin mendapatkan informasi ukuran dan cara order.";
  return "https://wa.me/6282299849418?text=" + encodeURIComponent(t);
}

export default function KatalogClient() {
  const [cur, setCur] = useState(0);
  const [view, setView] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [imgShown, setImgShown] = useState(true);
  const detailRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const product = PRODUCTS[cur];

  const paintSizes = useCallback(() => {
    return SIZES.map(([s]) => (
      <button key={s} className={`size-btn ${s === size ? "sel" : ""}`} data-s={s}>
        {s}
      </button>
    ));
  }, [size]);

  const render = useCallback(
    (i: number) => {
      const next = ((i % PRODUCTS.length) + PRODUCTS.length) % PRODUCTS.length;
      setCur(next);
      setView(0);
      setImgShown(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setImgShown(true));
      });
    },
    []
  );

  const openDetail = useCallback(
    (i: number) => {
      render(i);
      setDetailOpen(true);
      if (detailRef.current) detailRef.current.scrollTop = 0;
      document.body.style.overflow = "hidden";
    },
    [render]
  );

  const closeDetail = useCallback(() => {
    setDetailOpen(false);
    document.body.style.overflow = "";
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (guideOpen) {
        if (e.key === "Escape") setGuideOpen(false);
        return;
      }
      if (!detailOpen) return;
      if (e.key === "Escape") closeDetail();
      if (e.key === "ArrowRight") render(cur + 1);
      if (e.key === "ArrowLeft") render(cur - 1);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [detailOpen, guideOpen, cur, render, closeDetail]);

  // Deep link
  useEffect(() => {
    const fromHash = () => {
      const m = /^#design-(\d)$/.exec(location.hash);
      if (m) {
        const i = Math.min(Math.max(+m[1] - 1, 0), PRODUCTS.length - 1);
        openDetail(i);
      }
    };
    window.addEventListener("hashchange", fromHash);
    fromHash();
    return () => window.removeEventListener("hashchange", fromHash);
  }, [openDetail]);

  // IntersectionObserver for fade-in
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
    document.querySelectorAll(".fade").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Image transition
  useEffect(() => {
    if (!imgShown) {
      const t = requestAnimationFrame(() => setImgShown(true));
      return () => cancelAnimationFrame(t);
    }
  }, [imgShown, view, cur]);

  const p = product;

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b hair bg-[#090A0C]/85 backdrop-blur">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-14 flex items-center justify-between">
          <a href="/" className="eyebrow hover:text-[#F2F0EB] transition-colors">← Back</a>
          <div className="eyebrow text-[#F2F0EB]">Fantasy Collection</div>
          <div className="eyebrow hidden sm:block">Drop 01 / 2026</div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
        <div className="fade">
          <p className="eyebrow">Eira Project</p>
          <h1 className="display mt-4 text-[13vw] sm:text-[9vw] lg:text-[104px]">
            Fantasy<br className="sm:hidden" /> <span className="text-[#F2F0EB]">Collection</span>
          </h1>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <p className="text-[#92939A] text-sm md:text-base max-w-md leading-relaxed">
              Original fantasy designs.<br />New collection every month.
            </p>
            <p className="eyebrow text-[#C8A96B]">Drop 01 / 2026 — 3 Designs</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10"><div className="border-t hair"></div></div>

      {/* GRID */}
      <main className="mx-auto max-w-[1400px] px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-10 md:gap-y-16" id="grid">
          {PRODUCTS.map((p, i) => (
            <article
              key={i}
              className="item fade group cursor-pointer"
              data-i={i}
              style={{ transitionDelay: `${i * 90}ms` }}
              onClick={() => openDetail(i)}
            >
              <div className="shot aspect-[4/5] flex items-center justify-center">
                <div className={`glow ${p.glow}`}></div>
                <img src={p.img} alt={p.name} className="relative w-full h-full object-contain p-3 sm:p-5" />
              </div>
              <h3 className="display mt-4 md:mt-6 text-lg sm:text-2xl md:text-[28px]">{p.name}</h3>
              <div className="mt-3 md:mt-5 underline"></div>
              <button className="cta mt-3 md:mt-4 flex items-center gap-2 md:gap-3">View design <span>→</span></button>
            </article>
          ))}
        </div>
      </main>

      {/* CUSTOM CTA */}
      <section className="border-t hair bg-[#111214]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8 fade">
          <div>
            <p className="eyebrow">Beyond the collection</p>
            <h2 className="display mt-3 text-3xl md:text-4xl">Have your own concept?</h2>
            <p className="text-[#92939A] text-sm mt-3 max-w-sm">Custom design available outside the collection.</p>
          </div>
          <a href="https://wa.me/6282299849418?text=Halo%20Eira%20Project%2C%20saya%20ingin%20request%20custom%20design%20jersey." target="_blank" rel="noopener" className="ghost-btn inline-flex items-center gap-3 px-7 py-4 self-start">
            Request Custom Design →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t hair">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-8 flex flex-wrap gap-4 justify-between eyebrow">
          <span>Eira Project — Fantasy Jersey Specialist</span>
          <span>© 2026</span>
        </div>
      </footer>

      {/* DETAIL OVERLAY */}
      <div ref={detailRef} id="detail" className={detailOpen ? "open" : ""} aria-hidden={!detailOpen}>
        <div className="sticky top-0 z-10 border-b hair bg-[#090A0C]/90 backdrop-blur">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-14 flex items-center justify-between">
            <button data-close="" className="eyebrow hover:text-[#F2F0EB] transition-colors whitespace-nowrap" onClick={closeDetail}>
              <span className="sm:hidden">← Back</span>
              <span className="hidden sm:inline">← Back to collection</span>
            </button>
            <div className="eyebrow">{p.n} / 03</div>
            <div className="flex gap-4 sm:gap-5">
              <button data-prev="" className="eyebrow hover:text-[#C8A96B] transition-colors whitespace-nowrap" onClick={() => render(cur - 1)}>
                <span className="sm:hidden">←</span>
                <span className="hidden sm:inline">← Prev</span>
              </button>
              <button data-next="" className="eyebrow hover:text-[#C8A96B] transition-colors whitespace-nowrap" onClick={() => render(cur + 1)}>
                <span className="sm:hidden">→</span>
                <span className="hidden sm:inline">Next →</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10 pt-5 pb-28 md:py-14 lg:pb-16 grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-8 lg:gap-20 rise">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="shot aspect-[4/5] sm:aspect-square lg:aspect-[4/5] flex items-center justify-center">
              <div className={`glow ${p.glow}`}></div>
              <img
                src={p.views[view].src}
                alt={`${p.name} — ${p.views[view].v}`}
                className={`relative w-full h-full object-contain p-5 md:p-8 ${imgShown ? "shown" : ""}`}
              />
            </div>
            <div ref={thumbsRef} className="mt-2.5 grid grid-cols-3 gap-2.5" onClick={(e) => {
              const b = (e.target as HTMLElement).closest("[data-v]");
              if (!b) return;
              setView(Number(b.getAttribute("data-v")));
              setImgShown(false);
            }}>
              {p.views.map((v, j) => (
                <button key={j} className={`vthumb ${j === view ? "on" : ""}`} data-v={j}>
                  <img src={v.src} alt={`${p.name} ${v.v}`} />
                  <span>{v.v}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:pt-2">
            <p className="eyebrow">{p.cat}</p>
            <h2 className="display mt-3 text-[10vw] leading-[.95] sm:text-5xl lg:text-[56px]">{p.name}</h2>
            <p className="mt-4 text-[11px] tracking-[.22em] uppercase text-[#C8A96B]">Original Fantasy Design</p>
            <p className="mt-6 text-[#92939A] leading-relaxed text-[15px] max-w-lg">{p.desc}</p>

            <dl className="mt-9 border-t hair spec">
              <div><dt>Bahan</dt><dd>Milano Dryfit 220 gsm</dd></div>
              <div><dt>Pre-order</dt><dd>5–7 hari kerja</dd></div>
            </dl>

            <div className="mt-9 border-t hair pt-7">
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow">Size</p>
                <button data-guide="" className="guide-link" onClick={() => setGuideOpen(true)}>Size guide <span>›</span></button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2.5" onClick={(e) => {
                const b = (e.target as HTMLElement).closest("[data-s]");
                if (!b) return;
                const s = b.getAttribute("data-s");
                setSize(size === s ? null : s);
              }}>
                {paintSizes()}
              </div>
              <p className="mt-4 text-[12px] text-[#92939A] leading-relaxed">
                Toleransi ukuran bisa berbeda 1–3 cm karena proses produksi dan saat pencucian pertama.
              </p>
            </div>

            <div className="mt-9 border-t hair pt-7 hidden lg:block">
              <p className="eyebrow">Price</p>
              <p className="mt-2 text-[32px] font-semibold tracking-tight">{p.price}</p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a href={waLink(p, size)} target="_blank" rel="noopener" className="gold-btn px-9 py-4 text-center">
                  Order via WhatsApp →
                </a>
                <button data-close="" className="ghost-btn px-9 py-4" onClick={closeDetail}>Back to collection</button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile bottom bar */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-20 border-t hair bg-[#090A0C]/95 backdrop-blur px-5 py-3.5 flex items-center gap-4">
          <div className="shrink-0">
            <p className="eyebrow leading-none">Price</p>
            <p className="mt-1.5 text-lg font-semibold leading-none">{p.price}</p>
          </div>
          <a href={waLink(p, size)} target="_blank" rel="noopener" id="d-wa-m" className="gold-btn flex-1 px-3 py-4 text-center whitespace-nowrap">
            Order via WhatsApp →
          </a>
        </div>
      </div>

      {/* SIZE GUIDE MODAL */}
      <div id="guide" className={guideOpen ? "open" : ""} aria-hidden={!guideOpen}>
        <div className="guide-backdrop" onClick={() => setGuideOpen(false)}></div>
        <div className="guide-box">
          <div className="flex items-center justify-between gap-4 px-5 sm:px-6 h-14 border-b hair">
            <p className="eyebrow text-[#F2F0EB] whitespace-nowrap"><span className="sm:hidden">Size guide</span><span className="hidden sm:inline">Size guide</span></p>
            <button data-guide-close="" className="eyebrow hover:text-[#C8A96B] transition-colors whitespace-nowrap" onClick={() => setGuideOpen(false)}>Close ✕</button>
          </div>
          <div className="p-4 sm:p-6">
            <img src="/images/95920bf5-8b69-4d65-a55c-208496a51271.jpg" alt="Size chart Eira Project" className="w-full h-auto rounded-sm" />
            <p className="mt-4 text-[12px] text-[#92939A] leading-relaxed">
              Toleransi ukuran bisa berbeda 1–3 cm karena proses produksi dan saat pencucian pertama.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
