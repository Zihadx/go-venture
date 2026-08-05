import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

interface UiState {
  theme: Theme;
  unreadNotifications: number;
  sidebarOpen: boolean;
}

const initialState: UiState = {
  theme: "light",
  unreadNotifications: 3, // seeded to match the mock notifications already shown in DashNavbar
  sidebarOpen: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setUnreadNotifications(state, action: PayloadAction<number>) {
      state.unreadNotifications = action.payload;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { setTheme, toggleTheme, setUnreadNotifications, setSidebarOpen } = uiSlice.actions;
export default uiSlice.reducer;
