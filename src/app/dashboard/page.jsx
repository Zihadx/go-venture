import Calender from "@/components/Dashboard/Admin/Home/Calender/Calender";
import GraphLayout from "@/components/Dashboard/Admin/Home/GraphLayout/GraphLayout";
import AdminHome from "@/components/Dashboard/Admin/Home/Home/Home";


const DashboardPage = () => {
  return (
    <div>
      <AdminHome/>
      <div className="flex justify-between gap-6 mt-10">
      <Calender/>
      <GraphLayout/>
      </div>
    </div>
  );
};

export default DashboardPage;








// import AdminHome from "@/components/Dashboard/Admin/Home";
// import DashNavbar from "@/components/Dashboard/DashNavbar/DashNavbar";
// import { Divider } from "@mui/material";
// import Link from "next/link";
// import React from "react";
// import Layout from "./layout";

// const DashboardPage = () => {
//   return (
//     <Layout>
//       <div className="flex justify-between">
//       <div className="w-2/12 p-4 border h-full lg:sticky top-0 self-start overflow-y-scroll md:h-screen scrollbar-hide">
//       <Link href='/dashboard/admin/destinationsManagement' className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Management</Link>
//         <h1 className="h-[1500px]">Sidebar</h1>
//         <h1>Sidebar</h1>
//       </div>
//       <div className="w-full">
//         <DashNavbar />
//         <Divider />
//         <div className="p-4 mt-12 bg-red-100">
//           <h1 className="h-[1400px]">Content</h1>
//         </div>
       
//         <div className="border-t mt-5">
//           <h1 className="text-center h-10 ">Footer--</h1>
//         </div>
//       </div>
//     </div>
//     </Layout>
//   );
// };

// export default DashboardPage;
