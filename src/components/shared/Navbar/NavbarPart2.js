import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import Link from "next/link";

const NavbarPart2 = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="bg-[#2095ae]">
        <Toolbar>
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
          <Typography component="div" className="">
            +011 234 567 89
          </Typography>
          <Typography component="div" className="mx-3">
            +011 234 567 89
          </Typography>
          <Box className="flex justify-end">
            <Button>Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavbarPart2;
