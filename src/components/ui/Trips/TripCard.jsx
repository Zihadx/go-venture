"use client";

import Image from "next/image";
import Link from "next/link";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { formatCurrency } from "@/utils/format";

export default function TripCard({ trip, wishlisted = false, onToggleWishlist }) {
  return (
    <div className="group rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {onToggleWishlist && (
          <button
            onClick={(e) => { e.preventDefault(); onToggleWishlist(trip.id); }}
            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors"
            aria-label="Toggle wishlist"
          >
            {wishlisted ? (
              <FavoriteIcon sx={{ fontSize: 18, color: "#DC2626" }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 18, color: "#374151" }} />
            )}
          </button>
        )}
        <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-semibold rounded-full px-2.5 py-1">
          {trip.category}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
          <PlaceOutlinedIcon sx={{ fontSize: 14 }} />
          {trip.destination}
        </div>
        <h3 className="font-bold text-gray-800 leading-snug line-clamp-2 min-h-[2.7em]">{trip.title}</h3>
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <StarRoundedIcon sx={{ fontSize: 16, color: "#F59E0B" }} /> {trip.rating} ({trip.reviewCount})
          </span>
          <span className="flex items-center gap-1">
            <ScheduleOutlinedIcon sx={{ fontSize: 14 }} /> {trip.duration} days
          </span>
        </div>
        <div className="flex items-end justify-between mt-4">
          <div>
            <p className="text-[11px] text-gray-400">From</p>
            <p className="text-lg font-bold text-secondary">{formatCurrency(trip.pricePerHead)}</p>
          </div>
          <Link href={`/booking/${trip.id}`} className="button-primary text-sm py-2 px-4">
            View & Book
          </Link>
        </div>
      </div>
    </div>
  );
}
