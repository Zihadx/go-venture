export type ReviewStatus = "pending" | "approved" | "hidden";

export interface Review {
  id: string;
  bookingId: string;
  customer: { name: string; email: string };
  destination: string;
  packageName: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
  createdAt: string;
  agencyReply: string | null;
}

export interface ReviewListFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: ReviewStatus | "all";
  minRating?: number;
}
