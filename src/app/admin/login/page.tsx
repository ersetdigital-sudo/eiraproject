import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Login Admin — Eira Project",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-[#090A0C] px-4">
      {/* Subtle radial glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(200,169,107,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
