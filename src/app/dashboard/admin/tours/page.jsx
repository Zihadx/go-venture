import ComingSoon from "@/components/Dashboard/ui/ComingSoon";

const ManageTours = () => (
  <ComingSoon
    title="Packages & Tours"
    description="Full package management — pricing, availability, seasonal rates, and inventory — ships in the next build phase."
    plannedFeatures={[
      "Create and edit tour packages with itinerary builder",
      "Seasonal & dynamic pricing rules",
      "Availability calendar with inventory caps",
      "Hotel, flight, and vehicle add-ons per package",
    ]}
  />
);

export default ManageTours;
