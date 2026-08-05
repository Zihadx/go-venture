import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPackages, createPackage, updatePackage, setPackageStatus, deletePackage,
} from "@/services/packages.service";
import type { PackageInput, PackageListFilters, PackageStatus } from "@/types/package";

export function usePackagesQuery(filters: PackageListFilters) {
  return useQuery({
    queryKey: ["packages", filters],
    queryFn: () => getPackages(filters),
    placeholderData: (prev) => prev,
  });
}

export function useCreatePackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: PackageInput) => createPackage(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["packages"] }),
  });
}

export function useUpdatePackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: PackageInput }) => updatePackage(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["packages"] }),
  });
}

export function useSetPackageStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: PackageStatus }) => setPackageStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["packages"] }),
  });
}

export function useDeletePackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePackage(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["packages"] }),
  });
}
