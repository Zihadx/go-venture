import React, { useState } from 'react';
import { Divider, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

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
      <div className="bg-white p-4 w-full z-50 overflow-hidden static">
        <div className="flex items-center justify-between w-full px-4">
          <div className="flex items-center gap-4">
            <IconButton onClick={toggleSidebar} className="hidden md:block">
              <MenuIcon />
            </IconButton>
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          </div>

          <div>
            <h1 className="bg-red-400 font-semibold text-xl p-2">Hi</h1>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default DashNavbar;
