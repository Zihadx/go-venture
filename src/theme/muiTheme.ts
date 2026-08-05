import { createTheme, type Theme } from "@mui/material/styles";

// Mirrors the brand colors already defined in tailwind.config.js so MUI
// components (Table, Menu, TextField, Drawer...) feel like part of the same
// product instead of MUI's stock default theme.
const BRAND = {
  primary: "#2095ae",
  secondary: "#023f4e",
};

export function getMuiTheme(mode: "light" | "dark"): Theme {
  return createTheme({
    palette: {
      mode,
      primary: { main: BRAND.primary },
      secondary: { main: BRAND.secondary },
      background:
        mode === "dark"
          ? { default: "#0b1220", paper: "#111827" }
          : { default: "#f3f4f6", paper: "#ffffff" },
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: "inherit", // defer to the app's existing font, don't fight it
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: "none" }, // MUI's dark-mode paper gradient overlay looks muddy against our flat brand colors
        },
      },
    },
  });
}
