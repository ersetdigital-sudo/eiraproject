"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { createClient } from "@/lib/supabase/client";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  },
  {
    href: "/admin/products",
    label: "Produk",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  },
];

export function AdminSidebar({ email }: { email?: string | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function signOut() {
    startTransition(async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      window.location.href = "/admin/login";
    });
  }

  return (
    <div className="flex flex-col h-full">
      {/* Brand header */}
      <div className="px-5 py-6 border-b border-[var(--line)]">
        <p className="text-[10px] uppercase tracking-[.22em] text-[var(--muted)]">Eira Project</p>
        <p className="mt-1 text-[13px] font-bold uppercase text-[var(--ink)]">Admin</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={active ? "true" : "false"}
              className={`admin-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-[12px] ${
                active
                  ? "bg-white/5 text-[var(--gold)]"
                  : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-white/5"
              }`}
            >
              {item.icon}
              <span className="uppercase tracking-[.22em]">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User profile + sign out */}
      <div className="px-3 py-4 border-t border-[var(--line)]">
        <div className="flex items-center p-2 bg-[var(--bg)] rounded-lg border border-[var(--line)]">
          <div className="w-8 h-8 rounded-lg bg-[var(--gold)] flex items-center justify-center shrink-0">
            <span className="text-[#090A0C] font-bold text-[12px]">
              {(email?.[0] ?? "A").toUpperCase()}
            </span>
          </div>
          <div className="ml-2 flex-1 overflow-hidden">
            <p className="text-[12px] text-[var(--ink)] font-bold truncate">
              {email ?? "Admin"}
            </p>
            <p className="text-[10px] text-[var(--muted)] truncate">Administrator</p>
          </div>
          <button
            type="button"
            onClick={signOut}
            disabled={pending}
            aria-label="Keluar"
            className="p-1.5 text-[var(--muted)] hover:text-red-400 transition-colors disabled:opacity-40 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
