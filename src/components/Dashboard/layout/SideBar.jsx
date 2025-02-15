import React from "react";
import Link from "next/link";
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import TourIcon from "@mui/icons-material/Tour";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Report";
import SupportIcon from "@mui/icons-material/Support";
import CloseIcon from "@mui/icons-material/Close"; 
import Image from "next/image";
import logo from "@/assets/logo/logo.png";

const Sidebar = ({ isOpen, toggleDrawer }) => {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, link: "/dashboard" },
    { text: "Manage Users", icon: <PeopleIcon />, link: "/dashboard/admin/users" },
    { text: "Manage Bookings", icon: <BookIcon />, link: "/dashboard/admin/bookings" },
    { text: "Manage Tours", icon: <TourIcon />, link: "/dashboard/admin/tours" },
    { text: "Manage Reviews", icon: <ReviewsIcon />, link: "/dashboard/admin/reviews" },
    { text: "Manage Payments", icon: <PaymentIcon />, link: "/dashboard/admin/payments" },
    { text: "Settings", icon: <SettingsIcon />, link: "/dashboard" },
    { text: "Reports", icon: <ReportIcon />, link: "/dashboard" },
    { text: "Support", icon: <SupportIcon />, link: "/dashboard" }
  ];

  return (
    <div
      className={`h-screen transition-all duration-300 overflow-y-scroll ${
        isOpen ? "w-64" : "w-20"
      } bg-white border-r relative`}
    >
      {/* Close Button for Mobile------------- */}
      <div className="md:hidden absolute top-2 right-2">
        <IconButton onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
      </div>

      {/* Logo Section------------ */}
      <Link href="/" className="flex items-center p-4">
        <Image src={logo} alt="Logo" width={40} height={40} />
        <h1 className={`text-xl font-bold ml-2 ${isOpen ? "block" : "hidden"} transition-all duration-300`}>
          Go Ventures
        </h1>
      </Link>

      {/* Menu Items---------------- */}
      <List>
        {menuItems.map((item, index) => (
          <Link href={item.link} key={index} onClick={toggleDrawer}>
            <ListItem button className="flex items-center">
              <ListItemIcon className="min-w-[40px]">{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                className={`text-sm ${isOpen ? "block" : "hidden"} transition-all duration-300`}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
