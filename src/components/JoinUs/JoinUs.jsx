import signUpImage from "@/assets/Sign-up/sign-up.png";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import Image from "next/image";
import planeImage from "@/assets/All-image/plane.png";
import Link from "next/link";

const JoinUsPage = () => {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-contain bg-center opacity-20"
        style={{
          backgroundImage: "url('https://i.ibb.co/P9mWnwy/world-map.png')",
        }}
      ></div>
      <div className="custom-container py-4 my-16 flex-row md:flex justify-between items-center gap-8 relative z-10">
        <div className="w-full md:w-1/2 relative z-10">
          <i className="font-mono text-2xl text-[#82498c]">Welcome,</i>
          <h1 className="text-2xl md:text-4xl font-semibold">
            Start Your Adventure <br /> Here
          </h1>
          <p className="my-10">
            Are you ready to dive into the world of travel? Join our community
            of explorers for insider tips, exclusive deals, and personalized
            recommendations. Whether you&apos;re a seasoned globetrotter or
            planning your first trip, let us make your adventure unforgettable!
          </p>
          <div className="flex-row lg:flex justify-center items-center gap-6 mt-6">
            <div>
              <Image
                src={signUpImage}
                alt="signUpImage"
                width={500}
                height={500}
                className="mx-auto"
              ></Image>
            </div>
            <div className="space-y-4">
              <h1 className="text-[#82498c] text-xl font-semibold">
                Join and Discover More
              </h1>
              <small>
                Not a Member Yet? Join now to unlock exclusive discounts and
                deals on travel. Sign up today and start saving!
              </small>
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button
                    variant="outlined"
                    size="small"
                    className="bg-primary text-white hover:text-primary  hover:border-primary border hover:border w-28"
                  >
                    Sign in <ArrowRightAltOutlined />
                  </Button>
                </Link>

                <Link href="/register">
                  <Button
                    variant="outlined"
                    size="small"
                    className=" text-primary hover:bg-primary hover:text-white w-28"
                  >
                    Register <ArrowRightAltOutlined />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-0 flex relative">
          <video
            src="/joinUs.mp4"
            width={400}
            height={400}
            className="lg:h-[550px] rounded-t-full mx-auto w-full"
            autoPlay
            loop
            muted
          ></video>

          <div className="absolute top-1/2 -translate-y-1/2  transform -translate-x-80 w-full lg:w-[400px]">
            <Image
              src={planeImage}
              alt="planeImage"
              width={550}
              height={550}
              className="object-contain opacity-100 md:opacity-10 lg:opacity-100 mt-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUsPage;
