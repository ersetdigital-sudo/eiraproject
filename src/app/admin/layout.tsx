import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { MobileMenuTrigger } from "@/components/admin/MobileMenuTrigger";
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
