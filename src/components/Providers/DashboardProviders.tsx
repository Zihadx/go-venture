"use client";

import type { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ReduxProvider from "@/components/Providers/ReduxProvider";
import QueryProvider from "@/components/Providers/QueryProvider";
import MuiThemeBridge from "@/components/Providers/MuiThemeBridge";

// Deliberately scoped to the dashboard only. The public marketing site stays
// exactly as it was — no provider tree, no client-state dependency — per
// the standing instruction not to touch it.
//
// next-themes toggles a class on `document.documentElement` imperatively via
// DOM APIs at runtime rather than through the JSX tree, so mounting it here
// (instead of in the root layout) still works correctly — it doesn't need to
// literally wrap the <html> tag to control it.
export default function DashboardProviders({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <QueryProvider>
        <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="goventure-dashboard-theme">
          <MuiThemeBridge>{children}</MuiThemeBridge>
        </NextThemesProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
