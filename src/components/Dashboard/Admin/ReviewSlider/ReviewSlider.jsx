"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronLeft, ChevronRight, CloseRounded } from "@mui/icons-material";

const reviews = [
  {
    id: 1,
    text: "Absolutely outstanding service! The team went above and beyond to meet my expectations.",
    name: "Sarah Johnson",
    time: "2h ago",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    text: "Seamless experience with excellent customer support. Highly recommend!",
    name: "David Smith",
    time: "5h ago",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    text: "Best purchase ever! The quality and attention to detail exceeded my expectations.",
    name: "Emily Davis",
    time: "1d ago",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    text: "Absolutely love it! Great customer service and fast delivery.",
    name: "Michael Brown",
    time: "2d ago",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    text: "Incredible quality, super fast shipping, and amazing support team!",
    name: "Jessica Wilson",
    time: "3d ago",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
];

const ReviewSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState(1);

  useEffect(() => {
    const updateVisibleReviews = () => {
      if (window.innerWidth >= 1024) {
        setVisibleReviews(3);
      } else if (window.innerWidth >= 768) {
        setVisibleReviews(2);
      } else {
        setVisibleReviews(1);
      }
    };

    updateVisibleReviews();
    window.addEventListener("resize", updateVisibleReviews);

    return () => window.removeEventListener("resize", updateVisibleReviews);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - visibleReviews : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= reviews.length - visibleReviews ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[400px] mx-auto my-12 p-8 bg-gradient-to-r from-blue-400 to-pink-200 rounded-xl shadow-2xl text-white overflow-hidden">
      <h2 className="text-3xl font-bold mb-6 text-center">What Our Customers Say</h2>
      <div className="relative flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex gap-6 w-full justify-center"
          >
            {reviews.slice(currentIndex, currentIndex + visibleReviews).map((review) => (
              <div
                key={review.id}
                className="bg-white text-gray-900 p-8 shadow-md rounded-lg text-center flex flex-col w-full sm:w-1/2 lg:w-1/3 transform hover:scale-105 transition duration-300"
              >
                <p className="text-gray-700 italic mb-4 text-lg">“{review.text}”</p>
                <div className="flex items-center gap-3 justify-center">
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={60}
                    height={60}
                    className="rounded-full border-4 border-purple-500 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">{review.name}</p>
                    <p className="text-gray-500 text-sm">{review.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-md hover:bg-gray-300 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-md hover:bg-gray-300 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ReviewSlider;
