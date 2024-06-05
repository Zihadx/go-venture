"use client";

import React, { useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles } from "@mui/styles";
import { motion, AnimatePresence } from "framer-motion";
import NavbarPart1 from "./NavbarPart1";
import SearchIcon from "@mui/icons-material/Search";
import logo2 from "@/assets/logo/logo-2.png";

const useStyles = makeStyles((theme) => ({
  searchIcon: {
    color: "#2095ae",
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  closeIcon: {
    color: "#2095ae",
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  },
}));

const NavItems = [
  { route: "Home", pathname: "/" },
  { route: "Destinations", pathname: "/all-destinations" },
  { route: "News", pathname: "/all-blogs" },
  { route: "Dashboard", pathname: "/dashboard" },
];

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:960px)");
  const classes = useStyles();
  const searchRef = useRef(null);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <>
      <NavbarPart1 />
      <AppBar position="static" className="bg-transparent shadow-none z-20 absolute md:px-16">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon sx={{ color: "black" }} />
                </IconButton>
              )}
              <Box sx={{ flexGrow: 1 }}>
                <Image src={logo2} className="w-[200px] h-18 py-2" alt="logo2" />
              </Box>
              {!isMobile && (
                <Box sx={{ display: "flex" }}>
                  {NavItems.map((item) => (
                    <Link key={item.route} href={item.pathname} passHref>
                      <Button className="text-white" sx={{ ml: 2 }}>
                        {item.route}
                      </Button>
                    </Link>
                  ))}
                </Box>
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="search"
                onClick={handleSearchClick}
                sx={{ ml: 2 }}
              >
                {isSearchOpen ? (
                  <CloseIcon className="text-gray-100" />
                ) : (
                  <SearchIcon className="text-gray-100" />
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 20 }} 
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 right-0 flex justify-center items-center py-2 text-gray-700"
              style={{ top: '40px' }} 
              ref={searchRef}
            >
              <div className="relative w-full max-w-lg mb-4">
                <input
                  type="text"
                  className="border border-gray-300 rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-1 focus:ring-[#2095ae] transition-all duration-300"
                  placeholder="Search..."
                />
                <SearchIcon className={`${classes.searchIcon} text-gray-400`} />
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AppBar>

      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 1 }}>
            <IconButton
              color="inherit"
              aria-label="close drawer"
              onClick={handleDrawerToggle}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {NavItems.map((item) => (
              <Link key={item.route} href={item.pathname} passHref>
                <ListItem button component="a">
                  <ListItemText primary={item.route} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
