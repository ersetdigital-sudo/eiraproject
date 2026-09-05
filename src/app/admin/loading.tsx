export default function AdminLoading() {
  return (
    <div className="admin-page-enter">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="admin-skeleton h-7 w-48 mb-2" />
        <div className="admin-skeleton h-4 w-64" />
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-6">
            <div className="admin-skeleton h-3 w-20 mb-3" />
            <div className="admin-skeleton h-8 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
