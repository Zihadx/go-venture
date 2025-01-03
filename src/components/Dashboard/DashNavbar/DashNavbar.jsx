import React from 'react';
import { Divider, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const DashNavbar = ({toggleSidebar}) => {
  return (
    <div>

      <nav className="bg-white p-4 border-b fixed w-full flex items-center gap-10 z-50">
        <div>
        <IconButton className='hidden md:block' onClick={toggleSidebar}>
            <MenuIcon />
           
          </IconButton>
        </div>
        {/* Add your navbar content here */}
        
        <h1>Dash Navbar- TO DO</h1>
      </nav>
      <Divider />
    </div>
  );
};

export default DashNavbar;
