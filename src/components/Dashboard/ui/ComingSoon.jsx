import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";

export default function ComingSoon({ title, description, plannedFeatures = [] }) {
  return (
    <div className="flex flex-col items-center text-center max-w-lg mx-auto py-16 px-4">
      <div className="rounded-full bg-primary/10 text-primary p-4 mb-4">
        <ConstructionOutlinedIcon fontSize="large" />
      </div>
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-500 mt-2">{description}</p>
      {plannedFeatures.length > 0 && (
        <div className="mt-6 text-left w-full bg-white border border-gray-100 rounded-xl shadow-sm p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Planned for this module</p>
          <ul className="space-y-2">
            {plannedFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
