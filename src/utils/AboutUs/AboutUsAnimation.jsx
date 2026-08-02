"use client";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import "tailwindcss/tailwind.css";
import { Box, Typography } from "@mui/material";

const AboutUsAnimation = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const stats = [
    { value: 20, label: "Years Experiences" },
    { value: 80, label: "Tour Packages" },
    { value: 850, label: "Happy Customers" },
    { value: 130, label: "Award Winning" },
  ];

  return (
    <div className="mt-10">
      <div
        ref={ref}
        className="flex flex-col lg:flex-row justify-center lg:justify-around items-center gap-10 shadow-md border p-4 rounded-lg bg-white"
      >
        {stats.map((stat, index) => (
          <Box key={index} className="text-center mb-4 lg:mb-0">
            <Typography className="text-primary text-3xl font-bold">
              {inView && <CountUp start={0} end={stat.value} duration={1} />}+
            </Typography>
            <Typography className="text-gray-600 text-xl">
              {stat.label}
            </Typography>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default AboutUsAnimation;
