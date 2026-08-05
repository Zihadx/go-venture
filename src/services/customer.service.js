import { TRIP_CATALOG } from "@/services/mock/mockTrips";

const delay = (ms = 250) => new Promise((res) => setTimeout(res, ms));

/* -------------------------------- Wishlist -------------------------------- */
// Persisted in localStorage per email so it survives refreshes even without
// a backend. Swap for a real `/api/wishlist` call later — same signatures.

const wishlistKey = (email) => `goventure_wishlist_${email}`;

export async function getWishlist(email) {
  await delay(150);
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(wishlistKey(email));
  const ids = raw ? JSON.parse(raw) : [];
  return TRIP_CATALOG.filter((t) => ids.includes(t.id));
}

export async function isWishlisted(email, tripId) {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(wishlistKey(email));
  const ids = raw ? JSON.parse(raw) : [];
  return ids.includes(tripId);
}

export async function toggleWishlist(email, tripId) {
  await delay(150);
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(wishlistKey(email));
  const ids = raw ? JSON.parse(raw) : [];
  const exists = ids.includes(tripId);
  const next = exists ? ids.filter((id) => id !== tripId) : [...ids, tripId];
  localStorage.setItem(wishlistKey(email), JSON.stringify(next));
  return !exists; // returns new "is wishlisted" state
}

/* ---------------------------- Support tickets ---------------------------- */

let ticketsStore = [
  {
    id: "TCK-1001",
    subject: "Question about baggage allowance",
    message: "Does the Bali package include checked baggage, or is that an add-on?",
    customer: { name: "Tanvir Ahmed", email: "customer@go-venture.dev" },
    status: "open",
    priority: "normal",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    replies: [],
  },
  {
    id: "TCK-1002",
    subject: "Need to change travel dates",
    message: "Can I move my Maldives trip from next month to two months from now?",
    customer: { name: "Tanvir Ahmed", email: "customer@go-venture.dev" },
    status: "in_progress",
    priority: "high",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    replies: [
      { from: "support", text: "Looking into availability for your new dates now.", at: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString() },
    ],
  },
];

export async function getTickets({ email = null } = {}) {
  await delay(300);
  const rows = email ? ticketsStore.filter((t) => t.customer.email === email) : ticketsStore;
  return [...rows].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function createTicket({ subject, message, customer }) {
  await delay(300);
  const ticket = {
    id: `TCK-${1000 + ticketsStore.length + 1}`,
    subject,
    message,
    customer,
    status: "open",
    priority: "normal",
    createdAt: new Date().toISOString(),
    replies: [],
  };
  ticketsStore = [ticket, ...ticketsStore];
  return ticket;
}

export async function updateTicketStatus(id, status) {
  await delay(200);
  ticketsStore = ticketsStore.map((t) => (t.id === id ? { ...t, status } : t));
  return ticketsStore.find((t) => t.id === id);
}

export async function replyToTicket(id, text, from = "support") {
  await delay(200);
  ticketsStore = ticketsStore.map((t) =>
    t.id === id ? { ...t, replies: [...t.replies, { from, text, at: new Date().toISOString() }] } : t
  );
  return ticketsStore.find((t) => t.id === id);
}

/* --------------------------- Support analytics --------------------------- */

export async function getSupportAnalytics() {
  await delay(300);
  const byStatus = { open: 0, in_progress: 0, resolved: 0 };
  ticketsStore.forEach((t) => { byStatus[t.status] = (byStatus[t.status] || 0) + 1; });

  // Ticket volume over the last 7 days, bucketed by createdAt.
  const days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days.push({ key: d.toDateString(), label: d.toLocaleDateString("en-US", { weekday: "short" }) });
  }
  const volume = days.map(() => 0);
  ticketsStore.forEach((t) => {
    const key = new Date(t.createdAt).toDateString();
    const idx = days.findIndex((d) => d.key === key);
    if (idx !== -1) volume[idx] += 1;
  });

  const resolved = ticketsStore.filter((t) => t.status === "resolved");
  const avgReplies = ticketsStore.length
    ? Math.round((ticketsStore.reduce((sum, t) => sum + t.replies.length, 0) / ticketsStore.length) * 10) / 10
    : 0;

  return {
    total: ticketsStore.length,
    byStatus,
    trend: { labels: days.map((d) => d.label), volume },
    resolvedCount: resolved.length,
    avgRepliesPerTicket: avgReplies,
    highPriorityOpen: ticketsStore.filter((t) => t.priority === "high" && t.status !== "resolved").length,
  };
}
