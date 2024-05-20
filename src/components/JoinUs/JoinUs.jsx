import signUpImage from "@/assets/Sign-up/sign-up.png";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import Image from "next/image";
import joinUsImage from "@/assets/All-image/joinUs.png";
import planeImage from "@/assets/All-image/plane.png";

const JoinUsPage = () => {
  return (
    <div className="custom-container py-4 my-16 flex-row md:flex justify-between items-center gap-8 relative">
      <div className="w-full md:w-1/2 relative z-10">
        <i className="font-mono text-2xl text-[#82498c]">Welcome,</i>
        <h1 className="text-2xl md:text-4xl font-semibold">
          Start Your Adventure <br /> Here
        </h1>
        <p className="my-10">
          Are you ready to dive into the world of travel? Join our community of
          explorers for insider tips, exclusive deals, and personalized
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
              Not a Member Yet? Join now to unlock exclusive discounts and deals
              on travel. Sign up today and start saving!
            </small>
            <div className="flex items-center gap-2">
              <Button variant="outlined" size="small" className="bg-primary text-white hover:text-primary  hover:border-primary border hover:border w-28">
                Sign in <ArrowRightAltOutlined />
              </Button>
              <Button variant="outlined" size="small" className=" text-primary hover:bg-primary hover:text-white w-28">
                Register <ArrowRightAltOutlined />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 md:mt-0 flex relative">
        <Image
          src={joinUsImage}
          alt="signUpImage"
          width={400}
          height={400}
          className="lg:h-[550px] rounded-t-full mx-auto"
        ></Image>

        <div className="absolute top-1/2 -translate-y-1/2  transform -translate-x-64">
          <Image
            src={planeImage}
            alt="planeImage"
            width={350}
            height={350}
            className="object-contain opacity-100 md:opacity-10 lg:opacity-100 mt-16"
          />
        </div>
      </div>
    </div>
  );
};

export default JoinUsPage;
