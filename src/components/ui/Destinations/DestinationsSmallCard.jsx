"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import "./SmallCard.css";
import { FavoriteBorder, FavoriteBorderOutlined, HistoryOutlined, LocationOnOutlined } from "@mui/icons-material";
import { Rating } from "@mui/material";
import Link from "next/link";

const DestinationsSmallCard = ({ destination }) => {
  return (
    <div className="relative shadow-slate-200 shadow-md flex flex-col h-full group overflow-hidden rounded-sm">
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
        <button title="Add To Favorite List" className="group">
            <FavoriteBorderOutlined
              className="text-white bg-gray-950 bg-opacity-50 p-1 rounded-full"
              style={{ fontSize: 30 }}
            />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3 flex-grow">
     <div className="flex justify-end -mt-9 z-10 relative">
     <h1 className="bg-primary text-white px-3 py-2 w-1/2 flex justify-center items-center rounded-lg gap-2 font-medium absolute"> <HistoryOutlined /> {destination.durationDays} Days Tour</h1>
     </div>
        <div>
          <h2 className="text-xl font-medium  mt-14">{destination.title}</h2>
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
          <h1 className="py-2 px-6 lg:w-1/2 w-full bg-slate-100 rounded-l-md">
            {" "}
            ${destination.packagePrice}/Person
          </h1>
          <Link href={`/all-destinations/${destination._id}` } className="relative flex items-center justify-center gap-2 bg-primary text-white font-medium py-2 px-6 md:px-4 lg:px-6 rounded-r-md lg:w-1/2 w-full ">
          <button>
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
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-[#2095ae] border-b-4 border-[#2095ae] transition-all duration-700 transform scale-x-0 origin-left group-hover:scale-x-100"></div>
      </div>
    </div>
  );
};

export default DestinationsSmallCard;
