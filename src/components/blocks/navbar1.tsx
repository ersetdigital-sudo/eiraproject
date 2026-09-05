"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Navbar1Props = {
  onSizeGuide?: () => void;
};

const NAV_LINKS = [
  { label: "Katalog", href: "/katalog" },
  { label: "Custom", href: "#" },
  { label: "Size Guide", href: "#size-guide" },
  { label: "Tentang", href: "#" },
];

export default function Navbar1({ onSizeGuide }: Navbar1Props) {
  const [activeLink, setActiveLink] = useState("Katalog");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative flex justify-center px-4 py-4">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "w-full max-w-5xl rounded-2xl border px-6 flex items-center h-[62px] gap-0 transition-all duration-300",
          "bg-[#121417] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.45)]",
          scrolled ? "shadow-2xl" : "",
        ].join(" ")}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mr-8 shrink-0">
          <span
            className="font-bold text-[20px] tracking-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Eira<span className="text-[#C8A96B]">\</span>Project
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center flex-1">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.05 * i + 0.15,
                duration: 0.35,
                ease: "easeOut",
              }}
              onClick={(e) => {
                setActiveLink(link.label);
                if (link.label === "Size Guide" && onSizeGuide) {
                  e.preventDefault();
                  onSizeGuide();
                }
              }}
              className={[
                "relative px-[13px] h-[62px] flex items-center text-[13.5px] transition-all duration-200 cursor-pointer whitespace-nowrap select-none",
                activeLink === link.label
                  ? "text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5",
              ].join(" ")}
            >
              {link.label}
              {activeLink === link.label && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-[13px] right-[13px] h-[2px] rounded-t-full bg-[#C8A96B]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {/* Pre-Order CTA */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.62 }}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="#"
              className="h-[34px] px-4 rounded-[10px] text-[13px] font-semibold flex items-center gap-[6px] transition-opacity duration-200 whitespace-nowrap bg-[#C8A96B] text-[#090A0C] hover:opacity-90"
            >
              Pre-Order
            </Link>
          </motion.div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="ml-auto md:hidden flex flex-col gap-[5px] justify-center items-center w-9 h-9 rounded-lg transition-colors text-white hover:bg-white/10"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
            className="block w-5 h-[1.5px] bg-white"
          />
          <motion.span
            animate={{ opacity: mobileOpen ? 0 : 1 }}
            className="block w-5 h-[1.5px] bg-white"
          />
          <motion.span
            animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
            className="block w-5 h-[1.5px] bg-white"
          />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[72px] left-4 right-4 rounded-2xl border p-4 flex flex-col gap-1 bg-[#121417] border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setActiveLink(link.label);
                  setMobileOpen(false);
                  if (link.label === "Size Guide" && onSizeGuide) {
                    e.preventDefault();
                    onSizeGuide();
                  }
                }}
                className={[
                  "px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200",
                  activeLink === link.label
                    ? "bg-white/5 text-[#C8A96B]"
                    : "text-white/60 hover:text-white hover:bg-white/6",
                ].join(" ")}
              >
                {link.label}
              </a>
            ))}

            <div className="my-2 h-px bg-white/10" />

            <div className="flex flex-col gap-2 mt-1 px-0">
              <Link
                href="#"
                className="h-10 px-4 rounded-[10px] text-[13px] font-semibold flex items-center gap-2 justify-center bg-[#C8A96B] text-[#090A0C]"
              >
                Pre-Order
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
