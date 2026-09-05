"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        return;
      }
      window.location.href = next;
    });
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div
        className="rounded-2xl p-7 sm:p-9"
        style={{
          backgroundColor: "rgba(18, 20, 23, 0.95)",
          boxShadow:
            "0 32px 64px rgba(0,0,0,0.5), 0 12px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo & Title */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #C8A96B 0%, #a8894e 100%)",
            }}
          >
            <span className="text-lg font-extrabold text-[#090A0C] tracking-tight">
              EP
            </span>
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-[var(--ink)]">
              Eira Project
            </h1>
            <p className="text-xs text-[var(--muted)] mt-1">
              Admin Dashboard
            </p>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-[.22em] text-[var(--muted)] mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-[13px] text-[var(--ink)] placeholder-[var(--muted)] outline-none focus:border-[var(--gold)] transition-colors"
              placeholder="admin@eiraproject.id"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[.22em] text-[var(--muted)] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 pr-11 text-[13px] text-[var(--ink)] placeholder-[var(--muted)] outline-none focus:border-[var(--gold)] transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full py-3 rounded-full text-[11px] uppercase tracking-[.22em] font-bold transition-all duration-200 shadow-lg disabled:opacity-50 cursor-pointer mt-2"
            style={{
              background: "linear-gradient(135deg, #C8A96B 0%, #a8894e 100%)",
              color: "#090A0C",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(135deg, #a8894e 0%, #8a7040 100%)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(135deg, #C8A96B 0%, #a8894e 100%)")
            }
          >
            {pending ? "Masuk..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
