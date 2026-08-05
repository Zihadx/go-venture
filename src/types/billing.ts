// Shared types for the Payments & Invoices module.
// These describe the shape the real Mongoose API should return once wired
// in — `billing.service.ts` is the only place that needs to change.

export type PaymentMethod = "card" | "bkash" | "nagad" | "sslcommerz" | "bank_transfer";

export interface InvoiceLineItem {
  label: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PaymentRecord {
  id: string;
  invoiceId: string;
  amount: number;
  method: PaymentMethod;
  status: "succeeded" | "failed" | "pending" | "refunded";
  paidAt: string;
}

export interface CreditNote {
  id: string;
  invoiceId: string;
  amount: number;
  reason: string;
  issuedAt: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  active: boolean;
  usageCount: number;
  maxUsage: number;
  expiresAt: string;
}

export interface Invoice {
  id: string;
  bookingId: string;
  customer: { name: string; email: string };
  destination: string;
  packageName: string;
  issuedAt: string;
  dueAt: string;
  status: "paid" | "partial" | "unpaid" | "refunded";
  lineItems: InvoiceLineItem[];
  subtotal: number;
  discount: { code: string | null; amount: number };
  taxRate: number;
  taxAmount: number;
  total: number;
  currency: string;
  payments: PaymentRecord[];
  creditNotes: CreditNote[];
}

export interface InvoiceListFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: Invoice["status"] | "all";
}
