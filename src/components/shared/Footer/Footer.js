import { Box, Container, IconButton } from "@mui/material";
import logo from "@/assets/logo/logo.png";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import Image from "next/image";
import img from "../../../assets/banner/banner1.jpg";

const Footer = () => {
  return (
    <Box className="bg-[#2095ae] w-full h-full text-white items-center">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b-2 border-gray-300 py-20">
          <div className="space-y-5 mt-5">
            <Image
              className="bg-slate-800 p-3 rounded-sm shadow-2xl shadow-slate-100"
              src={logo}
              width={200}
              height={200}
              alt="logo"
            />
            <div>
              <h5 className="mt-10">Call Us</h5>

              <p>+423 5362 42365</p>
            </div>
            <div>
              <h5>Mail Us</h5>
              <p>goventure@gmail.com</p>
            </div>
            <div>
              <h5>Follow Us</h5>
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
            </div>
          </div>

          <div className="border-l-2 border-gray-300 ps-6">
            <h5 className="text-3xl mt-5">Useful Links </h5>
            <div className="space-y-4">
              <div className="flex justify-between mt-5">
                <p>Home</p>
                <p>Activites</p>
              </div>
              <div className="flex justify-between">
                <p>Flights</p>
                <p>Trips</p>
              </div>
              <div className="flex justify-between">
                <p>Hotels</p>
                <p>Booking</p>
              </div>
              <div className="flex justify-between">
                <p>Transfers</p>
                <p>Requests</p>
              </div>
            </div>
          </div>

          {/* ---------contact section ------ */}

          <div className="border-l-2 border-gray-300 ps-6">
            <h5 className="text-3xl mt-5">Contact Info</h5>
            <div className="space-y-4">
              <div className="flex justify-between mt-5">
                <p>Dhaka, Bangladesh</p>
                <p>Rajshahi, Bangladesh</p>
              </div>
              <div className="flex justify-between">
                <p>Emirates, United Arabian</p>
                <p>New York, USA</p>
              </div>
              <div className="flex justify-between">
                <p>Bang kok, Thailand</p>
                <p>Macca, Soudi arabia</p>
              </div>
              <div className="flex justify-between">
                <p>Longon, UK</p>
                <p>Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </div>
        {/* <hr className="mt-10 text-gray-700" /> */}
        <div className="flex-row md:flex justify-between py-5">
          <div>
            <p>Copyright © 2024 go venture All rights reserved.</p>
          </div>
          <div>
            {" "}
            <p>Terms of Services</p>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default Footer;
