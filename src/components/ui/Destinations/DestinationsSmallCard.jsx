"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import "./SmallCard.css";
import { FavoriteBorder, LocationOnOutlined } from "@mui/icons-material";
import { Rating } from "@mui/material";

const DestinationsSmallCard = ({ destination }) => {
  return (
    <div className="relative shadow-slate-200 shadow-md flex flex-col h-full group overflow-hidden rounded-t-sm">
      <div>
        <Swiper
          pagination={{ type: "fraction" }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {destination.image.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-64 rounded-t-sm">
                <Image
                  src={img}
                  alt={`Slide ${index}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-sm group-hover:transform group-hover:scale-y-125 transition duration-700 ease-in-out"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="absolute top-[5px] right-[5px] z-10">
        <div>
          <h1 title="Add Favorite List" className=" text-pink-700 font-bold bg-slate-300 
          bg-opacity-70 p-1 rounded-full">
            <FavoriteBorder sx={{ fontSize: 25 }} />
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-3 flex-grow">
        <div>
          <h2 className="text-xl font-medium">{destination.title}</h2>
          <p className="text-sm mt-1">
            <span className="mr-3">
              <LocationOnOutlined sx={{ fontSize: 20 }} />
            </span>
            {destination.locations.city},{" "}
            {destination.locations.country.countryId}
          </p>
        </div>
        {/* rating div------------- */}
        <div className="flex items-center gap-4">
          <Rating
            name="half-rating-read"
            defaultValue={destination.ratingAverage}
            precision={0.25}
            readOnly
          />
          <p>
            {destination.ratingAverage}
            <span>({destination.ratingQuantity})</span>
          </p>
        </div>

        <p>{destination.description.slice(0, 80)}....</p>
      </div>

      <div className="mt-auto">
        <p className="border border-t-0 border-gray-200" />
        <div className="flex justify-between items-center p-4">
          <h1 className="py-2 px-6 lg:w-1/2 w-full bg-slate-100">
            {" "}
            ${destination.packagePrice}/Person
          </h1>
          <button className="relative flex items-center justify-center gap-2 bg-primary text-white font-medium py-2 px-6 rounded-r-md lg:w-1/2 w-full ">
            <span
              className="absolute left-0 inset-y-0 bg-slate-100"
              style={{
                clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                width: "20px",
              }}
            ></span>
            <span>Explore Now</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationsSmallCard;
