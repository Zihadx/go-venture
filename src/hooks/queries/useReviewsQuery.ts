import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReviews, getReviewSummary, setReviewStatus, replyToReview } from "@/services/reviews.service";
import type { ReviewListFilters, ReviewStatus } from "@/types/review";

export function useReviewsQuery(filters: ReviewListFilters) {
  return useQuery({
    queryKey: ["reviews", filters],
    queryFn: () => getReviews(filters),
    placeholderData: (prev) => prev,
  });
}

export function useReviewSummaryQuery() {
  return useQuery({ queryKey: ["reviews-summary"], queryFn: getReviewSummary });
}

export function useSetReviewStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ReviewStatus }) => setReviewStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews-summary"] });
    },
  });
}

export function useReplyToReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reply }: { id: string; reply: string }) => replyToReview(id, reply),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });
}
