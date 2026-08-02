import ComingSoon from "@/components/Dashboard/ui/ComingSoon";

const ManageReviews = () => (
  <ComingSoon
    title="Reviews"
    description="Review moderation queue for customer feedback on completed trips."
    plannedFeatures={[
      "Approve, hide, or flag customer reviews",
      "Respond to reviews as an agency",
      "Star-rating breakdown per destination",
    ]}
  />
);

export default ManageReviews;
