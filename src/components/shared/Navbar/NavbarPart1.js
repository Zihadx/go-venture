"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import logo from "@/assets/logo/logo.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const NavbarPart1 = () => {
  const [language, setLanguage] = React.useState("English"); // Set 'English' as the default language
  const isLargeScreen = useMediaQuery("(min-width: 960px)");

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  if (!isLargeScreen) {
    return null; // Hide NavbarPart1 on mobile and medium devices
  }

  return (
    <AppBar position="static" className="bg-[#2095ae]">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box className=" w-full flex items-center">
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
            <Button className="text-white">Login</Button>
            <Button className="text-white">Sign up</Button>

            <FormControl
              sx={{ m: 1, minWidth: 120, border: "none" }}
              size="small"
            >
              <Select
                value={language}
                onChange={handleChange}
                variant="standard"
                className="border-none text-white"
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Bengali">Bengali</MenuItem>
                <MenuItem value="Arabic">Arabic</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavbarPart1;
