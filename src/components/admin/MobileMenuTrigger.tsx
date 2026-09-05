"use client";

export function MobileMenuTrigger() {
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
