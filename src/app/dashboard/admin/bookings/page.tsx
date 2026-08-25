"use client";

import { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  IconButton,
  InputAdornment,
  Drawer,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseIcon from "@mui/icons-material/Close";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  useBookingsQuery,
  useBookingDetailQuery,
  useUpdateBookingStatus,
} from "@/hooks/queries/useBookingsQuery";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  timeAgo,
} from "@/utils/format";
import { exportToCsv } from "@/utils/exportCsv";
import DataTable, {
  type DataTableColumn,
} from "@/components/Dashboard/ui/DataTable/DataTable";
// @ts-ignore — shared JS component
import StatusChip from "@/components/Dashboard/ui/StatusChip";
// @ts-ignore — shared JS component
import StatCard from "@/components/Dashboard/ui/StatCard";

interface BookingRow {
  id: string;
  customer: { name: string; email: string };
  destination: string;
  package: string;
  agent: string;
  travelers: number;
  amount: number;
  status: string;
  paymentStatus: string;
  travelDate: string;
  bookedAt: string;
  timeline: { status: string; label: string; at: string }[];
}

const STATUS_FILTERS = [
  "all",
  "pending",
  "confirmed",
  "ongoing",
  "completed",
  "cancelled",
  "refund_requested",
];
const PAYMENT_FILTERS = ["all", "paid", "partial", "unpaid", "refunded"];
const NEXT_STATUS: Record<string, string[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["ongoing", "cancelled"],
  ongoing: ["completed"],
  refund_requested: ["refunded"],
};

