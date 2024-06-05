"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { IconButton, Typography, Menu, MenuItem } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import { signOut, signIn } from "next-auth/react";

const NavbarPart1 = ({ session }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isLargeScreen = useMediaQuery("(min-width: 960px)");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (!isLargeScreen) {
    return null;
  }

  return (
    <AppBar position="static" className="bg-[#2095ae] px-16">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box className="w-full flex items-center">
            <IconButton size="large" edge="start" color="inherit" aria-label="facebook">
              <Facebook />
            </IconButton>
            <IconButton size="large" edge="start" color="inherit" aria-label="twitter">
              <Twitter />
            </IconButton>
            <IconButton size="large" edge="start" color="inherit" aria-label="instagram">
              <Instagram />
            </IconButton>
            <IconButton size="large" edge="start" color="inherit" aria-label="linkedin">
              <LinkedIn />
            </IconButton>
            <Typography className="mx-5 px-2 text-sm border-l-2 border-r-2">+011 234 567 89</Typography>
            <Typography className="text-sm">goventure@gmail.com</Typography>
          </Box>

          <Box className="w-full flex justify-end text-white">
            {session ? (
              <>
                <IconButton onClick={handleMenuClick} color="inherit">
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Link href="/login" passHref>
                <Button className="text-white">Login</Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavbarPart1;
