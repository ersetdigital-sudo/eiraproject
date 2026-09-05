import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import "@/app/admin/admin.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "";

  const isAuthPage = pathname === "/admin/login";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isAuthPage) {
    redirect("/admin/login");
  }

  // Login page — no sidebar, no chrome
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="h-dvh bg-[#090A0C] overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <aside className="hidden md:block md:w-56 md:shrink-0 md:border-r md:border-[var(--line)] bg-[var(--panel)]">
          <AdminSidebar email={user?.email} />
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          {/* Mobile header */}
          <header className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-[var(--line)] bg-[var(--panel)]">
            <MobileMenuTrigger />
            <p className="text-[13px] font-bold uppercase text-[var(--ink)]">Eira Admin</p>
          </header>

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

function MobileMenuTrigger() {
  return (
    <button
      onClick={() => {
        const sidebar = document.getElementById("mobile-sidebar");
        const overlay = document.getElementById("mobile-overlay");
        if (sidebar) sidebar.style.transform = "translateX(0)";
        if (overlay) overlay.style.display = "block";
      }}
      className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--ink)] hover:bg-white/5 transition-colors cursor-pointer"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
  );
}
