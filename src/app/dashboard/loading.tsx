export default function DashboardLoading() {
  return (
    <div className="space-y-6 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
      <div className="h-72 rounded-xl bg-gray-100 animate-pulse" />
      <div className="h-64 rounded-xl bg-gray-100 animate-pulse" />
    </div>
  );
}
