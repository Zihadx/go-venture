// Dashboard data-access layer.
//
// Every export here is async and shaped like a real REST call (params in,
// { data, total } or a plain payload out) even though it currently reads
// from the in-memory mock DB. When the Mongoose API is ready, swap the body
// of each function for a `fetch("/api/...")` call — nothing in the
// dashboard UI needs to change because it only ever imports from this file.

import {
  MOCK_USERS,
  MOCK_BOOKINGS,
  buildMonthlySeries,
  buildPopularDestinations,
  buildAgentPerformance,
} from "@/services/mock/mockDb";

const LATENCY_MS = 350;
const delay = (ms = LATENCY_MS) => new Promise((res) => setTimeout(res, ms));

// In-memory mutation so status/role changes persist for the session even
// though there's no real database behind them yet.
let usersStore = [...MOCK_USERS];
let bookingsStore = [...MOCK_BOOKINGS];

/* -------------------------------- Users -------------------------------- */

export async function getUsers({ page = 0, pageSize = 10, search = "", role = "all", status = "all" } = {}) {
  await delay();
  let rows = usersStore;
  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }
  if (role !== "all") rows = rows.filter((u) => u.role === role);
  if (status !== "all") rows = rows.filter((u) => u.status === status);
  const total = rows.length;
  const start = page * pageSize;
  return { data: rows.slice(start, start + pageSize), total };
}

export async function updateUserRole(userId, role) {
  await delay(200);
  usersStore = usersStore.map((u) => (u.id === userId ? { ...u, role } : u));
  return usersStore.find((u) => u.id === userId);
}

export async function updateUserStatus(userId, status) {
  await delay(200);
  usersStore = usersStore.map((u) => (u.id === userId ? { ...u, status } : u));
  return usersStore.find((u) => u.id === userId);
}

/* ------------------------------- Bookings ------------------------------- */

export async function getBookings({
  page = 0,
  pageSize = 10,
  search = "",
  status = "all",
  paymentStatus = "all",
} = {}) {
  await delay();
  let rows = bookingsStore;
  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter(
      (b) =>
        b.id.toLowerCase().includes(q) ||
        b.customer.name.toLowerCase().includes(q) ||
        b.destination.toLowerCase().includes(q)
    );
  }
  if (status !== "all") rows = rows.filter((b) => b.status === status);
  if (paymentStatus !== "all") rows = rows.filter((b) => b.paymentStatus === paymentStatus);
  const total = rows.length;
  const start = page * pageSize;
  return { data: rows.slice(start, start + pageSize), total };
}

export async function getBookingById(id) {
  await delay(150);
  return bookingsStore.find((b) => b.id === id) || null;
}

export async function updateBookingStatus(id, status) {
  await delay(200);
  bookingsStore = bookingsStore.map((b) => {
    if (b.id !== id) return b;
    return {
      ...b,
      status,
      timeline: [...b.timeline, { status, label: `Status changed to ${status.replace("_", " ")}`, at: new Date().toISOString() }],
    };
  });
  return bookingsStore.find((b) => b.id === id);
}

// Used by the customer-facing booking wizard. Writes into the same
// in-memory store the admin dashboard reads, so a booking made through the
// customer flow shows up immediately in Admin > Bookings and Analytics.
export async function createBooking({ customer, destination, packageName, travelers, travelDate, amount, addOns = [] }) {
  await delay(400);
  const now = new Date().toISOString();
  const id = `BKG-${5000 + bookingsStore.length + 1}`;
  const booking = {
    id,
    customer,
    destination,
    package: packageName,
    agent: "Unassigned",
    travelers,
    amount,
    currency: "USD",
    bookedAt: now,
    travelDate,
    status: "pending",
    paymentStatus: "unpaid",
    addOns,
    timeline: [{ status: "pending", label: "Booking placed", at: now }],
  };
  bookingsStore = [booking, ...bookingsStore];
  return booking;
}

export async function getBookingsByCustomerEmail(email) {
  await delay(250);
  return bookingsStore
    .filter((b) => b.customer.email === email)
    .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));
}

export async function requestBookingCancellation(id) {
  return updateBookingStatus(id, "refund_requested");
}

/* ------------------------------- Analytics ------------------------------- */

export async function getAnalyticsOverview() {
  await delay(300);
  const series = buildMonthlySeries();
  const totalRevenue = series.revenue.reduce((a, b) => a + b, 0);
  const totalBookings = bookingsStore.length;
  const completed = bookingsStore.filter((b) => b.status === "completed").length;
  const cancelled = bookingsStore.filter((b) => b.status === "cancelled").length;
  const activeCustomers = usersStore.filter((u) => u.role === "CUSTOMER" && u.status === "active").length;
  const conversionRate = totalBookings ? Math.round((completed / totalBookings) * 100) : 0;
  const cancellationRate = totalBookings ? Math.round((cancelled / totalBookings) * 100) : 0;
  const avgBookingValue = totalBookings ? Math.round(totalRevenue / totalBookings) : 0;

  return {
    series,
    kpis: {
      totalRevenue,
      totalBookings,
      activeCustomers,
      conversionRate,
      cancellationRate,
      avgBookingValue,
    },
    popularDestinations: buildPopularDestinations(),
    agentPerformance: buildAgentPerformance(),
  };
}

export async function getDashboardSummary() {
  await delay(250);
  const overview = await getAnalyticsOverview();
  const recentBookings = [...bookingsStore]
    .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt))
    .slice(0, 6);
  const pendingBookings = bookingsStore.filter((b) => b.status === "pending").length;
  const refundRequests = bookingsStore.filter((b) => b.status === "refund_requested").length;
  return { ...overview, recentBookings, pendingBookings, refundRequests, totalUsers: usersStore.length };
}
