"use client";

import { useEffect } from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // TODO: forward to a real error-tracking service (Sentry, etc.) once wired up.
    console.error("Dashboard error boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-3 h-[60vh] text-center px-4">
      <div className="rounded-full bg-red-50 p-4 text-red-500">
        <ErrorOutlineOutlinedIcon fontSize="large" />
      </div>
      <h2 className="text-xl font-bold text-gray-800">Something went wrong loading this page</h2>
      <p className="text-gray-500 max-w-md">
        This is on us, not you. Try again, and if it keeps happening, use the feedback button to let us know.
      </p>
      <button onClick={reset} className="button-primary mt-2">Try again</button>
    </div>
  );
}
