"use client";

import { useEffect, useState, useCallback } from "react";
import { authKey } from "@/constants/authKey";
import { getFromLocalStorage } from "@/utils/localStorage/local.storage";
import { decodedToken } from "@/utils/jwt/jwt";
import { ROLES } from "@/config/roles";

export const DEV_ROLE_KEY = "goventure_dev_role";

const DEV_USERS = {
  [ROLES.SUPER_ADMIN]: {
    name: "Nur Zihad",
    email: "superadmin@go-venture.dev",
    role: ROLES.SUPER_ADMIN,
  },
  [ROLES.ADMIN]: {
    name: "Ayesha Rahman",
    email: "admin@go-venture.dev",
    role: ROLES.ADMIN,
  },
  [ROLES.TRAVEL_AGENT]: {
    name: "Kamal Hossain",
    email: "agent@go-venture.dev",
    role: ROLES.TRAVEL_AGENT,
  },
  [ROLES.CUSTOMER_SUPPORT]: {
    name: "Farhana Akter",
    email: "support@go-venture.dev",
    role: ROLES.CUSTOMER_SUPPORT,
  },
  [ROLES.CUSTOMER]: {
    name: "Tanvir Ahmed",
    email: "customer@go-venture.dev",
    role: ROLES.CUSTOMER,
  },
};

/**
 * Resolves the signed-in user for dashboard purposes.
 *
 * Real flow (once the backend is wired): decodes the JWT stored under
 * `authKey` and trusts its `role` claim.
 *
 * Dev/demo flow (today, no live backend): falls back to a role picked via
 * the RoleSwitcher, persisted in localStorage, purely so every dashboard can
 * be reviewed without five separate logins. This fallback never runs once a
 * real token is present.
 */
export default function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const resolve = useCallback(() => {
    const token = getFromLocalStorage(authKey);
    if (token) {
      try {
        const payload = decodedToken(token);
        setUser({
          name: payload.name || payload.fullName || "Account",
          email: payload.email,
          role: (payload.role || ROLES.CUSTOMER).toUpperCase(),
          source: "token",
        });
        setLoading(false);
        return;
      } catch (err) {
        // fall through to dev role
      }
    }

    const devRole =
      (typeof window !== "undefined" && localStorage.getItem(DEV_ROLE_KEY)) ||
      ROLES.SUPER_ADMIN;
    setUser({ ...DEV_USERS[devRole], source: "dev" });
    setLoading(false);
  }, []);

  useEffect(() => {
    resolve();
    const onStorage = (e) => {
      if (e.key === DEV_ROLE_KEY || e.key === authKey) resolve();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("goventure:role-changed", resolve);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("goventure:role-changed", resolve);
    };
  }, [resolve]);

  const setDevRole = (role) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(DEV_ROLE_KEY, role);
    window.dispatchEvent(new Event("goventure:role-changed"));
  };

  return { user, loading, setDevRole };
}
