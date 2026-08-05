const TREND_UP = "#0EA65F";
const TREND_DOWN = "#DC2626";

export default function StatCard({ icon, label, value, delta = undefined, accent = "#2095ae" }) {
  const isUp = typeof delta === "number" ? delta >= 0 : null;
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow duration-300">
      <div
        className="flex items-center justify-center rounded-lg p-3 shrink-0"
        style={{ backgroundColor: `${accent}1A`, color: accent }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{label}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 tabular-nums">{value}</h3>
          {isUp !== null && (
            <span
              className="text-xs font-semibold"
              style={{ color: isUp ? TREND_UP : TREND_DOWN }}
            >
              {isUp ? "▲" : "▼"} {Math.abs(delta)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
