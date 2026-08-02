import ComingSoon from "@/components/Dashboard/ui/ComingSoon";

const ManagePayments = () => (
  <ComingSoon
    title="Payments & Invoices"
    description="Invoice generation and payment history will connect directly to the booking records already live in this dashboard."
    plannedFeatures={[
      "Professional, downloadable invoices",
      "Payment & refund history per booking",
      "Tax breakdown, discounts, and credit notes",
      "Coupon engine tied to the booking flow",
    ]}
  />
);

export default ManagePayments;
