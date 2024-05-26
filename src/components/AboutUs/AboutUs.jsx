import { Button, Typography, Box } from "@mui/material";
import Image from "next/image";

import image1 from "@/assets/About-us/aboutUs1.jpg";
import image3 from "@/assets/About-us/aboutUs2.jpg";
import image2 from "@/assets/About-us/aboutUs3.jpg";
import image4 from "@/assets/About-us/aboutUs4.jpg";

import { DoneOutline } from "@mui/icons-material";
import AboutUsAnimation from "@/utils/AboutUs/AboutUsAnimation";

const AboutUsPage = () => {
  const items = [
    "Best Award",
    "100% Authentic",
    "Multilingual Guides",
    "Local Experts",
    "Good Experience",
    "Best Safety",
    "Facilities & Services",
    "Value for Money",
  ];

  return (
    <div className="custom-container mt-20 flex flex-col lg:flex-row justify-between gap-10">
      <div className="lg:w-2/5 w-full relative">
        <div className="relative mb-5">
          <Image
            src={image1}
            alt="image1"
            width={500}
            height={500}
            className="object-cover w-full h-[350px] rounded-2xl"
          />
        </div>
        <div className="grid grid-cols-3 gap-5 -mt-40 px-2">
          <div className="col-span-2 relative">
            <Image
              src={image2}
              alt="image2"
              width={500}
              height={250}
              className="object-cover w-full h-[250px] rounded-3xl"
            />
          </div>
          <div className="col-span-1 relative" style={{ height: "250px" }}>
            <Image
              src={image3}
              alt="image3"
              layout="fill"
              objectFit="cover"
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        </div>
        <div className="mb-5 -mt-44">
          <Image
            src={image4}
            alt="ATV"
            width={500}
            height={500}
            className="object-cover w-full h-[350px] rounded-2xl"
          />
        </div>
      </div>
      <div className="lg:w-3/5 w-full">
        <Typography variant="h3" className="mb-6 text-4xl font-semibold">
          About Go-Venture&apos;s
        </Typography>
        <Typography variant="h4" className=" text-2xl font-semibold mb-8">
          We Are Best Adventure Tours Since 2015
        </Typography>
        <Typography variant="body1" className=" mb-8">
          Celebrate the spirit of wanderlust with Go-Venture, where every
          journey is an unforgettable adventure. From pristine beaches to
          majestic mountains, Go-Venture is your gateway to the world&apos;s
          most captivating destinations. Embark on a journey of discovery,
          exploration, and pure joy with Go-Venture as your trusted travel
          partner.
        </Typography>
        <div className="flex flex-wrap gap-4">
          {items.map((item, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3">
              <Typography variant="h6" className="mb-2">
                <DoneOutline
                  className="text-primary mr-2"
                  sx={{ fontSize: 20 }}
                />
                {item}
              </Typography>
            </div>
          ))}
        </div>

        <AboutUsAnimation />
      </div>
    </div>
  );
};

export default AboutUsPage;
