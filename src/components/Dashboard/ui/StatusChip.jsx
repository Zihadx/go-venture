import Chip from "@mui/material/Chip";

const STATUS_STYLES = {
  // booking statuses
  pending: { bg: "#FEF3C7", fg: "#92400E" },
  confirmed: { bg: "#DBEAFE", fg: "#1E40AF" },
  ongoing: { bg: "#E0E7FF", fg: "#3730A3" },
  completed: { bg: "#D1FAE5", fg: "#065F46" },
  cancelled: { bg: "#FEE2E2", fg: "#991B1B" },
  refund_requested: { bg: "#FCE7F3", fg: "#9D174D" },
  // payment statuses
  paid: { bg: "#D1FAE5", fg: "#065F46" },
  partial: { bg: "#FEF3C7", fg: "#92400E" },
  unpaid: { bg: "#FEE2E2", fg: "#991B1B" },
  refunded: { bg: "#E5E7EB", fg: "#374151" },
  // user statuses
  active: { bg: "#D1FAE5", fg: "#065F46" },
  suspended: { bg: "#FEE2E2", fg: "#991B1B" },
  pending_review: { bg: "#FEF3C7", fg: "#92400E" },
};

const LABEL_OVERRIDES = {
  refund_requested: "Refund requested",
  pending_review: "Pending review",
};

export default function StatusChip({ status, size = "small" }) {
  const style = STATUS_STYLES[status] || { bg: "#E5E7EB", fg: "#374151" };
  const label = LABEL_OVERRIDES[status] || (status || "").replace(/_/g, " ");
  return (
    <Chip
      size={size}
      label={label}
      sx={{
        bgcolor: style.bg,
        color: style.fg,
        fontWeight: 600,
        textTransform: "capitalize",
        fontSize: "0.72rem",
      }}
    />
  );
}
