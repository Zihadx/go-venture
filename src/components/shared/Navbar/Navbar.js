"use client";

import React, { useRef } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import NavbarPart1 from "./NavbarPart1";
import SearchIcon from "@mui/icons-material/Search";
import logo2 from "@/assets/logo/logo-2.png";
import { signOut } from "next-auth/react";
import { Avatar, Typography } from "@mui/material";

const NavItems = [
  { route: "Home", pathname: "/" },
  { route: "Destinations", pathname: "/all-destinations" },
  { route: "News", pathname: "/all-blogs" },
  { route: "Dashboard", pathname: "/dashboard" },
];

const Navbar = ({ session }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:960px)");
  const searchRef = useRef(null);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      
      <AppBar
        position="static"
        className="bg-transparent shadow-none z-20 absolute md:px-16"
      >
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
                <Image
                  src={logo2}
                  className="w-[200px] h-18 py-2"
                  alt="logo2"
                />
              </Box>
              {!isMobile && (
                <Box sx={{ display: "flex" }}>
                  {NavItems.map((item) => (
                    <Link key={item.route} href={item.pathname}>
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
              style={{ top: "40px" }}
              ref={searchRef}
            >
              <div className="relative w-full max-w-lg mb-4 mx-4">
                <input
                  type="text"
                  className="border border-gray-300 rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-1 focus:ring-[#2095ae] transition-all duration-300"
                  placeholder="Search..."
                />
                <SearchIcon className="text-primary absolute left-4 top-1/2 transform -translate-y-1/2" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AppBar>

      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
            }}
          >
            {session?.user ? (
              <>
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  width={100}
                  height={100}
                  className="h-20 w-20 rounded-full"
                />
                <Typography variant="h6">{session.user.name}</Typography>
                <Button
                  className="bg-primary"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  View Profile
                </Button>
              </>
            ) : (
              <>
                <Avatar className="h-20 w-20" />
                <Link href="/login">
                  <Button
                    className="text-white bg-primary p-1 mt-4 rounded-md"
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </Button>
                </Link>
              </>
            )}
          </Box>
          <List>
            {NavItems.map((item) => (
              <Link key={item.route} href={item.pathname}>
                <ListItem component="a">
                  <ListItemText primary={item.route} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <Box />
          <Box sx={{ display: "flex", justifyContent: "start", padding: 2 }}>
            {session?.user ? (
              <Button
                onClick={() => signOut()}
                className="text-white bg-primary p-2 rounded-md"
                variant="contained"
                color="primary"
              >
                Log out
              </Button>
            ) : (
              " "
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
