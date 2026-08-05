"use client";

import Calender from "@/components/Dashboard/Admin/Home/Calender/Calender";
import Overview from "@/components/Dashboard/Admin/Overview/Overview";
import CustomerOverview from "@/components/Dashboard/Customer/CustomerOverview";
import AgentOverview from "@/components/Dashboard/Agent/AgentOverview";
import SupportOverview from "@/components/Dashboard/Support/SupportOverview";
import ReviewSlider from "@/components/Dashboard/Admin/ReviewSlider/ReviewSlider";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ROLES } from "@/config/roles";

const DashboardPage = () => {
  const { user, loading } = useCurrentUser();

  if (loading || !user) {
    return <div className="py-16 text-center text-gray-400">Loading your dashboard…</div>;
  }

  if (user.role === ROLES.CUSTOMER) {
    return <CustomerOverview />;
  }

  if (user.role === ROLES.TRAVEL_AGENT) {
    return <AgentOverview />;
  }

  if (user.role === ROLES.CUSTOMER_SUPPORT) {
    return <SupportOverview />;
  }

  return (
    <div className="space-y-8 pb-8">
      <Overview />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <Calender />
      </div>
      <ReviewSlider />
    </div>
  );
};

export default DashboardPage;
