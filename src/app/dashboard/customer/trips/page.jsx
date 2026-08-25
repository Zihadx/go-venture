"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getBookingsByCustomerEmail,
  requestBookingCancellation,
} from "@/services/dashboard.service";
import { getInvoiceByBookingId } from "@/services/billing.service";
import { generateInvoicePdf } from "@/utils/generateInvoicePdf";
import useCurrentUser from "@/hooks/useCurrentUser";
import { formatCurrency, formatDate } from "@/utils/format";
import StatusChip from "@/components/Dashboard/ui/StatusChip";

const ACTIVE_STATUSES = ["pending", "confirmed", "ongoing"];

const card =
  "rounded-[22px] border border-gray-200/70 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:border-white/[0.08] dark:bg-[#111214] dark:shadow-none";

export default function MyTripsPage() {
  const { user } = useCurrentUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("upcoming");

  const load = () => {
    if (!user?.email) return;
    setLoading(true);

    getBookingsByCustomerEmail(user.email).then((data) => {
      setBookings(data);
      setLoading(false);
    });
  };

  useEffect(load, [user?.email]);

  const cancelBooking = async (id) => {
    await requestBookingCancellation(id);
    load();
  };

  const downloadInvoice = async (id) => {
    const invoice = await getInvoiceByBookingId(id);
    if (invoice) generateInvoicePdf(invoice);
  };

  const upcoming = bookings.filter((b) =>
    ACTIVE_STATUSES.includes(b.status)
  );

  const past = bookings.filter(
    (b) => !ACTIVE_STATUSES.includes(b.status)
  );

  const rows = tab === "upcoming" ? upcoming : past;

  return (
    <div className="space-y-7 pb-10">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            My journeys
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Your trips
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your upcoming adventures and travel history.
          </p>
        </div>

        <Link
          href="/all-destinations"
          className="button-primary rounded-xl px-4 py-2.5 text-sm shadow-sm"
        >
          + Plan a new trip
        </Link>
      </header>

      {/* Tabs */}
      <div className="flex w-fit items-center rounded-2xl border border-gray-200/70 bg-gray-50/80 p-1.5 dark:border-white/[0.08] dark:bg-white/[0.035]">
        {["upcoming", "past"].map((t) => {
          const active = tab === t;
          const count = t === "upcoming" ? upcoming.length : past.length;

          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold capitalize transition-all ${
                active
                  ? "bg-white text-gray-900 shadow-sm dark:bg-white/10 dark:text-white"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              {t}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "bg-gray-200/70 text-gray-500 dark:bg-white/10 dark:text-gray-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid gap-5 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-[22px] bg-gray-100 dark:bg-white/[0.045]"
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && !rows.length && (
        <div className={`${card} relative overflow-hidden py-20 text-center`}>
          <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              ✈
            </div>

            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              No {tab} trips yet
            </p>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-gray-400">
              Your next adventure is waiting. Explore destinations and
              start planning something memorable.
            </p>

            <Link
              href="/all-destinations"
              className="button-primary mt-5 inline-flex rounded-xl px-4 py-2 text-sm"
            >
              Explore destinations
            </Link>
          </div>
        </div>
      )}

      {/* Trips */}
      {!loading && rows.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2">
          {rows.map((b) => (
            <article
              key={b.id}
              className={`${card} group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)] dark:hover:border-white/[0.14]`}
            >
              {/* Top accent */}
              <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/70 to-transparent opacity-80" />

              <div className="p-5">
                {/* Destination */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-400">
                      Trip · {b.id}
                    </p>

                    <h3 className="mt-1.5 truncate text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                      {b.destination}
                    </h3>

                    <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                      {b.package}
                    </p>
                  </div>

                  <StatusChip status={b.status} />
                </div>

                {/* Details */}
                <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 dark:border-white/[0.06] dark:bg-white/[0.06]">
                  {[
                    ["Travel date", formatDate(b.travelDate)],
                    ["Travelers", b.travelers],
                    ["Amount", formatCurrency(b.amount)],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="bg-white p-3.5 dark:bg-[#151618]"
                    >
                      <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                        {label}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {value}
                      </p>
                    </div>
                  ))}

                  <div className="bg-white p-3.5 dark:bg-[#151618]">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                      Payment
                    </p>

                    <div className="mt-1">
                      <StatusChip status={b.paymentStatus} />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {(b.status === "pending" || b.status === "confirmed") && (
                    <button
                      onClick={() => cancelBooking(b.id)}
                      className="rounded-xl border border-red-200/80 px-3.5 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-400/20 dark:text-red-400 dark:hover:bg-red-400/10"
                    >
                      Request cancellation
                    </button>
                  )}

                  <button
                    onClick={() => downloadInvoice(b.id)}
                    className="rounded-xl border border-gray-200 px-3.5 py-2 text-xs font-semibold text-gray-700 transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary dark:border-white/10 dark:text-gray-300 dark:hover:bg-primary/10 dark:hover:text-primary"
                  >
                    Download invoice
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}