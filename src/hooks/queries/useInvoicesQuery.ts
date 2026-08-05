import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "@/services/billing.service";
import type { InvoiceListFilters } from "@/types/billing";

export function useInvoicesQuery(filters: InvoiceListFilters) {
  return useQuery({
    queryKey: ["invoices", filters],
    queryFn: () => getInvoices(filters),
    placeholderData: (prev) => prev,
  });
}
