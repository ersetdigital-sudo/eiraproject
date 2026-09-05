"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090A0C] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-[10px] track uppercase text-[var(--muted)]">Eira Project</h1>
          <p className="disp mt-3 text-2xl font-extrabold uppercase tracking-tight text-[var(--ink)]">
            Admin Dashboard
          </p>
          <p className="mt-3 text-[12px] text-[var(--muted)]">Masuk untuk mengelola produk</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] track uppercase text-[var(--muted)] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-[13px] text-[var(--ink)] placeholder-[var(--muted)] outline-none focus:border-[var(--gold)] transition-colors"
              placeholder="admin@eiraproject.id"
            />
          </div>
          <div>
            <label className="block text-[10px] track uppercase text-[var(--muted)] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-[13px] text-[var(--ink)] placeholder-[var(--muted)] outline-none focus:border-[var(--gold)] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[12px] text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[var(--gold)] px-6 py-3 text-[11px] track uppercase font-bold text-[#090A0C] hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
