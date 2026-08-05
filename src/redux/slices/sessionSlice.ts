import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Mirrors the string values in src/config/roles.js (kept as JS — this is the
// TS-side type shadow of that runtime source of truth).
export type Role = "SUPER_ADMIN" | "ADMIN" | "TRAVEL_AGENT" | "CUSTOMER_SUPPORT" | "CUSTOMER";

export interface SessionUser {
  name: string;
  email: string;
  role: Role;
  source: "token" | "dev";
}

interface SessionState {
  user: SessionUser | null;
  loading: boolean;
}

const initialState: SessionState = {
  user: null,
  loading: true,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSessionUser(state, action: PayloadAction<SessionUser>) {
      state.user = action.payload;
      state.loading = false;
    },
    clearSession(state) {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setSessionUser, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
