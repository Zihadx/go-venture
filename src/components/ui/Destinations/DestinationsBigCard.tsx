"use client";

import Image from "next/image";
import Link from "next/link";
import { Rating } from "@mui/material";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";

import type { Destination } from "./types";
import { formatDate, formatLatLng, formatPrice, getCoordinates } from "./utils";

interface Props {
  destination: Destination;
  /** Flies the atlas to this destination. The pin only shows when coordinates exist. */
  onLocate?: (id: string) => void;
}

const DestinationsBigCard = ({ destination, onLocate }: Props) => {
  const href = `/all-destinations/${destination._id}`;
  const cover = destination.image?.[0];
  const coords = getCoordinates(destination.locations);
  const rating = Number(destination.ratingAverage) || 0;

  return (
    <article className="group relative grid overflow-hidden rounded-[2rem] bg-[#F1E8D0] text-[#051A1F] shadow-xl lg:grid-cols-[1.25fr_1fr] lg:rounded-[2.5rem]">
      {/* ------------------------------ Photo ------------------------------ */}
      <div className="relative min-h-[400px] overflow-hidden bg-[#0A2730] sm:min-h-[540px] lg:min-h-[500px]">
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="absolute inset-0"
        >
          {cover && (
            <Image
              src={cover}
              alt={destination.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.05]"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#051A1F]/70 via-transparent to-[#051A1F]/20" />

        <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 py-2 pl-3 pr-4 text-xs font-medium text-white backdrop-blur-xl sm:left-8 sm:top-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7FD6E8] shadow-[0_0_10px_2px_rgba(127,214,232,0.8)]" />
          Featured trip
        </span>

        {coords && onLocate && (
          <button
            type="button"
            onClick={() => onLocate(destination._id)}
            className="absolute bottom-5 left-5 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-black/25 py-2.5 pl-3.5 pr-5 text-sm font-medium text-white backdrop-blur-xl transition duration-300 hover:border-white hover:bg-white hover:text-[#051A1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7FD6E8] sm:bottom-8 sm:left-8"
          >
            <PlaceOutlined sx={{ fontSize: 19 }} />
            Show on map
            <span className="hidden text-xs font-normal opacity-60 sm:inline">
              {formatLatLng(coords)}
            </span>
          </button>
        )}
      </div>

      {/* ------------------------------ Ticket ------------------------------ */}
      <div className="relative flex flex-col p-6 pt-9 sm:p-9 sm:pt-11 lg:p-11">
        {/* Perforation: two notches cut into the seam + a dashed tear line */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#051A1F]"
        />
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 h-7 w-7 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#051A1F] lg:bottom-0 lg:left-0 lg:right-auto lg:top-auto lg:-translate-x-1/2 lg:translate-y-1/2"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-8 top-0 border-t-2 border-dashed border-[#051A1F]/15 lg:bottom-9 lg:left-0 lg:right-auto lg:top-9 lg:border-l-2 lg:border-t-0"
        />

        <p className="flex items-center gap-1.5 text-sm font-medium text-[#1B7F94]">
          <LocationOnOutlined sx={{ fontSize: 18 }} />
          {destination.locations?.city},{" "}
          {destination.locations?.country?.countryId}
        </p>

        <h2 className="mt-5 font-serif text-[clamp(2.4rem,4vw,3.9rem)] leading-[0.98] tracking-[-0.035em]">
          {destination.title}
        </h2>

        <div className="mt-5 flex items-center gap-3">
          <Rating
            name="destination-rating"
            value={rating}
            precision={0.25}
            readOnly
            size="small"
            sx={{
              "& .MuiRating-iconFilled": { color: "#1B7F94" },
              "& .MuiRating-iconEmpty": { color: "rgba(5,26,31,0.16)" },
            }}
          />
          <span className="text-sm text-[#051A1F]/60">
            <span className="font-semibold text-[#051A1F]">
              {destination.ratingAverage}
            </span>{" "}
            ({destination.ratingQuantity} reviews)
          </span>
        </div>

        <p className="mt-6 line-clamp-4 max-w-md text-[15px] leading-7 text-[#051A1F]/65">
          {destination.description}
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-dashed border-[#051A1F]/20 pt-6 lg:mt-auto">
          <div>
            <dt className="flex items-center gap-1.5 text-xs text-[#051A1F]/50">
              <ScheduleRounded sx={{ fontSize: 15 }} />
              Duration
            </dt>
            <dd className="mt-1.5 text-lg font-semibold tracking-[-0.01em]">
              {destination.durationDays} days
            </dd>
          </div>

          <div>
            <dt className="flex items-center gap-1.5 text-xs text-[#051A1F]/50">
              <CalendarMonthOutlined sx={{ fontSize: 15 }} />
              Next departure
            </dt>
            <dd className="mt-1.5 text-lg font-semibold tracking-[-0.01em]">
              {formatDate(destination.startDate)}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex items-end justify-between gap-4">
          <div>
            <span className="block text-xs text-[#051A1F]/50">From</span>
            <span className="font-serif text-[2.6rem] leading-none tracking-[-0.03em] sm:text-5xl">
              {formatPrice(destination.packagePrice)}
            </span>
            <span className="ml-1.5 text-xs text-[#051A1F]/50">per person</span>
          </div>

          <Link
            href={href}
            className="group/cta inline-flex items-center gap-3 rounded-full bg-[#051A1F] py-2 pl-6 pr-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#1B7F94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B7F94] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F1E8D0]"
          >
            <span className="hidden sm:inline">Explore this destination</span>
            <span className="sm:hidden">Explore</span>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#EBDDBB] text-[#051A1F] transition duration-300 group-hover/cta:rotate-45">
              <ArrowOutwardRounded sx={{ fontSize: 20 }} />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default DestinationsBigCard;