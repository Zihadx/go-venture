import React, { useState } from 'react';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import SearchIcon from '@mui/icons-material/Search';

const DashNavbar = ({ toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <nav className="bg-white p-4 border-b fixed w-full flex items-center justify-between z-50 shadow">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <IconButton onClick={toggleSidebar} className="hidden md:block">
            <MenuIcon />
          </IconButton>
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-10">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <IconButton>
            <NotificationsIcon className="text-gray-600" />
          </IconButton>

          {/* Messages */}
          <IconButton>
            <MessageIcon className="text-gray-600" />
          </IconButton>

          {/* Profile */}
          <div>
            <img
              src="https://via.placeholder.com/40"
              alt="User Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={handleProfileClick}
            />
          </div>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleProfileClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              style: {
                maxHeight: '200px',
                width: '200px',
                overflow: 'hidden',
              },
            }}
          >
            <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileClose}>Settings</MenuItem>
            <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
          </Menu>
        </div>
      </nav>
      <Divider />
    </div>
  );
};

export default DashNavbar;
