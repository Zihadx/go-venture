"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { getMuiTheme } from "@/theme/muiTheme";
import { useAppDispatch } from "@/redux/hooks";
import { setTheme } from "@/redux/slices/uiSlice";

export default function MuiThemeBridge({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useNextTheme();
  const dispatch = useAppDispatch();
  const [mounted, setMounted] = useState(false);

  // Avoids a hydration mismatch: next-themes only knows the real theme after
  // mount (it reads localStorage/system preference client-side).
  useEffect(() => setMounted(true), []);

  const mode = mounted && resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    dispatch(setTheme(mode));
  }, [mode, dispatch]);

  return <MuiThemeProvider theme={getMuiTheme(mode)}>{children}</MuiThemeProvider>;
}