export default function BookingsManagementPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading } = useBookingsQuery({
    page,
    pageSize,
    search,
    status,
    paymentStatus,
  });
  const { data: selected } = useBookingDetailQuery(selectedId) as {
    data: BookingRow | null | undefined;
  };
  const updateStatus = useUpdateBookingStatus();

  const rows = (data?.data || []) as BookingRow[];
  const total = data?.total || 0;

  const pendingCount = rows.filter((r) => r.status === "pending").length;
  const revenueOnPage = rows.reduce(
    (sum, r) => (r.status !== "cancelled" ? sum + r.amount : sum),
    0,
  );

  const columns: DataTableColumn<BookingRow>[] = [
    {
      key: "id",
      header: "Booking",
      render: (b) => (
        <span className="font-semibold text-gray-700">{b.id}</span>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (b) => (
        <div>
          <p className="text-gray-800">{b.customer.name}</p>
          <p className="text-xs text-gray-400">{b.customer.email}</p>
        </div>
      ),
    },
    {
      key: "destination",
      header: "Destination",
      render: (b) => <span className="text-gray-600">{b.destination}</span>,
    },
    {
      key: "travelDate",
      header: "Travel date",
      render: (b) => (
        <span className="text-gray-500">{formatDate(b.travelDate)}</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      align: "right",
      render: (b) => (
        <span className="font-medium text-gray-700">
          {formatCurrency(b.amount)}
        </span>
      ),
    },
    {
      key: "paymentStatus",
      header: "Payment",
      render: (b) => <StatusChip status={b.paymentStatus} />,
    },
    {
      key: "status",
      header: "Status",
      render: (b) => <StatusChip status={b.status} />,
    },
    {
      key: "bookedAt",
      header: "Booked",
      render: (b) => (
        <span className="text-gray-400">{timeAgo(b.bookedAt)}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          icon={<BookOnlineOutlinedIcon />}
          label="Bookings (filtered)"
          value={total}
          accent="#2095ae"
        />
        <StatCard
          icon={<HourglassEmptyOutlinedIcon />}
          label="Awaiting confirmation (page)"
          value={pendingCount}
          accent="#b59677"
        />
        <StatCard
          icon={<PaidOutlinedIcon />}
          label="Revenue on this page"
          value={formatCurrency(revenueOnPage)}
          accent="#0EA65F"
        />
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(b) => b.id}
        loading={isLoading}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(0);
        }}
        onRowClick={(b) => setSelectedId(b.id)}
        emptyMessage="No bookings match these filters."
        toolbar={
          <div className="flex w-full flex-col gap-3 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:items-center">
            <TextField
              size="small"
              placeholder="Search booking ID, customer, destination…"
              value={search}
              onChange={(e) => {
                setPage(0);
                setSearch(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              className="w-full lg:w-80"
            />

            <Select
              size="small"
              value={status}
              onChange={(e) => {
                setPage(0);
                setStatus(e.target.value);
              }}
              className="w-full lg:w-52"
            >
              {STATUS_FILTERS.map((s) => (
                <MenuItem key={s} value={s} className="capitalize">
                  {s === "all" ? "All statuses" : s.replace("_", " ")}
                </MenuItem>
              ))}
            </Select>

            <Select
              size="small"
              value={paymentStatus}
              onChange={(e) => {
                setPage(0);
                setPaymentStatus(e.target.value);
              }}
              className="w-full lg:w-44"
            >
              {PAYMENT_FILTERS.map((s) => (
                <MenuItem key={s} value={s} className="capitalize">
                  {s === "all" ? "All payments" : s}
                </MenuItem>
              ))}
            </Select>

            <button
              type="button"
              onClick={() =>
                exportToCsv(
                  "go-venture-bookings",
                  rows.map(
                    ({
                      id,
                      customer,
                      destination,
                      package: pkg,
                      amount,
                      status,
                      paymentStatus,
                      travelDate,
                      bookedAt,
                    }) => ({
                      id,
                      customer: customer.name,
                      destination,
                      package: pkg,
                      amount,
                      status,
                      paymentStatus,
                      travelDate,
                      bookedAt,
                    }),
                  ),
                )
              }
              className="w-full whitespace-nowrap rounded-xl border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/5 sm:col-span-2 lg:ml-auto lg:w-auto"
            >
              Export CSV
            </button>
          </div>
        }
      />

      {/* Detail drawer */}
      <Drawer
        anchor="right"
        open={!!selectedId}
        onClose={() => setSelectedId(null)}
      >
        {selected && (
          <div className="w-[380px] sm:w-[440px] h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-bold text-gray-800">{selected.id}</h3>
                <p className="text-xs text-gray-400">
                  Booked {formatDateTime(selected.bookedAt)}
                </p>
              </div>
              <IconButton onClick={() => setSelectedId(null)}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              <div className="flex items-center gap-2">
                <StatusChip status={selected.status} />
                <StatusChip status={selected.paymentStatus} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-gray-400 mb-2">
                  Customer
                </p>
                <p className="font-semibold text-gray-800">
                  {selected.customer.name}
                </p>
                <p className="text-sm text-gray-500">
                  {selected.customer.email}
                </p>
              </div>

              <Divider />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">
                    Destination
                  </p>
                  <p className="text-gray-700">{selected.destination}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">
                    Package
                  </p>
                  <p className="text-gray-700">{selected.package}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">
                    Travel date
                  </p>
                  <p className="text-gray-700">
                    {formatDate(selected.travelDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">
                    Travelers
                  </p>
                  <p className="text-gray-700">{selected.travelers}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">
                    Amount
                  </p>
                  <p className="text-gray-700 font-semibold">
                    {formatCurrency(selected.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">
                    Assigned agent
                  </p>
                  <p className="text-gray-700">{selected.agent}</p>
                </div>
              </div>

              <Divider />

              <div>
                <p className="text-xs font-bold uppercase text-gray-400 mb-3">
                  Status timeline
                </p>
                <Stepper
                  orientation="vertical"
                  activeStep={selected.timeline.length - 1}
                >
                  {selected.timeline.map((step, i) => (
                    <Step key={i} completed>
                      <StepLabel>
                        <p className="text-sm font-medium text-gray-700">
                          {step.label}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatDateTime(step.at)}
                        </p>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
            </div>

            {NEXT_STATUS[selected.status] && (
              <div className="p-4 border-t flex gap-2">
                {selected.status === "pending" && (
                  <>
                    <button
                      disabled={updateStatus.isPending}
                      onClick={() =>
                        updateStatus.mutate({
                          id: selected.id,
                          status: "confirmed",
                        })
                      }
                      className="flex-1 button-primary disabled:opacity-50"
                    >
                      Confirm booking
                    </button>
                    <button
                      disabled={updateStatus.isPending}
                      onClick={() =>
                        updateStatus.mutate({
                          id: selected.id,
                          status: "cancelled",
                        })
                      }
                      className="flex items-center gap-1 rounded-md border border-red-200 text-red-600 px-3 py-2 text-sm font-semibold hover:bg-red-50 disabled:opacity-50"
                    >
                      <CancelOutlinedIcon fontSize="small" /> Cancel
                    </button>
                  </>
                )}
                {selected.status === "confirmed" && (
                  <button
                    disabled={updateStatus.isPending}
                    onClick={() =>
                      updateStatus.mutate({
                        id: selected.id,
                        status: "ongoing",
                      })
                    }
                    className="flex-1 button-primary disabled:opacity-50"
                  >
                    Mark trip as ongoing
                  </button>
                )}
                {selected.status === "ongoing" && (
                  <button
                    disabled={updateStatus.isPending}
                    onClick={() =>
                      updateStatus.mutate({
                        id: selected.id,
                        status: "completed",
                      })
                    }
                    className="flex-1 button-primary disabled:opacity-50"
                  >
                    Mark trip completed
                  </button>
                )}
                {selected.status === "refund_requested" && (
                  <button
                    disabled={updateStatus.isPending}
                    onClick={() =>
                      updateStatus.mutate({
                        id: selected.id,
                        status: "refunded",
                      })
                    }
                    className="flex-1 button-primary disabled:opacity-50"
                  >
                    Approve refund
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}
