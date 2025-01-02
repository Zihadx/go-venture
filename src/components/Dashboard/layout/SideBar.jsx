import React from 'react';
import Link from 'next/link';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import TourIcon from '@mui/icons-material/Tour';
import ReviewsIcon from '@mui/icons-material/Reviews';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import ReportIcon from '@mui/icons-material/Report';
import SupportIcon from '@mui/icons-material/Support';
import Image from 'next/image';
import logo from '@/assets/logo/logo.png';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
    { text: 'Manage Users', icon: <PeopleIcon />, link: '/dashboard/admin/users' },
    { text: 'Manage Bookings', icon: <BookIcon />, link: '/dashboard/admin/bookings' },
    { text: 'Manage Tours', icon: <TourIcon />, link: '/dashboard/admin/tours' },
    { text: 'Manage Reviews', icon: <ReviewsIcon />, link: '/dashboard/admin/reviews' },
    { text: 'Manage Payments', icon: <PaymentIcon />, link: '/dashboard/admin/payments' },
    { text: 'Settings', icon: <SettingsIcon />, link: '/dashboard' },
    { text: 'Reports', icon: <ReportIcon />, link: '/dashboard' },
    { text: 'Support', icon: <SupportIcon />, link: '/dashboard' },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Image src={logo} alt="Logo" width={40} height={40} className="mr-2" />
        <h1 className={`text-xl font-bold ${isOpen ? 'block' : 'hidden'}`}>Go Ventures</h1>
      </div>
      <List>
        {menuItems.map((item, index) => (
          <Link href={item.link} key={index}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {isOpen && <ListItemText primary={item.text} />}
            </ListItem>
          </Link>
        ))}
      </List>
      {/* <Divider />
      <h1 className={`text-red-200 font-bold mt-4 ${isOpen ? 'block' : 'hidden'}`}>For Users</h1>
      <List>
        <ListItem button>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          {isOpen && <ListItemText primary="User Dashboard" />}
        </ListItem>
        <ListItem button>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          {isOpen && <ListItemText primary="My Profile" />}
        </ListItem>
        <ListItem button>
          <ListItemIcon><BookIcon /></ListItemIcon>
          {isOpen && <ListItemText primary="My Bookings" />}
        </ListItem>
        <ListItem button>
          <ListItemIcon><TourIcon /></ListItemIcon>
          {isOpen && <ListItemText primary="Favorite Tours" />}
        </ListItem>
        <ListItem button>
          <ListItemIcon><ReviewsIcon /></ListItemIcon>
          {isOpen && <ListItemText primary="My Reviews" />}
        </ListItem>
        <ListItem button>
          <ListItemIcon><PaymentIcon /></ListItemIcon>
          {isOpen && <ListItemText primary="Payment History" />}
        </ListItem>
        <ListItem button>
          <ListItemIcon><SupportIcon /></ListItemIcon>
          {isOpen && <ListItemText primary="Support" />}
        </ListItem>
        <ListItem button>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          {isOpen && <ListItemText primary="Settings" />}
        </ListItem>
      </List> */}
    </div>
  );
};

export default Sidebar;
