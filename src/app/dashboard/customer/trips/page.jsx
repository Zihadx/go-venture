"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBookingsByCustomerEmail, requestBookingCancellation } from "@/services/dashboard.service";
import useCurrentUser from "@/hooks/useCurrentUser";
import { formatCurrency, formatDate } from "@/utils/format";
import StatusChip from "@/components/Dashboard/ui/StatusChip";

const ACTIVE_STATUSES = ["pending", "confirmed", "ongoing"];

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

  const upcoming = bookings.filter((b) => ACTIVE_STATUSES.includes(b.status));
  const past = bookings.filter((b) => !ACTIVE_STATUSES.includes(b.status));
  const rows = tab === "upcoming" ? upcoming : past;

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2">
          {["upcoming", "past"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
                tab === t ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t} ({t === "upcoming" ? upcoming.length : past.length})
            </button>
          ))}
        </div>
        <Link href="/trips" className="button-primary text-sm py-2 px-4">Book a new trip</Link>
      </div>

      {loading && <p className="text-gray-400 text-center py-10">Loading your trips…</p>}

      {!loading && rows.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500">No {tab} trips yet.</p>
          <Link href="/trips" className="text-primary font-semibold hover:underline text-sm">Browse trips to get started</Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {!loading && rows.map((b) => (
          <div key={b.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-400">{b.id}</p>
                <h3 className="font-bold text-gray-800">{b.destination}</h3>
                <p className="text-sm text-gray-500">{b.package}</p>
              </div>
              <StatusChip status={b.status} />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div><p className="text-xs text-gray-400">Travel date</p><p className="text-gray-700 font-medium">{formatDate(b.travelDate)}</p></div>
              <div><p className="text-xs text-gray-400">Travelers</p><p className="text-gray-700 font-medium">{b.travelers}</p></div>
              <div><p className="text-xs text-gray-400">Amount</p><p className="text-gray-700 font-medium">{formatCurrency(b.amount)}</p></div>
              <div><p className="text-xs text-gray-400">Payment</p><StatusChip status={b.paymentStatus} /></div>
            </div>
            {(b.status === "pending" || b.status === "confirmed") && (
              <button
                onClick={() => cancelBooking(b.id)}
                className="mt-4 text-sm font-semibold text-red-600 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50"
              >
                Request cancellation
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
