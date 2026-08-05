"use client";

import { useState } from "react";
import { TextField, MenuItem, Select, InputAdornment } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useInvoicesQuery } from "@/hooks/queries/useInvoicesQuery";
import { generateInvoicePdf } from "@/utils/generateInvoicePdf";
import { formatCurrency, formatDate } from "@/utils/format";
import type { Invoice } from "@/types/billing";
import DataTable, { type DataTableColumn } from "@/components/Dashboard/ui/DataTable/DataTable";
// @ts-ignore — shared JS component
import StatusChip from "@/components/Dashboard/ui/StatusChip";

const STATUS_FILTERS = ["all", "paid", "partial", "unpaid", "refunded"];

interface Props {
  onSelect: (invoice: Invoice) => void;
}

export default function InvoicesTable({ onSelect }: Props) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");

  const { data, isLoading } = useInvoicesQuery({ page, pageSize, search, status: status as Invoice["status"] | "all" });
  const rows = data?.data || [];
  const total = data?.total || 0;

  const columns: DataTableColumn<Invoice>[] = [
    { key: "id", header: "Invoice", render: (inv) => <span className="font-semibold text-gray-700">{inv.id}</span> },
    {
      key: "customer", header: "Customer",
      render: (inv) => (
        <div>
          <p className="text-gray-800">{inv.customer.name}</p>
          <p className="text-xs text-gray-400">{inv.customer.email}</p>
        </div>
      ),
    },
    { key: "package", header: "Package", render: (inv) => <span className="text-gray-600">{inv.packageName}</span> },
    { key: "issued", header: "Issued", render: (inv) => <span className="text-gray-500">{formatDate(inv.issuedAt)}</span> },
    { key: "total", header: "Total", align: "right", render: (inv) => <span className="font-medium text-gray-700">{formatCurrency(inv.total, inv.currency)}</span> },
    { key: "status", header: "Status", render: (inv) => <StatusChip status={inv.status} /> },
    {
      key: "download", header: "", align: "right",
      render: (inv) => (
        <button
          onClick={(e) => { e.stopPropagation(); generateInvoicePdf(inv); }}
          className="text-primary hover:bg-primary/10 rounded-full p-1.5"
          title="Download PDF"
        >
          <DownloadOutlinedIcon fontSize="small" />
        </button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={rows}
      rowKey={(inv) => inv.id}
      loading={isLoading}
      page={page}
      pageSize={pageSize}
      total={total}
      onPageChange={setPage}
      onPageSizeChange={(size) => { setPageSize(size); setPage(0); }}
      onRowClick={onSelect}
      emptyMessage="No invoices match these filters."
      toolbar={
        <>
          <TextField
            size="small"
            placeholder="Search invoice, booking, customer…"
            value={search}
            onChange={(e) => { setPage(0); setSearch(e.target.value); }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlinedIcon fontSize="small" /></InputAdornment> }}
            className="w-full md:w-80"
          />
          <Select size="small" value={status} onChange={(e) => { setPage(0); setStatus(e.target.value); }} className="w-full md:w-44">
            {STATUS_FILTERS.map((s) => <MenuItem key={s} value={s} className="capitalize">{s === "all" ? "All statuses" : s}</MenuItem>)}
          </Select>
        </>
      }
    />
  );
}
