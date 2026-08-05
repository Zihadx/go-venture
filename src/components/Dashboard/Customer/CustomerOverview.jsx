"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { getBookingsByCustomerEmail } from "@/services/dashboard.service";
import { getWishlist, getTickets } from "@/services/customer.service";
import useCurrentUser from "@/hooks/useCurrentUser";
import { formatCurrency, formatDate } from "@/utils/format";
import StatusChip from "@/components/Dashboard/ui/StatusChip";
import StatCard from "@/components/Dashboard/ui/StatCard";

const ACTIVE_STATUSES = ["pending", "confirmed", "ongoing"];

export default function CustomerOverview() {
  const { user } = useCurrentUser();
  const [bookings, setBookings] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [openTickets, setOpenTickets] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    Promise.all([
      getBookingsByCustomerEmail(user.email),
      getWishlist(user.email),
      getTickets({ email: user.email }),
    ]).then(([bk, wl, tk]) => {
      setBookings(bk);
      setWishlistCount(wl.length);
      setOpenTickets(tk.filter((t) => t.status !== "resolved").length);
      setLoading(false);
    });
  }, [user?.email]);

  const upcoming = bookings.filter((b) => ACTIVE_STATUSES.includes(b.status));

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-24 rounded-xl bg-gray-100 animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome back, {user.name?.split(" ")[0]} 👋</h2>
        <p className="text-gray-500">Here&apos;s what&apos;s happening with your travel plans.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard icon={<FlightTakeoffOutlinedIcon />} label="Upcoming trips" value={upcoming.length} accent="#2095ae" />
        <StatCard icon={<FavoriteBorderOutlinedIcon />} label="Wishlist" value={wishlistCount} accent="#DC2626" />
        <StatCard icon={<SupportAgentOutlinedIcon />} label="Open support tickets" value={openTickets} accent="#7A316F" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">Upcoming trips</h3>
          <Link href="/dashboard/customer/trips" className="text-sm text-primary font-semibold hover:underline">View all</Link>
        </div>
        {upcoming.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-2">No upcoming trips yet.</p>
            <Link href="/trips" className="button-primary text-sm py-2 px-4 inline-block">Browse trips</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.slice(0, 4).map((b) => (
              <div key={b.id} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                <div>
                  <p className="font-semibold text-gray-800">{b.destination}</p>
                  <p className="text-xs text-gray-400">{formatDate(b.travelDate)} · {b.travelers} traveler{b.travelers > 1 ? "s" : ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">{formatCurrency(b.amount)}</span>
                  <StatusChip status={b.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
