"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {
  AccountCircleOutlined,
  Facebook,
  Instagram,
  LinkedIn,
  LogoutOutlined,
  Twitter,
} from "@mui/icons-material";
import {
  IconButton,
  Typography,
  Menu,
  Divider,
  Avatar,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import { signOut, signIn } from "next-auth/react";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";


const NavbarPart1 = ({ session }) => {
  const userInfo = getUserInfo();
  // console.log(userInfo);

  const router = useRouter();

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

  const handleLogOut = async () => {
    try {
      removeUserInfo();

      await signOut({
        redirect: false,
        callbackUrl: "/",
      });
      router.refresh();

      // console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <AppBar position="static" className="bg-[#2095ae] px-16">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box className="w-full flex items-center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="facebook"
            >
              <Facebook />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="twitter"
            >
              <Twitter />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="instagram"
            >
              <Instagram />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="linkedin"
            >
              <LinkedIn />
            </IconButton>
            <Typography className="mx-5 px-2 text-sm border-l-2 border-r-2">
              +011 234 567 89
            </Typography>
            <Typography className="text-sm">goventure@gmail.com</Typography>
          </Box>

          <Box className="w-full flex justify-end text-white">
            {session || userInfo ? (
              <>
                <IconButton onClick={handleMenuClick} color="inherit">
                  {userInfo?.image || session?.user?.image ? (
                    <Image
                      src={userInfo?.image || session?.user?.image}
                      alt={userInfo?.name || session?.user?.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <Avatar />
                  )}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <Box className=" flex flex-col justify-center items-center px-6 py-2 w-full">
                    {userInfo?.image || session?.user?.image ? (
                      <Image
                        src={userInfo?.image || session?.user?.image}
                        alt={userInfo?.name || session?.user?.name}
                        width={72}
                        height={72}
                        className="rounded-full"
                      />
                    ) : (

                      <Avatar />

                    )}
                    <Typography variant="h6" className="font-semibold">
                      {userInfo?.name || session?.user?.name}
                    </Typography>
                    <Typography variant="p" className="font-normal text-sm">
                      {userInfo?.email || session?.user?.email}
                    </Typography>

                    <Button
                      className="bg-primary mt-4"
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      View Profile
                    </Button>
                  </Box>
                  <Divider />
                  <Box className="px-6 py-2 w-full">
                    <Link href="/">
                      <Typography className="hover:text-primary">
                        Settings
                      </Typography>
                    </Link>
                    <Link href="/">
                      <Typography className="hover:text-primary">
                        Helps
                      </Typography>
                    </Link>
                    <Link href="/">
                      <Typography className="hover:text-primary">
                        Feedback
                      </Typography>
                    </Link>
                    <Link href="/">
                      <Typography className="hover:text-primary">
                        Bookings
                      </Typography>
                    </Link>
                    <Link href="/">
                      <Typography className="hover:text-primary">
                        Guide
                      </Typography>
                    </Link>

                    <Typography
                      onClick={handleLogOut}
                      className="text-primary flex items-center gap-1 cursor-pointer mt-2"
                      size="small"
                    >
                      Logout <LogoutOutlined fontSize="small" className="" />
                    </Typography>
                  </Box>
                </Menu>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 group flex justify-center items-center gap-2"
              >
                <AccountCircleOutlined />
                <Typography
                  variant="p"
                  className="text-white group-hover:text-blue-300"
                >
                  Login
                </Typography>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavbarPart1;
