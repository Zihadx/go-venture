"use client";

import { useEffect, useState } from "react";
import { getRefunds } from "@/services/billing.service";
import { formatCurrency, formatDate } from "@/utils/format";
import type { Invoice } from "@/types/billing";

export default function RefundsPanel() {
  const [refunds, setRefunds] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRefunds().then((data) => { setRefunds(data); setLoading(false); });
  }, []);

  if (loading) return <p className="text-gray-400 text-center py-10">Loading refund records…</p>;

  if (refunds.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
        <p className="text-gray-500">No refunds on record.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y">
      {refunds.map((inv) => (
        <div key={inv.id} className="p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-800">{inv.id} · {inv.customer.name}</p>
            <p className="text-xs text-gray-400">{inv.destination} — {inv.packageName}</p>
            {inv.creditNotes.map((cn) => (
              <p key={cn.id} className="text-xs text-gray-400 mt-1">{cn.reason} · {formatDate(cn.issuedAt)}</p>
            ))}
          </div>
          <p className="font-bold text-red-600">-{formatCurrency(inv.total, inv.currency)}</p>
        </div>
      ))}
    </div>
  );
}
