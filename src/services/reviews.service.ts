import { MOCK_REVIEWS } from "@/services/mock/mockReviews";
import type { Review, ReviewListFilters, ReviewStatus } from "@/types/review";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

let reviewsStore: Review[] = [...MOCK_REVIEWS];

export async function getReviews({ page = 0, pageSize = 10, search = "", status = "all", minRating = 0 }: ReviewListFilters = {}) {
  await delay();
  let rows = reviewsStore;
  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter((r) => r.customer.name.toLowerCase().includes(q) || r.destination.toLowerCase().includes(q) || r.comment.toLowerCase().includes(q));
  }
  if (status !== "all") rows = rows.filter((r) => r.status === status);
  if (minRating > 0) rows = rows.filter((r) => r.rating >= minRating);
  rows = [...rows].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const total = rows.length;
  const start = page * pageSize;
  return { data: rows.slice(start, start + pageSize), total };
}

export async function getReviewSummary() {
  await delay(200);
  const total = reviewsStore.length;
  const pending = reviewsStore.filter((r) => r.status === "pending").length;
  const avgRating = total ? Math.round((reviewsStore.reduce((s, r) => s + r.rating, 0) / total) * 10) / 10 : 0;
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviewsStore.filter((r) => r.rating === star).length,
  }));
  return { total, pending, avgRating, distribution };
}

export async function setReviewStatus(id: string, status: ReviewStatus): Promise<Review | undefined> {
  await delay(200);
  reviewsStore = reviewsStore.map((r) => (r.id === id ? { ...r, status } : r));
  return reviewsStore.find((r) => r.id === id);
}

export async function replyToReview(id: string, reply: string): Promise<Review | undefined> {
  await delay(250);
  reviewsStore = reviewsStore.map((r) => (r.id === id ? { ...r, agencyReply: reply } : r));
  return reviewsStore.find((r) => r.id === id);
}
