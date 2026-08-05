import { MOCK_BOOKINGS } from "@/services/mock/mockDb";
import type { Review, ReviewStatus } from "@/types/review";

const COMMENTS = [
  "Everything was smooth from booking to the actual trip. Our guide really knew the area.",
  "Good value for the price, though the hotel could have been closer to the main sights.",
  "One of the best trips we've taken. The itinerary was well paced, not rushed at all.",
  "The add-on insurance saved us when a flight got delayed — glad we picked it.",
  "Communication was a bit slow before the trip, but everything on the ground was excellent.",
  "Loved the flexibility. We swapped one activity and the agent sorted it out same day.",
  "Great trip overall. Would book again, just wish there was more free time on day 3.",
  "Exceeded expectations — the accommodation upgrade was a nice surprise.",
];

const STATUS_WEIGHTS: ReviewStatus[] = ["approved", "approved", "approved", "pending", "pending", "hidden"];

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(20260804);
const pick = <T,>(arr: T[]): T => arr[Math.floor(rng() * arr.length)];

function daysAfter(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

const completedBookings = (MOCK_BOOKINGS as any[]).filter((b) => b.status === "completed");

export const MOCK_REVIEWS: Review[] = completedBookings.map((b, i) => {
  const status = pick(STATUS_WEIGHTS);
  return {
    id: `REV-${3000 + i}`,
    bookingId: b.id,
    customer: b.customer,
    destination: b.destination,
    packageName: b.package,
    rating: 3 + Math.floor(rng() * 3), // 3-5 stars, mock data skews positive like most real review sets
    comment: pick(COMMENTS),
    status,
    createdAt: daysAfter(b.travelDate, 3),
    agencyReply: status === "approved" && i % 3 === 0 ? "Thank you so much for the kind words — we'll pass this along to your guide!" : null,
  };
});
