import { Box, Container, IconButton } from "@mui/material";
import logo1 from "@/assets/logo/logo-1.png";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import Image from "next/image";
import appleStore from "../../../assets/App-logo/apple-store.png";
import googleStore from "../../../assets/App-logo/google-store.png";

import { FaPaypal, FaStripe, FaCcMastercard, FaCcVisa } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
   <div className="mt-20">
     <Box
      className="w-full h-full items-center bg-[#17233e]"
      style={{
        width: "100%",
        minHeight: "300px",
        color: "white",
        backgroundImage: "url(https://i.ibb.co/Bq7g3HF/galaxy-2150186-min.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-[#17233e] bg-opacity-90 custom-container py-10">
        <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-20 ">
          <div className="space-y-5 mt-5">
            <div className="mb-10 flex items-center gap-2 md:-mt-5">
            <Image
              src={logo1}
              width={100}
              height={100}
              alt="logo1"
            />
            <h1 className="text-3xl w-full">Go Venture</h1>
            </div>
            <p className="text-sm">
              Dreaming of the Perfect Escape? Go-Venture Designs Remarkable
              Journeys Tailored to Your Budget and Preferences!
            </p>
            <div>
              <h5 className="mt-5">Call Us</h5>

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

          <div className="">
            <h5 className="text-3xl mt-5">Quick Link</h5>
            <div className="mt-10 space-y-5">
              <p>About Us</p>
              <p>Delivery Information</p>
              <p>Privacy Policy</p>
              <p>Terms & Conditions</p>
              <p>Customer Service</p>
              <p>Return Policy</p>
            </div>
          </div>

          {/* ---------category section ------ */}

          <div className="">
            <h5 className="text-3xl mt-5">Category</h5>
            <div className="mt-10 space-y-5">
              <p>Travel</p>
              <p>Technology</p>
              <p>Lifestyle</p>
              <p>Destinations</p>
              <p>Entertainment</p>
              <p>Business</p>
            </div>
          </div>

          {/* ------App, Language and currency--- */}

          <div className="">
            <h5 className="text-3xl mt-5">Download our app</h5>
            <div className="flex items-center gap-4 mt-10">
              <Image
                src={appleStore}
                alt="Description of the image"
                width={100}
                height={100}
              />
              <Image
                src={googleStore}
                alt="Description of the image"
                width={100}
                height={100}
              />
            </div>
            <div className="mt-10">
            <p>Language (To-Do)</p>
            <p>Currency (To-Do)</p>
            </div>
          </div>
        </div>
        {/* <hr className="mt-10 text-gray-700" /> */}
        {/*------- Footer bottom----- */}
        <div className="flex-row md:flex justify-between items-center py-5 backdrop-blur-sm bg-white/10 rounded-md px-5">
          <div>
            <p className="mb-5 md:mb-0">
              Copyright © {currentYear} Go-venture. All rights reserved.
            </p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <a
              className="text-3xl text-[#002f86]  bg-slate-400 p-2 rounded-full flex items-center justify-center hover:bg-[#2095ae] hover:scale-105 hover:text-white duration-500"
              href=""
            >
              <FaPaypal></FaPaypal>
            </a>
            <a
              className="text-3xl text-[#002f86]  bg-slate-400 p-2 rounded-full flex items-center justify-center hover:bg-[#2095ae] hover:scale-105 hover:text-white duration-500"
              href=""
            >
              <FaStripe></FaStripe>
            </a>
            <a
              className="text-3xl text-[#002f86]  bg-slate-400 p-2 rounded-full flex items-center justify-center hover:bg-[#2095ae] hover:scale-105 hover:text-white duration-500"
              href=""
            >
              <FaCcMastercard></FaCcMastercard>
            </a>
            <a
              className="text-3xl w-12 h-12 text-[#002f86] bg-slate-400 p-2 rounded-full flex items-center justify-center hover:bg-[#2095ae] hover:scale-105 hover:text-white duration-500"
              href=""
            >
              <FaCcVisa></FaCcVisa>
            </a>
          </div>
        </div>
      </div>
    </Box>
   </div>
  );
};

export default Footer;
