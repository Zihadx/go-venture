"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import NavbarPart1 from "./NavbarPart1";

import logo from "@/assets/logo/logo.png";
import logo1 from "@/assets/logo/logo-1.png";
import logo2 from "@/assets/logo/logo-2.png";

const useStyles = makeStyles((theme) => ({
  searchIcon: {
    color: "#2095ae",
    position: "absolute",
    left: "3px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  input: {
    "&::placeholder": {
      color: "#2095ae",
    },
    "&:focus": {
      outlineColor: "#2095ae",
    },
  },
}));

const NavItems = [
  { route: "Home", pathname: "/" },
  { route: "Categories", pathname: "/categories" },
  { route: "Pages", pathname: "/pages" },
  { route: "Dashboard", pathname: "/dashboard" },
  { route: "News", pathname: "/news" },
  { route: "Contact", pathname: "/contact" },
];

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:960px)");
  const classes = useStyles();

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <NavbarPart1 />
      <AppBar position="static" className=" bg-transparent shadow-none z-20 absolute md:px-16">
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
                <Image src={logo2} className=" w-[200px] h-18 py-2" alt="logo2" />
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
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{
                  opacity: isSearchOpen ? 1 : 0,
                  x: isSearchOpen ? 0 : "100%",
                }}
                transition={{ duration: 0.3 }}
                className={isSearchOpen ? "relative text-black ml-2" : "hidden"}
              >
                <input
                  type="text"
                  className={`border border-gray-300 rounded-md py-2 pl-10 pr-4 block ${classes.input}`}
                  placeholder="Search..."
                />
                <SearchIcon className={classes.searchIcon} />
              </motion.div>
              <IconButton
                color="inherit"
                aria-label="search"
                onClick={handleSearchClick}
                sx={{ ml: 2 }}
              >
                <SearchIcon className={classes.searchIcon} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
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
          {/* Additional items for drawer can be added here */}
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
