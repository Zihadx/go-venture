// Deterministic mock data generator.
// Swap `dashboard.service.js` to hit the real Mongoose API and this file
// (and the rest of /services/mock) can be deleted wholesale — nothing
// outside /services imports from here directly.

const FIRST_NAMES = [
  "Ayesha", "Kamal", "Farhana", "Tanvir", "Nusrat", "Rafiq", "Sadia", "Imran",
  "Meherun", "Shakil", "Rumana", "Zahid", "Nabila", "Arif", "Sultana", "Habib",
  "Tasnim", "Mehedi", "Jannatul", "Rakib", "Sabrina", "Sohel", "Farzana", "Nayeem",
  "Ishrat", "Tarek", "Lubna", "Faisal", "Anika", "Rasel",
];
const LAST_NAMES = [
  "Rahman", "Hossain", "Akter", "Ahmed", "Islam", "Chowdhury", "Karim", "Khan",
  "Sultana", "Alam", "Uddin", "Begum", "Siddique", "Bhuiyan", "Haque",
];
const DESTINATIONS = [
  { city: "Guilin", country: "China" },
  { city: "Tokyo", country: "Japan" },
  { city: "Male", country: "Maldives" },
  { city: "Ocho Rios", country: "Jamaica" },
  { city: "Khulna", country: "Bangladesh" },
  { city: "Bali", country: "Indonesia" },
  { city: "Istanbul", country: "Turkiye" },
  { city: "Cape Town", country: "South Africa" },
  { city: "Queenstown", country: "New Zealand" },
  { city: "Reykjavik", country: "Iceland" },
];
const PACKAGES = [
  "Explorer Package", "Family Getaway", "Honeymoon Special", "Adventure Trail",
  "Luxury Escape", "Budget Backpacker", "Cultural Heritage Tour", "Beach & Island Hop",
];
const AGENTS = ["Kamal Hossain", "Rumana Islam", "Shakil Ahmed", "Sabrina Khan"];

// Small seeded PRNG so every server render + client hydration produces the
// exact same "random" dataset (avoids React hydration mismatches).
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(20260802);
const pick = (arr) => arr[Math.floor(rng() * arr.length)];
const int = (min, max) => Math.floor(rng() * (max - min + 1)) + min;
const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};
const daysFromNow = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
};

const USER_ROLES = ["CUSTOMER", "TRAVEL_AGENT", "CUSTOMER_SUPPORT", "ADMIN"];
const USER_STATUSES = ["active", "active", "active", "suspended", "pending"];

