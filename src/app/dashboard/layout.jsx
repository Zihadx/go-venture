"use client"
import React, { useState } from "react";
import DashFooter from "@/components/Dashboard/DashFooter/DashFooter";
import DashNavbar from "@/components/Dashboard/DashNavbar/DashNavbar";

import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
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
    <div className="flex min-h-screen">
      {/*------Sidebar for large screens-----*/}
      <div className={`hidden md:block lg:sticky top-0 self-start overflow-y-scroll md:h-screen scrollbar-hide transition-all duration-300 ${sidebarOpen ? 'w-1/3' : 'w-20'}`}>
        <div className=" border-r h-full">
          
          <Sidebar isOpen={sidebarOpen} />
        </div>
      </div>
      {/* -------Drawer for small screens------*/}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        className="md:hidden"
      >
        <Sidebar isOpen={true} />
      </Drawer>
      <div className="flex-grow">
        <IconButton className="md:hidden" onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
        <DashNavbar toggleSidebar={toggleSidebar}/>
        <div className="mt-24 px-8">
          {children}
        </div>
        <DashFooter />
      </div>
    </div>
  );
};

export default DashboardLayout;
