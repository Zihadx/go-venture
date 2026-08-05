"use client";

import { useEffect, useState, SyntheticEvent } from "react";
import { Tabs, Tab } from "@mui/material";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { getBillingSummary } from "@/services/billing.service";
import { formatCurrency } from "@/utils/format";
import type { Invoice } from "@/types/billing";
// @ts-ignore — shared JS component
import StatCard from "@/components/Dashboard/ui/StatCard";
import InvoicesTable from "@/components/Dashboard/Billing/InvoicesTable";
import InvoiceDetailDrawer from "@/components/Dashboard/Billing/InvoiceDetailDrawer";
import CouponsPanel from "@/components/Dashboard/Billing/CouponsPanel";
import RefundsPanel from "@/components/Dashboard/Billing/RefundsPanel";

interface BillingSummary {
  totalRevenue: number;
  outstanding: number;
  refunded: number;
  totalDiscountGiven: number;
  invoiceCount: number;
}

export default function PaymentsInvoicesPage() {
  const [summary, setSummary] = useState<BillingSummary | null>(null);
  const [tab, setTab] = useState(0);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    getBillingSummary().then(setSummary);
  }, []);

  const handleTabChange = (_: SyntheticEvent, value: number) => setTab(value);

  return (
    <div className="space-y-6 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<PaidOutlinedIcon />} label="Total revenue" value={summary ? formatCurrency(summary.totalRevenue) : "—"} accent="#0EA65F" />
        <StatCard icon={<ErrorOutlineOutlinedIcon />} label="Outstanding" value={summary ? formatCurrency(summary.outstanding) : "—"} accent="#b59677" />
        <StatCard icon={<ReplayOutlinedIcon />} label="Refunded" value={summary ? formatCurrency(summary.refunded) : "—"} accent="#DC2626" />
        <StatCard icon={<LocalOfferOutlinedIcon />} label="Discounts given" value={summary ? formatCurrency(summary.totalDiscountGiven) : "—"} accent="#7A316F" />
      </div>

      <Tabs value={tab} onChange={handleTabChange} sx={{ "& .MuiTab-root": { textTransform: "none", fontWeight: 600 } }}>
        <Tab label="Invoices" />
        <Tab label="Coupons" />
        <Tab label="Refunds & credit notes" />
      </Tabs>

      {tab === 0 && <InvoicesTable onSelect={setSelectedInvoice} />}
      {tab === 1 && <CouponsPanel />}
      {tab === 2 && <RefundsPanel />}

      <InvoiceDetailDrawer invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
    </div>
  );
}