function buildUsers(count) {
  const users = [];
  for (let i = 1; i <= count; i++) {
    const first = pick(FIRST_NAMES);
    const last = pick(LAST_NAMES);
    const role = i <= 3 ? "ADMIN" : i <= 8 ? "TRAVEL_AGENT" : i <= 12 ? "CUSTOMER_SUPPORT" : pick(USER_ROLES);
    users.push({
      id: `USR-${1000 + i}`,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@gmail.com`,
      phone: `+8801${int(300000000, 999999999)}`,
      role,
      status: pick(USER_STATUSES),
      location: pick(["Dhaka", "Chattogram", "Sylhet", "Khulna", "Rajshahi", "Barishal"]),
      joinedAt: daysAgo(int(10, 720)),
      totalBookings: int(0, 14),
      totalSpent: int(0, 14) === 0 ? 0 : int(150, 8200),
      lastActive: daysAgo(int(0, 30)),
    });
  }
  return users;
}

const BOOKING_STATUSES = [
  "pending", "confirmed", "ongoing", "completed", "cancelled", "refund_requested",
];
const PAYMENT_STATUSES = ["paid", "partial", "unpaid", "refunded"];

function statusTimeline(status, bookedAt) {
  const base = new Date(bookedAt);
  const steps = [{ status: "pending", label: "Booking placed", at: base.toISOString() }];
  const add = (days, status, label) => {
    const d = new Date(base);
    d.setDate(d.getDate() + days);
    steps.push({ status, label, at: d.toISOString() });
  };
  if (["confirmed", "ongoing", "completed", "cancelled", "refund_requested"].includes(status)) {
    add(1, "confirmed", "Booking confirmed");
  }
  if (["ongoing", "completed"].includes(status)) add(3, "ongoing", "Trip in progress");
  if (status === "completed") add(9, "completed", "Trip completed");
  if (status === "cancelled") add(2, "cancelled", "Booking cancelled");
  if (status === "refund_requested") add(4, "refund_requested", "Refund requested");
  return steps;
}

function buildBookings(count, users) {
  const customers = users.filter((u) => u.role === "CUSTOMER");
  const bookings = [];
  for (let i = 1; i <= count; i++) {
    const customer = pick(customers.length ? customers : users);
    const destination = pick(DESTINATIONS);
    const status = pick(BOOKING_STATUSES);
    const bookedAt = daysAgo(int(1, 200));
    const travelDate =
      status === "completed" || status === "cancelled" ? daysAgo(int(1, 150)) : daysFromNow(int(1, 90));
    const travelers = int(1, 6);
    const pricePerHead = int(180, 1400);
    const amount = travelers * pricePerHead;
    bookings.push({
      id: `BKG-${5000 + i}`,
      customer: { id: customer.id, name: customer.name, email: customer.email },
      destination: `${destination.city}, ${destination.country}`,
      package: pick(PACKAGES),
      agent: pick(AGENTS),
      travelers,
      amount,
      currency: "USD",
      bookedAt,
      travelDate,
      status,
      paymentStatus:
        status === "cancelled" ? "refunded" : status === "refund_requested" ? "refunded" : pick(PAYMENT_STATUSES),
      timeline: statusTimeline(status, bookedAt),
    });
  }
  return bookings.sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));
}

export const MOCK_USERS = buildUsers(48);
export const MOCK_BOOKINGS = buildBookings(90, MOCK_USERS);
export const MOCK_DESTINATIONS = DESTINATIONS;
export const MOCK_AGENTS = AGENTS;

// Precompute month-bucketed revenue/bookings for the last 12 months so the
// analytics page has something coherent to chart against the bookings above.
export function buildMonthlySeries() {
  const months = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: d.toLocaleString("en-US", { month: "short" }) });
  }
  const revenue = months.map(() => 0);
  const bookingsCount = months.map(() => 0);
  const cancellations = months.map(() => 0);

  MOCK_BOOKINGS.forEach((b) => {
    const d = new Date(b.bookedAt);
    const idx = months.findIndex((m) => m.key === `${d.getFullYear()}-${d.getMonth()}`);
    if (idx === -1) return;
    bookingsCount[idx] += 1;
    if (b.status !== "cancelled") revenue[idx] += b.amount;
    if (b.status === "cancelled") cancellations[idx] += 1;
  });

  return {
    labels: months.map((m) => m.label),
    revenue,
    bookingsCount,
    cancellations,
  };
}

export function buildPopularDestinations() {
  const counts = {};
  MOCK_BOOKINGS.forEach((b) => {
    counts[b.destination] = (counts[b.destination] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([destination, bookings]) => ({ destination, bookings }))
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 6);
}

export function buildAgentPerformance() {
  return MOCK_AGENTS.map((agent) => {
    const agentBookings = MOCK_BOOKINGS.filter((b) => b.agent === agent);
    const revenue = agentBookings.reduce((sum, b) => (b.status !== "cancelled" ? sum + b.amount : sum), 0);
    const cancelled = agentBookings.filter((b) => b.status === "cancelled").length;
    return {
      agent,
      totalBookings: agentBookings.length,
      revenue,
      cancellationRate: agentBookings.length ? Math.round((cancelled / agentBookings.length) * 100) : 0,
      commission: Math.round(revenue * 0.08),
    };
  }).sort((a, b) => b.revenue - a.revenue);
}
