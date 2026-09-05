export default function ProductsLoading() {
  return (
    <div className="admin-page-enter">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="admin-skeleton h-7 w-32 mb-2" />
          <div className="admin-skeleton h-4 w-48" />
        </div>
        <div className="admin-skeleton h-9 w-32 rounded-full" />
      </div>

      {/* Search & filter skeleton */}
      <div className="flex gap-3 mb-6">
        <div className="admin-skeleton h-10 flex-1 rounded-xl" />
        <div className="admin-skeleton h-10 w-36 rounded-xl" />
      </div>

      {/* Table skeleton */}
      <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] overflow-hidden">
        <div className="p-4 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="admin-skeleton h-10 w-10 rounded-lg shrink-0" />
              <div className="flex-1">
                <div className="admin-skeleton h-4 w-32 mb-1" />
                <div className="admin-skeleton h-3 w-20" />
              </div>
              <div className="admin-skeleton h-5 w-16 rounded-full hidden sm:block" />
              <div className="admin-skeleton h-7 w-14 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
