// Central RBAC configuration.
// When the real backend JWT is wired in, `role` here should match whatever
// string the token's `role` claim contains (case-sensitive).

export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  TRAVEL_AGENT: "TRAVEL_AGENT",
  CUSTOMER_SUPPORT: "CUSTOMER_SUPPORT",
  CUSTOMER: "CUSTOMER",
};

export const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]: "Super Admin",
  [ROLES.ADMIN]: "Admin",
  [ROLES.TRAVEL_AGENT]: "Travel Agent",
  [ROLES.CUSTOMER_SUPPORT]: "Customer Support",
  [ROLES.CUSTOMER]: "Customer",
};

// Tailwind-friendly color tokens per role, used for badges/avatars.
export const ROLE_COLORS = {
  [ROLES.SUPER_ADMIN]: { bg: "#071952", fg: "#ffffff" }, // Quaternary
  [ROLES.ADMIN]: { bg: "#2095ae", fg: "#ffffff" }, // primary
  [ROLES.TRAVEL_AGENT]: { bg: "#7A316F", fg: "#ffffff" }, // Quinary
  [ROLES.CUSTOMER_SUPPORT]: { bg: "#b59677", fg: "#ffffff" }, // tertiary
  [ROLES.CUSTOMER]: { bg: "#964834", fg: "#ffffff" }, // Senary
};

// Every routable dashboard module and which roles may open it.
// `status` lets us ship the nav item ahead of the module being fully built
// ("beta" / "soon") without ever faking access control.
export const MODULES = {
  overview: {
    label: "Overview",
    path: "/dashboard",
    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.TRAVEL_AGENT,
      ROLES.CUSTOMER_SUPPORT,
      ROLES.CUSTOMER,
    ],
    status: "live",
  },
  users: {
    label: "Users",
    path: "/dashboard/admin/users",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    status: "live",
  },
  bookings: {
    label: "Bookings",
    path: "/dashboard/admin/bookings",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.TRAVEL_AGENT, ROLES.CUSTOMER_SUPPORT],
    status: "live",
  },
  analytics: {
    label: "Analytics & Reports",
    path: "/dashboard/admin/analytics",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    status: "live",
  },
  tours: {
    label: "Packages & Tours",
    path: "/dashboard/admin/tours",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.TRAVEL_AGENT],
    status: "soon",
  },
  payments: {
    label: "Payments & Invoices",
    path: "/dashboard/admin/payments",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    status: "soon",
  },
  reviews: {
    label: "Reviews",
    path: "/dashboard/admin/reviews",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CUSTOMER_SUPPORT],
    status: "soon",
  },
  myTrips: {
    label: "My Trips",
    path: "/dashboard/customer/trips",
    roles: [ROLES.CUSTOMER],
    status: "live",
  },
  wishlist: {
    label: "Wishlist",
    path: "/dashboard/customer/wishlist",
    roles: [ROLES.CUSTOMER],
    status: "live",
  },
  support: {
    label: "Support Tickets",
    path: "/dashboard/support",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CUSTOMER_SUPPORT, ROLES.CUSTOMER],
    status: "live",
  },
  account: {
    label: "Account Settings",
    path: "/dashboard/account",
    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.TRAVEL_AGENT,
      ROLES.CUSTOMER_SUPPORT,
      ROLES.CUSTOMER,
    ],
    status: "live",
  },
  settings: {
    label: "System Settings",
    path: "/dashboard/admin/settings",
    roles: [ROLES.SUPER_ADMIN],
    status: "soon",
  },
};

// Sidebar grouping — purely presentational, references MODULES above.
export const NAV_SECTIONS = [
  { title: "Overview", items: ["overview"] },
  { title: "My Travel", items: ["myTrips", "wishlist"] },
  { title: "Operations", items: ["bookings", "tours", "payments"] },
  { title: "People", items: ["users", "reviews"] },
  { title: "Insights", items: ["analytics"] },
  { title: "Help", items: ["support"] },
  { title: "Account", items: ["account", "settings"] },
];

export function canAccess(role, moduleKey) {
  const mod = MODULES[moduleKey];
  if (!mod) return false;
  return mod.roles.includes(role);
}

// Given a pathname, find the closest matching module definition.
export function findModuleByPath(pathname) {
  const entries = Object.entries(MODULES).sort(
    (a, b) => b[1].path.length - a[1].path.length
  );
  const match = entries.find(
    ([, mod]) => pathname === mod.path || pathname.startsWith(mod.path + "/")
  );
  return match ? { key: match[0], ...match[1] } : null;
}
