"use client";

import Lottie from "react-lottie";

import animationData from "@/assets/Animations/app-store.json";

const AppAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400}/>
    </div>
  );
};

export default AppAnimation;
