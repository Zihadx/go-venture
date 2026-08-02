"use client";

import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  TextField, MenuItem, Select, IconButton, InputAdornment, Drawer, Stepper, Step, StepLabel, Divider,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseIcon from "@mui/icons-material/Close";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { getBookings, getBookingById, updateBookingStatus } from "@/services/dashboard.service";
import { formatCurrency, formatDate, formatDateTime, timeAgo } from "@/utils/format";
import { exportToCsv } from "@/utils/exportCsv";
import StatusChip from "@/components/Dashboard/ui/StatusChip";
import StatCard from "@/components/Dashboard/ui/StatCard";

const STATUS_FILTERS = ["all", "pending", "confirmed", "ongoing", "completed", "cancelled", "refund_requested"];
const PAYMENT_FILTERS = ["all", "paid", "partial", "unpaid", "refunded"];
const NEXT_STATUS = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["ongoing", "cancelled"],
  ongoing: ["completed"],
  refund_requested: ["refunded"],
};

export default function BookingsManagementPage() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  const load = () => {
    setLoading(true);
    getBookings({ page, pageSize, search, status, paymentStatus }).then(({ data, total }) => {
      setRows(data);
      setTotal(total);
      setLoading(false);
    });
  };

  useEffect(load, [page, pageSize, search, status, paymentStatus]);

  const openDetail = async (id) => {
    const booking = await getBookingById(id);
    setSelected(booking);
  };

  const advance = async (newStatus) => {
    if (!selected) return;
    setUpdating(true);
    const updated = await updateBookingStatus(selected.id, newStatus);
    setSelected(updated);
    setUpdating(false);
    load();
  };

  const pendingCount = rows.filter((r) => r.status === "pending").length;
  const revenueOnPage = rows.reduce((sum, r) => (r.status !== "cancelled" ? sum + r.amount : sum), 0);
  const cancelledCount = rows.filter((r) => r.status === "cancelled").length;

  return (
    <div className="space-y-6 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard icon={<BookOnlineOutlinedIcon />} label="Bookings (filtered)" value={total} accent="#2095ae" />
        <StatCard icon={<HourglassEmptyOutlinedIcon />} label="Awaiting confirmation (page)" value={pendingCount} accent="#b59677" />
        <StatCard icon={<PaidOutlinedIcon />} label="Revenue on this page" value={formatCurrency(revenueOnPage)} accent="#0EA65F" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center gap-3 p-4 border-b border-gray-100">
          <TextField
            size="small"
            placeholder="Search booking ID, customer, destination…"
            value={search}
            onChange={(e) => { setPage(0); setSearch(e.target.value); }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlinedIcon fontSize="small" /></InputAdornment> }}
            className="w-full md:w-80"
          />
          <Select size="small" value={status} onChange={(e) => { setPage(0); setStatus(e.target.value); }} className="w-full md:w-52">
            {STATUS_FILTERS.map((s) => (
              <MenuItem key={s} value={s} className="capitalize">{s === "all" ? "All statuses" : s.replace("_", " ")}</MenuItem>
            ))}
          </Select>
          <Select size="small" value={paymentStatus} onChange={(e) => { setPage(0); setPaymentStatus(e.target.value); }} className="w-full md:w-44">
            {PAYMENT_FILTERS.map((s) => (
              <MenuItem key={s} value={s} className="capitalize">{s === "all" ? "All payments" : s}</MenuItem>
            ))}
          </Select>
          <button
            onClick={() => exportToCsv("go-venture-bookings", rows.map(({ id, customer, destination, package: pkg, amount, status, paymentStatus, travelDate, bookedAt }) => ({
              id, customer: customer.name, destination, package: pkg, amount, status, paymentStatus, travelDate, bookedAt,
            })))}
            className="ml-auto text-sm font-semibold text-primary border border-primary/30 rounded-lg px-4 py-2 hover:bg-primary/5 transition-colors whitespace-nowrap"
          >
            Export CSV
          </button>
        </div>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableCell>Booking</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Travel date</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Booked</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow><TableCell colSpan={8} className="text-center text-gray-400 py-8">Loading bookings…</TableCell></TableRow>
              )}
              {!loading && rows.length === 0 && (
                <TableRow><TableCell colSpan={8} className="text-center text-gray-400 py-8">No bookings match these filters.</TableCell></TableRow>
              )}
              {!loading && rows.map((b) => (
                <TableRow key={b.id} hover onClick={() => openDetail(b.id)} className="cursor-pointer">
                  <TableCell className="font-semibold text-gray-700">{b.id}</TableCell>
                  <TableCell>
                    <p className="text-gray-800">{b.customer.name}</p>
                    <p className="text-xs text-gray-400">{b.customer.email}</p>
                  </TableCell>
                  <TableCell className="text-gray-600">{b.destination}</TableCell>
                  <TableCell className="text-gray-500">{formatDate(b.travelDate)}</TableCell>
                  <TableCell align="right" className="font-medium text-gray-700">{formatCurrency(b.amount)}</TableCell>
                  <TableCell><StatusChip status={b.paymentStatus} /></TableCell>
                  <TableCell><StatusChip status={b.status} /></TableCell>
                  <TableCell className="text-gray-400">{timeAgo(b.bookedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(e) => { setPageSize(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </div>

      {/* Detail drawer */}
      <Drawer anchor="right" open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="w-[380px] sm:w-[440px] h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-bold text-gray-800">{selected.id}</h3>
                <p className="text-xs text-gray-400">Booked {formatDateTime(selected.bookedAt)}</p>
              </div>
              <IconButton onClick={() => setSelected(null)}><CloseIcon /></IconButton>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              <div className="flex items-center gap-2">
                <StatusChip status={selected.status} />
                <StatusChip status={selected.paymentStatus} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-gray-400 mb-2">Customer</p>
                <p className="font-semibold text-gray-800">{selected.customer.name}</p>
                <p className="text-sm text-gray-500">{selected.customer.email}</p>
              </div>

              <Divider />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">Destination</p>
                  <p className="text-gray-700">{selected.destination}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">Package</p>
                  <p className="text-gray-700">{selected.package}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">Travel date</p>
                  <p className="text-gray-700">{formatDate(selected.travelDate)}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">Travelers</p>
                  <p className="text-gray-700">{selected.travelers}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">Amount</p>
                  <p className="text-gray-700 font-semibold">{formatCurrency(selected.amount)}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 mb-1">Assigned agent</p>
                  <p className="text-gray-700">{selected.agent}</p>
                </div>
              </div>

              <Divider />

              <div>
                <p className="text-xs font-bold uppercase text-gray-400 mb-3">Status timeline</p>
                <Stepper orientation="vertical" activeStep={selected.timeline.length - 1}>
                  {selected.timeline.map((step, i) => (
                    <Step key={i} completed>
                      <StepLabel>
                        <p className="text-sm font-medium text-gray-700">{step.label}</p>
                        <p className="text-xs text-gray-400">{formatDateTime(step.at)}</p>
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
                      disabled={updating}
                      onClick={() => advance("confirmed")}
                      className="flex-1 button-primary disabled:opacity-50"
                    >
                      Confirm booking
                    </button>
                    <button
                      disabled={updating}
                      onClick={() => advance("cancelled")}
                      className="flex items-center gap-1 rounded-md border border-red-200 text-red-600 px-3 py-2 text-sm font-semibold hover:bg-red-50 disabled:opacity-50"
                    >
                      <CancelOutlinedIcon fontSize="small" /> Cancel
                    </button>
                  </>
                )}
                {selected.status === "confirmed" && (
                  <button disabled={updating} onClick={() => advance("ongoing")} className="flex-1 button-primary disabled:opacity-50">
                    Mark trip as ongoing
                  </button>
                )}
                {selected.status === "ongoing" && (
                  <button disabled={updating} onClick={() => advance("completed")} className="flex-1 button-primary disabled:opacity-50">
                    Mark trip completed
                  </button>
                )}
                {selected.status === "refund_requested" && (
                  <button disabled={updating} onClick={() => advance("refunded")} className="flex-1 button-primary disabled:opacity-50">
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
