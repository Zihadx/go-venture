"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getWishlist, toggleWishlist } from "@/services/customer.service";
import useCurrentUser from "@/hooks/useCurrentUser";
import TripCard from "@/components/ui/Trips/TripCard";

export default function WishlistPage() {
  const { user } = useCurrentUser();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    if (!user?.email) return;
    setLoading(true);
    getWishlist(user.email).then((data) => {
      setTrips(data);
      setLoading(false);
    });
  };

  useEffect(load, [user?.email]);

  const handleRemove = async (tripId) => {
    await toggleWishlist(user.email, tripId);
    load();
  };

  return (
    <div className="space-y-6 pb-8">
      <p className="text-sm text-gray-500">Trips you&apos;ve saved for later.</p>

      {loading && <p className="text-gray-400 text-center py-10">Loading wishlist…</p>}

      {!loading && trips.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500">Your wishlist is empty.</p>
          <Link href="/trips" className="text-primary font-semibold hover:underline text-sm">Explore trips</Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {!loading && trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} wishlisted onToggleWishlist={handleRemove} />
        ))}
      </div>
    </div>
  );
}
