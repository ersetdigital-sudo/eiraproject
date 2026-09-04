import PageScripts from "@/components/PageScripts";

export default function Home() {
  return (
    <>
      <main className="relative z-10 mx-auto w-full max-w-[440px] px-6 pt-14 pb-10 flex flex-col items-center text-center">
        <div className="avatar-wrap reveal" data-delay="0">
          <div className="avatar-ring">
            <span className="avatar-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/6e97a62b-51e6-4309-80b4-4b1b3de5ae73.jpg"
                alt="Logo Eira Project"
                width="132"
                height="132"
                decoding="async"
              />
            </span>
          </div>
        </div>

        <h1
          className="display reveal mt-6 flex items-center justify-center gap-2 text-[30px] font-extrabold uppercase tracking-tight"
          data-delay="80"
        >
          Eira Project
          <svg
            className="w-6 h-6 shrink-0"
            viewBox="0 0 24 24"
            role="img"
            aria-label="Verified"
          >
            <defs>
              <linearGradient id="vg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffd34d"></stop>
                <stop offset="45%" stopColor="#ff8a1f"></stop>
                <stop offset="75%" stopColor="#ff3d9a"></stop>
                <stop offset="100%" stopColor="#a855f7"></stop>
              </linearGradient>
            </defs>
            <path
              fill="url(#vg)"
              d="M12 1.6l2.5 2.1 3.2-.3.9 3.1 2.7 1.8-1.4 2.9 1.4 2.9-2.7 1.8-.9 3.1-3.2-.3L12 22.4l-2.5-2.1-3.2.3-.9-3.1-2.7-1.8L4.1 12.8 2.7 9.9l2.7-1.8.9-3.1 3.2.3z"
            ></path>
            <path
              fill="#0a0a0a"
              d="M10.8 15.4l-3-3 1.3-1.3 1.7 1.7 4.1-4.1 1.3 1.3z"
            ></path>
          </svg>
        </h1>

        <p
          className="display reveal mt-2 text-[13px] font-bold uppercase tracking-[0.18em] grad-text"
          data-delay="140"
        >
          Fantasy Jersey Specialist
        </p>

        <p
          className="reveal mt-4 text-[14.5px] leading-relaxed text-neutral-400"
          data-delay="200"
        >
          <span className="block text-neutral-200">
            Jersey fantasy dengan desain eksklusif.
          </span>
          <span className="block">Koleksi baru setiap bulan.</span>
        </p>
        <p
          className="reveal mt-6 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-neutral-300"
          data-delay="240"
        >
          Designed by Eira Project
        </p>

        <nav className="w-full mt-8 flex flex-col gap-4">
          <a
            className="btn btn-primary reveal"
            data-delay="260"
            id="wa-cta"
            href="https://wa.me/6282299849418?text=Halo%20Eira%20Project!%20Saya%20mau%20order%20jersey%20custom.%0A%0A%E2%80%A2%20Jenis%3A%20(Team%2FRacing%2FFootball%2FCommunity)%0A%E2%80%A2%20Jumlah%3A%0A%E2%80%A2%20Ukuran%3A%0A%E2%80%A2%20Nama%20%26%20nomor%20punggung%3A%0A%E2%80%A2%20Referensi%20desain%3A%0A%0AMinta%20info%20harga%20%26%20estimasi%20pengerjaannya%20ya."
            target="_blank"
            rel="noopener"
          >
            <svg
              className="ico"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.5 12a8.5 8.5 0 01-12.7 7.4L3.5 20.5l1.1-4.3A8.5 8.5 0 1120.5 12z"></path>
              <path d="M9 8.2c.3 0 .5.1.6.4l.7 1.6-.7.9c.6 1.2 1.4 2 2.6 2.6l.9-.7 1.6.7c.3.1.4.3.4.6 0 1-.8 1.7-1.8 1.7-3 0-6.1-3.1-6.1-6.1 0-1 .8-1.7 1.8-1.7z"></path>
            </svg>
            <span className="flex-1 text-left">Order via WhatsApp</span>
            <svg
              className="ico chev"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6"></path>
            </svg>
          </a>

          <a
            className="btn btn-ghost btn-feature reveal"
            data-delay="320"
            href="/katalog"
          >
            <svg
              className="ico"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#ig)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="ig" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffd34d"></stop>
                  <stop offset="40%" stopColor="#ff8a1f"></stop>
                  <stop offset="72%" stopColor="#ff3d9a"></stop>
                  <stop offset="100%" stopColor="#a855f7"></stop>
                </linearGradient>
              </defs>
              <path d="M9.2 4.4L6.3 5.9 3.9 8.5l2.3 2.1 1.5-1.3v10.3h8.6V9.3l1.5 1.3 2.3-2.1-2.4-2.6-2.9-1.5c-.7 1.4-1.7 2-3 2s-2.3-.6-3-2z"></path>
              <path d="M10.4 12.6h3.2M10.4 15.4h3.2"></path>
            </svg>
            <span className="flex-1 text-left">Explore Fantasy Collection</span>
            <svg
              className="ico chev"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6"></path>
            </svg>
          </a>

          <a
            className="btn btn-ghost reveal"
            data-delay="380"
            href="[LINK_TESTIMONI]"
            target="_blank"
            rel="noopener"
          >
            <svg
              className="ico"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3.2l2.6 5.3 5.9.85-4.25 4.15 1 5.9L12 16.6l-5.25 2.8 1-5.9L3.5 9.35l5.9-.85z"></path>
            </svg>
            <span className="flex-1 text-left">Testimoni Pelanggan</span>
            <svg
              className="ico chev"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6"></path>
            </svg>
          </a>

          <a
            className="btn btn-ghost reveal"
            data-delay="440"
            href="https://instagram.com/eira.projectt"
            target="_blank"
            rel="noopener"
          >
            <svg
              className="ico"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5"></rect>
              <circle cx="12" cy="12" r="4"></circle>
              <circle
                cx="17.2"
                cy="6.8"
                r="1.1"
                fill="currentColor"
                stroke="none"
              ></circle>
            </svg>
            <span className="flex-1 text-left">
              Follow Instagram{" "}
              <span className="text-neutral-500 font-normal">@eira.projectt</span>
            </span>
            <svg
              className="ico chev"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6"></path>
            </svg>
          </a>
        </nav>

        <ul
          className="reveal mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-light uppercase tracking-[0.22em] text-neutral-500"
          data-delay="500"
        >
          <li>✓ Nama &amp; nomor gratis</li>
          <li>✓ Desain eksklusif</li>
          <li>✓ Fast response</li>
        </ul>

        <div
          className="reveal mt-9 h-px w-24 opacity-40"
          style={{ background: "var(--grad)" }}
          data-delay="540"
        ></div>

        <footer className="reveal mt-5 text-[11.5px] text-neutral-600" data-delay="580">
          © 2026 Eira Project · Fantasy Jersey Specialist
        </footer>
      </main>

      <PageScripts />
    </>
  );
}
