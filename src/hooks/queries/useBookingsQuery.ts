import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBookings, getBookingById, updateBookingStatus } from "@/services/dashboard.service";

interface BookingsFilters {
  page: number;
  pageSize: number;
  search: string;
  status: string;
  paymentStatus: string;
}

export function useBookingsQuery(filters: BookingsFilters) {
  return useQuery({
    queryKey: ["bookings", filters],
    queryFn: () => getBookings(filters),
    placeholderData: (prev) => prev,
  });
}

export function useBookingDetailQuery(id: string | null) {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBookingById(id as string),
    enabled: !!id,
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateBookingStatus(id, status),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking", variables.id] });
    },
  });
}
