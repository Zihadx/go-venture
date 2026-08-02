import ComingSoon from "@/components/Dashboard/ui/ComingSoon";

const SystemSettings = () => (
  <ComingSoon
    title="System Settings"
    description="Super Admin-only controls for the platform itself."
    plannedFeatures={[
      "Role & permission management UI",
      "Email template placeholders",
      "Audit logs & activity logs",
      "Multi-currency and multi-language configuration",
    ]}
  />
);

export default SystemSettings;
