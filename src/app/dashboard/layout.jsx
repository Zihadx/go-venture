"use client";

import React, { useState } from "react";
import DashFooter from "@/components/Dashboard/DashFooter/DashFooter";
import DashNavbar from "@/components/Dashboard/DashNavbar/DashNavbar";

import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Sidebar from "@/components/Dashboard/layout/SideBar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for large screens */}
      <div
        className={`fixed top-0 left-0 z-10 h-full overflow-y-auto transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } border-r bg-white`}
      >
        <Sidebar isOpen={sidebarOpen} />
      </div>

      {/* Drawer for small screens */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Improves performance on mobile
        className="md:hidden"
      >
        <Sidebar isOpen={true} />
      </Drawer>

      {/* Main Content */}
      <div
        className={`flex flex-col flex-grow transition-all duration-300 ml-${sidebarOpen ? "64" : "20"}`}
        style={{
          marginLeft: sidebarOpen ? "256px" : "80px", // Adjust width based on sidebar
        }}
      >
        {/* Navbar */}
        <DashNavbar toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <main className="flex-grow mt-10 px-4 md:px-8 overflow-x-hidden overflow-y-auto">
          {children}
        </main>

        {/* Footer */}
        <DashFooter />
      </div>
    </div>
  );
};

export default DashboardLayout;
