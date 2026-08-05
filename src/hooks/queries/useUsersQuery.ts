import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, updateUserRole, updateUserStatus } from "@/services/dashboard.service";

interface UsersFilters {
  page: number;
  pageSize: number;
  search: string;
  role: string;
  status: string;
}

export function useUsersQuery(filters: UsersFilters) {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => getUsers(filters),
    placeholderData: (prev) => prev, // keeps the current page visible while the next page loads, instead of flashing to a loading state
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) => updateUserRole(userId, role),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: string }) => updateUserStatus(userId, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}
