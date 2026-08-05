import type { Invoice, Coupon, PaymentMethod, PaymentRecord, CreditNote } from "@/types/billing";

const PAYMENT_METHODS: PaymentMethod[] = ["card", "bkash", "nagad", "sslcommerz", "bank_transfer"];
const TAX_RATE = 0.05;

// Same small seeded PRNG used elsewhere in the mock layer, so re-renders and
// server/client hydration stay in sync.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(20260803);
const pick = <T,>(arr: T[]): T => arr[Math.floor(rng() * arr.length)];

function daysFrom(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export function buildInvoiceFromBooking(booking: any, index: number): Invoice {
  const invoiceId = `INV-${8000 + index}`;
  const hasRealDiscount = typeof booking.discountAmount === "number" && booking.discountAmount > 0;
  const subtotalBase = Math.round(booking.amount / 1.05 / 1.0); // approximate pre-tax, pre-discount base
  const applyMockDiscount = !hasRealDiscount && index % 5 === 0;
  const discountAmount = hasRealDiscount ? booking.discountAmount : applyMockDiscount ? Math.round(subtotalBase * 0.1) : 0;
  const discountCode = hasRealDiscount ? booking.discountCode || null : applyMockDiscount ? "WELCOME10" : null;
  const taxable = subtotalBase - discountAmount;
  const taxAmount = Math.round(Math.max(taxable, 0) * TAX_RATE);
  const total = Math.max(taxable, 0) + taxAmount;

  const lineItems = [
    {
      label: `${booking.package} — ${booking.destination}`,
      quantity: booking.travelers,
      unitPrice: Math.round(subtotalBase / booking.travelers),
      total: subtotalBase,
    },
    ...((booking.addOns || []) as string[]).map((a: string) => ({
      label: `Add-on: ${a}`,
      quantity: 1,
      unitPrice: 0,
      total: 0,
    })),
  ];

  const status: Invoice["status"] =
    booking.paymentStatus === "refunded" ? "refunded" : booking.paymentStatus === "paid" ? "paid" : booking.paymentStatus === "partial" ? "partial" : "unpaid";

  const payments: PaymentRecord[] = [];
  if (status === "paid" || status === "partial" || status === "refunded") {
    payments.push({
      id: `PAY-${invoiceId}-1`,
      invoiceId,
      amount: status === "partial" ? Math.round(total * 0.5) : total,
      method: pick(PAYMENT_METHODS),
      status: status === "refunded" ? "refunded" : "succeeded",
      paidAt: daysFrom(booking.bookedAt, 1),
    });
  }

  const creditNotes: CreditNote[] =
    status === "refunded"
      ? [{ id: `CN-${invoiceId}`, invoiceId, amount: total, reason: "Booking cancelled — full refund issued", issuedAt: daysFrom(booking.bookedAt, 6) }]
      : [];

  return {
    id: invoiceId,
    bookingId: booking.id,
    customer: booking.customer,
    destination: booking.destination,
    packageName: booking.package,
    issuedAt: booking.bookedAt,
    dueAt: daysFrom(booking.bookedAt, 7),
    status,
    lineItems,
    subtotal: subtotalBase,
    discount: { code: discountCode, amount: discountAmount },
    taxRate: TAX_RATE,
    taxAmount,
    total,
    currency: booking.currency || "USD",
    payments,
    creditNotes,
  };
}

export const MOCK_COUPONS: Coupon[] = [
  { code: "WELCOME10", discountPercent: 10, active: true, usageCount: 18, maxUsage: 200, expiresAt: daysFrom(new Date().toISOString(), 60) },
  { code: "SUMMER25", discountPercent: 25, active: true, usageCount: 42, maxUsage: 100, expiresAt: daysFrom(new Date().toISOString(), 20) },
  { code: "EIDSPECIAL", discountPercent: 15, active: false, usageCount: 96, maxUsage: 96, expiresAt: daysFrom(new Date().toISOString(), -10) },
  { code: "AGENT5", discountPercent: 5, active: true, usageCount: 7, maxUsage: 500, expiresAt: daysFrom(new Date().toISOString(), 180) },
];
