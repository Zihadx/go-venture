import { Typography } from "@mui/material";
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
    <div className="custom-container mt-20 flex flex-col md:flex-col lg:flex-row justify-between items-center gap-10">
      <div className="lg:w-2/5 w-full relative">
        {/* Add wave design here */}
        <div className="absolute top-0 left-0 w-full overflow-hidden z-10 -mt-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ffff"
              fill-opacity="1"
              d="M0,192L10.4,208C20.9,224,42,256,63,229.3C83.5,203,104,117,125,96C146.1,75,167,117,188,144C208.7,171,230,181,250,170.7C271.3,160,292,128,313,138.7C333.9,149,355,203,376,197.3C396.5,192,417,128,438,112C459.1,96,480,128,501,149.3C521.7,171,543,181,563,186.7C584.3,192,605,192,626,213.3C647,235,668,277,689,245.3C709.6,213,730,107,751,90.7C772.2,75,793,149,814,165.3C834.8,181,856,139,877,106.7C897.4,75,918,53,939,74.7C960,96,981,160,1002,170.7C1022.6,181,1043,139,1064,122.7C1085.2,107,1106,117,1127,154.7C1147.8,192,1169,256,1190,250.7C1210.4,245,1231,171,1252,138.7C1273,107,1294,117,1315,138.7C1335.7,160,1357,192,1377,176C1398.3,160,1419,96,1430,64L1440,32L1440,0L1429.6,0C1419.1,0,1398,0,1377,0C1356.5,0,1336,0,1315,0C1293.9,0,1273,0,1252,0C1231.3,0,1210,0,1190,0C1168.7,0,1148,0,1127,0C1106.1,0,1085,0,1064,0C1043.5,0,1023,0,1002,0C980.9,0,960,0,939,0C918.3,0,897,0,877,0C855.7,0,835,0,814,0C793,0,772,0,751,0C730.4,0,710,0,689,0C667.8,0,647,0,626,0C605.2,0,584,0,563,0C542.6,0,522,0,501,0C480,0,459,0,438,0C417.4,0,397,0,376,0C354.8,0,334,0,313,0C292.2,0,271,0,250,0C229.6,0,209,0,188,0C167,0,146,0,125,0C104.3,0,83,0,63,0C41.7,0,21,0,10,0L0,0Z"
            ></path>
          </svg>
        </div>
        {/* End of wave design */}
        <div className="relative mb-5 overflow-hidden px-[1px]">
          <Image
            src={image1}
            alt="image1"
            width={500}
            height={500}
            className="object-cover w-full h-[350px] rounded-2xl"
          />
        </div>
        <div className="grid grid-cols-3 gap-5 -mt-40">
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
        {/* Bottom wave design */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10">
          <svg
            className="mb-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#ffff"
              fill-opacity="1"
              d="M0,224L10.4,218.7C20.9,213,42,203,63,170.7C83.5,139,104,85,125,64C146.1,43,167,53,188,74.7C208.7,96,230,128,250,149.3C271.3,171,292,181,313,181.3C333.9,181,355,171,376,149.3C396.5,128,417,96,438,101.3C459.1,107,480,149,501,165.3C521.7,181,543,171,563,149.3C584.3,128,605,96,626,85.3C647,75,668,85,689,85.3C709.6,85,730,75,751,80C772.2,85,793,107,814,138.7C834.8,171,856,213,877,229.3C897.4,245,918,235,939,224C960,213,981,203,1002,197.3C1022.6,192,1043,192,1064,181.3C1085.2,171,1106,149,1127,154.7C1147.8,160,1169,192,1190,170.7C1210.4,149,1231,75,1252,90.7C1273,107,1294,213,1315,245.3C1335.7,277,1357,235,1377,234.7C1398.3,235,1419,277,1430,298.7L1440,320L1440,320L1429.6,320C1419.1,320,1398,320,1377,320C1356.5,320,1336,320,1315,320C1293.9,320,1273,320,1252,320C1231.3,320,1210,320,1190,320C1168.7,320,1148,320,1127,320C1106.1,320,1085,320,1064,320C1043.5,320,1023,320,1002,320C980.9,320,960,320,939,320C918.3,320,897,320,877,320C855.7,320,835,320,814,320C793,320,772,320,751,320C730.4,320,710,320,689,320C667.8,320,647,320,626,320C605.2,320,584,320,563,320C542.6,320,522,320,501,320C480,320,459,320,438,320C417.4,320,397,320,376,320C354.8,320,334,320,313,320C292.2,320,271,320,250,320C229.6,320,209,320,188,320C167,320,146,320,125,320C104.3,320,83,320,63,320C41.7,320,21,320,10,320L0,320Z"
            ></path>
          </svg>
        </div>
        {/* End of wave designs */}
      </div>
      <div className="lg:w-3/5 w-full ">
        <Typography className="mb-6 text-4xl font-semibold">
          About Go-Venture&apos;s
        </Typography>
        <Typography className=" text-2xl font-semibold mb-8">
          We Are Best Adventure Tours Since 2015
        </Typography>
        <Typography  className=" mb-8">
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
              <Typography className="mb-2">
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
