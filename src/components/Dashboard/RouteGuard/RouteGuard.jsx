"use client";

import { usePathname } from "next/navigation";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { findModuleByPath, ROLE_LABELS } from "@/config/roles";
import useCurrentUser from "@/hooks/useCurrentUser";

// Note on approach: this app authenticates with a JWT kept in localStorage
// rather than a cookie, so Next.js edge middleware (which can't read
// localStorage) can't gate these routes server-side. This component is the
// client-side equivalent — it runs before any protected page renders and
// blocks unauthorized roles outright. Once the real backend issues an
// httpOnly session cookie, this same role check belongs in `middleware.js`
// as well, as defense in depth.
export default function RouteGuard({ children }) {
  const pathname = usePathname();
  const { user, loading } = useCurrentUser();

  if (loading || !user) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-gray-400">
        Loading your dashboard…
      </div>
    );
  }

  const mod = findModuleByPath(pathname);
  const allowed = !mod || mod.roles.includes(user.role);

  if (!allowed) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-[60vh] text-center px-4">
        <div className="rounded-full bg-red-50 p-4 text-red-500">
          <LockOutlinedIcon fontSize="large" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">You don&apos;t have access to this page</h2>
        <p className="text-gray-500 max-w-md">
          {mod?.label || "This module"} is restricted to{" "}
          {mod?.roles.map((r) => ROLE_LABELS[r]).join(", ")}. You&apos;re signed in as{" "}
          <span className="font-semibold">{ROLE_LABELS[user.role]}</span>.
        </p>
      </div>
    );
  }

  return children;
}
