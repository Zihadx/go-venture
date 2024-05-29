import {
  AccessTime,
  ChatBubbleOutline,
  LocationOnOutlined,
  Wifi,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import googleStore from "@/assets/App-logo/google-store.png";
import appStore from "@/assets/App-logo/apple-store.png";
import AppAnimation from "@/utils/MobileApp/AppAnimation";

const MobileApps = () => {
  return (
    <Box className="bg-[#2094ae33] py-16 mt-20">
      <Box className="custom-container">
        <Box className="flex flex-col lg:flex-row  items-center justify-between gap-10">
          {/* Left side */}
          <Box className="lg:w-1/2 w-full mb-8 lg:mb-0">
            <Typography
              variant="h3"
              component="h2"
              className="text-4xl font-bold mb-4"
            >
              Seamless Service with our app
            </Typography>
            <Typography variant="body1" className="mb-8 text-lg">
              From booking to checkout, our app offers all the tools you need to
              customize your stay. Experience the ultimate in convenience and
              comfort.
            </Typography>
            <Box className="space-y-4">
              <Box className="flex items-center space-x-3">
                <ChatBubbleOutline fontSize="large" />
                <Typography variant="body1">Live Chat Support</Typography>
              </Box>
              <Box className="flex items-center space-x-3">
                <Wifi fontSize="large" />
                <Typography variant="body1">
                  Auto-connect Functionality
                </Typography>
              </Box>
              <Box className="flex items-center space-x-3">
                <LocationOnOutlined fontSize="large" />
                <Typography variant="body1">
                  Insider&apos;s Guide to Go-Venture&apos;s
                </Typography>
              </Box>
              <Box className="flex items-center space-x-3">
                <AccessTime fontSize="large" />
                <Typography variant="body1">
                  Flexible Checkout Appeal
                </Typography>
              </Box>
            </Box>
            <Box className="mt-8 flex space-x-4">
              <Box>
                <Image src={appStore} alt="App Store" width={150} height={50} />
              </Box>
              <Box>
                <Image
                  src={googleStore}
                  alt="Google Play"
                  width={150}
                  height={50}
                />
              </Box>
            </Box>
          </Box>

          {/* Right side */}
          <Box className="lg:w-1/2 w-full relative flex justify-end h-full">
            <Image
              src="https://i.ibb.co/5hhnVzf/maldives-6.jpg"
              alt="Phone Mockup"
              width={600}
              height={600}
              className="object-contain rounded-l-full"
            />
            <Box className="absolute z-10 bottom-0 right-0">
              <AppAnimation />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MobileApps;
