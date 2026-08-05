import { getBookingsSnapshot } from "@/services/dashboard.service";
import { buildInvoiceFromBooking, MOCK_COUPONS } from "@/services/mock/mockBilling";
import type { Invoice, InvoiceListFilters, Coupon } from "@/types/billing";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

let couponsStore: Coupon[] = [...MOCK_COUPONS];

// Invoices are a pure derivation of whatever bookings currently exist — no
// separate store to fall out of sync. A booking placed through the customer
// wizard shows up here immediately, same as it does in Admin > Bookings.
function getLiveInvoices(): Invoice[] {
  return getBookingsSnapshot().map((b: any, i: number) => buildInvoiceFromBooking(b, i));
}

export async function getInvoices({ page = 0, pageSize = 10, search = "", status = "all" }: InvoiceListFilters = {}) {
  await delay();
  let rows = getLiveInvoices();
  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter(
      (i) => i.id.toLowerCase().includes(q) || i.customer.name.toLowerCase().includes(q) || i.bookingId.toLowerCase().includes(q)
    );
  }
  if (status !== "all") rows = rows.filter((i) => i.status === status);
  const total = rows.length;
  const start = page * pageSize;
  return { data: rows.slice(start, start + pageSize), total };
}

export async function getInvoiceById(id: string): Promise<Invoice | null> {
  await delay(150);
  return getLiveInvoices().find((i) => i.id === id) || null;
}

export async function getInvoiceByBookingId(bookingId: string): Promise<Invoice | null> {
  await delay(150);
  return getLiveInvoices().find((i) => i.bookingId === bookingId) || null;
}

export async function getInvoicesByCustomerEmail(email: string): Promise<Invoice[]> {
  await delay(200);
  return getLiveInvoices()
    .filter((i) => i.customer.email === email)
    .sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime());
}

export async function getRefunds() {
  await delay(200);
  return getLiveInvoices().filter((i) => i.status === "refunded" && i.creditNotes.length > 0);
}

export async function getBillingSummary() {
  await delay(250);
  const invoices = getLiveInvoices();
  const totalRevenue = invoices.reduce((sum, i) => (i.status !== "refunded" ? sum + i.total : sum), 0);
  const outstanding = invoices
    .filter((i) => i.status === "unpaid" || i.status === "partial")
    .reduce((sum, i) => sum + i.total, 0);
  const refunded = invoices.filter((i) => i.status === "refunded").reduce((sum, i) => sum + i.total, 0);
  const totalDiscountGiven = invoices.reduce((sum, i) => sum + i.discount.amount, 0);
  return {
    totalRevenue,
    outstanding,
    refunded,
    totalDiscountGiven,
    invoiceCount: invoices.length,
  };
}

/* --------------------------------- Coupons --------------------------------- */

export async function getCoupons(): Promise<Coupon[]> {
  await delay(200);
  return couponsStore;
}

export async function createCoupon(coupon: Omit<Coupon, "usageCount">): Promise<Coupon> {
  await delay(250);
  const newCoupon: Coupon = { ...coupon, usageCount: 0 };
  couponsStore = [newCoupon, ...couponsStore];
  return newCoupon;
}

export async function toggleCoupon(code: string): Promise<Coupon | undefined> {
  await delay(150);
  couponsStore = couponsStore.map((c) => (c.code === code ? { ...c, active: !c.active } : c));
  return couponsStore.find((c) => c.code === code);
}

export async function validateCoupon(code: string): Promise<Coupon | null> {
  await delay(200);
  const coupon = couponsStore.find((c) => c.code.toUpperCase() === code.toUpperCase());
  if (!coupon) return null;
  if (!coupon.active) return null;
  if (new Date(coupon.expiresAt).getTime() < Date.now()) return null;
  if (coupon.usageCount >= coupon.maxUsage) return null;
  return coupon;
}

export async function redeemCoupon(code: string): Promise<void> {
  await delay(100);
  couponsStore = couponsStore.map((c) => (c.code.toUpperCase() === code.toUpperCase() ? { ...c, usageCount: c.usageCount + 1 } : c));
}
