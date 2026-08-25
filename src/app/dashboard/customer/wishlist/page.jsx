"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getWishlist, toggleWishlist } from "@/services/customer.service";
import useCurrentUser from "@/hooks/useCurrentUser";
import TripCard from "@/components/ui/Trips/TripCard";

const card =
  "rounded-[22px] border border-gray-200/70 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:border-white/[0.08] dark:bg-[#111214] dark:shadow-none";

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
    <div className="space-y-7 pb-10">
      {/* Header */}
      <header>
        <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
          Saved journeys
        </p>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Your wishlist
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Trips you&apos;ve saved for your next adventure.
            </p>
          </div>

          {!loading && trips.length > 0 && (
            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-400">
              {trips.length} {trips.length === 1 ? "trip" : "trips"} saved
            </span>
          )}
        </div>
      </header>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[300px] animate-pulse rounded-[22px] bg-gray-100 dark:bg-white/[0.045]"
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && trips.length === 0 && (
        <div className={`${card} relative overflow-hidden py-20 text-center`}>
          <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary">
              ♡
            </div>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Your wishlist is waiting
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-gray-400">
              Save destinations and experiences you love, then come back
              whenever you&apos;re ready to travel.
            </p>

            <Link
              href="/all-destinations"
              className="button-primary mt-5 inline-flex rounded-xl px-4 py-2 text-sm"
            >
              Explore trips
            </Link>
          </div>
        </div>
      )}

      {/* Wishlist */}
      {!loading && trips.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="group transition duration-300 hover:-translate-y-1"
            >
              <TripCard
                trip={trip}
                wishlisted
                onToggleWishlist={handleRemove}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}