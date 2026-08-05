"use client";

import { Drawer, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import type { Invoice } from "@/types/billing";
import { formatCurrency, formatDate, formatDateTime } from "@/utils/format";
import { generateInvoicePdf } from "@/utils/generateInvoicePdf";
// @ts-ignore — shared JS component, untyped by design (see tsconfig strict:false note)
import StatusChip from "@/components/Dashboard/ui/StatusChip";

interface Props {
  invoice: Invoice | null;
  onClose: () => void;
}

export default function InvoiceDetailDrawer({ invoice, onClose }: Props) {
  return (
    <Drawer anchor="right" open={!!invoice} onClose={onClose}>
      {invoice && (
        <div className="w-[380px] sm:w-[460px] h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h3 className="font-bold text-gray-800">{invoice.id}</h3>
              <p className="text-xs text-gray-400">Booking {invoice.bookingId}</p>
            </div>
            <IconButton onClick={onClose}><CloseIcon /></IconButton>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            <div className="flex items-center justify-between">
              <StatusChip status={invoice.status} />
              <span className="text-xs text-gray-400">Issued {formatDate(invoice.issuedAt)} · Due {formatDate(invoice.dueAt)}</span>
            </div>

            <div>
              <p className="text-xs font-bold uppercase text-gray-400 mb-1">Billed to</p>
              <p className="font-semibold text-gray-800">{invoice.customer.name}</p>
              <p className="text-sm text-gray-500">{invoice.customer.email}</p>
            </div>

            <Divider />

            <div>
              <p className="text-xs font-bold uppercase text-gray-400 mb-2">Line items</p>
              <div className="space-y-2">
                {invoice.lineItems.map((li, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600">{li.label} {li.quantity > 1 ? `× ${li.quantity}` : ""}</span>
                    <span className="text-gray-700 font-medium">{formatCurrency(li.total, invoice.currency)}</span>
                  </div>
                ))}
              </div>
            </div>

            <Divider />

            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{formatCurrency(invoice.subtotal, invoice.currency)}</span></div>
              {invoice.discount.amount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount {invoice.discount.code ? `(${invoice.discount.code})` : ""}</span>
                  <span>-{formatCurrency(invoice.discount.amount, invoice.currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500"><span>Tax ({Math.round(invoice.taxRate * 100)}%)</span><span>{formatCurrency(invoice.taxAmount, invoice.currency)}</span></div>
              <Divider />
              <div className="flex justify-between font-bold text-gray-800 text-base"><span>Total</span><span>{formatCurrency(invoice.total, invoice.currency)}</span></div>
            </div>

            {invoice.payments.length > 0 && (
              <>
                <Divider />
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-2">Payment history</p>
                  <div className="space-y-2">
                    {invoice.payments.map((p) => (
                      <div key={p.id} className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">{p.method.replace("_", " ")} · {formatDateTime(p.paidAt)}</span>
                        <span className="text-gray-700 font-medium">{formatCurrency(p.amount, invoice.currency)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {invoice.creditNotes.length > 0 && (
              <>
                <Divider />
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-2">Credit notes</p>
                  {invoice.creditNotes.map((cn) => (
                    <div key={cn.id} className="bg-gray-50 rounded-lg p-3 text-sm">
                      <p className="font-medium text-gray-700">{formatCurrency(cn.amount, invoice.currency)} — {cn.reason}</p>
                      <p className="text-xs text-gray-400">{formatDate(cn.issuedAt)}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="p-4 border-t">
            <button onClick={() => generateInvoicePdf(invoice)} className="button-primary w-full flex items-center justify-center gap-2">
              <DownloadOutlinedIcon fontSize="small" /> Download PDF
            </button>
          </div>
        </div>
      )}
    </Drawer>
  );
}
