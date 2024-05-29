import {
    CalendarMonth,
    CalendarMonthOutlined,
    ConnectingAirports,
    LocationOnOutlined,
    Schedule,
  } from "@mui/icons-material";
  import {
    Box,
    CardContent,
    Rating,
    Tooltip,
    Typography,
  } from "@mui/material";
  import Image from "next/image";
  import Link from "next/link";
  import React from "react";
  
  const SpecialOfferCard = ({ destination, specialOffer }) => {
    return (
      <div className="rounded-lg shadow-sm hover:shadow-lg overflow-hidden flex border">
        {/* image --- */}
        <div className="relative w-1/2">
          <Image
            className="w-full h-full object-cover"
            src={destination.coverImage}
            alt="Dubai"
            width={400}
            height={400}
          />
          <div className="absolute top-0 left-0 bg-primary text-white text-xs font-bold p-1 rounded-br-lg">
            <span className="line-through">${specialOffer.price}</span> $
            {specialOffer.discountPrice}
          </div>
        </div>
  
        {/* content ---------- */}
        <div className="flex flex-col justify-between p-4 w-1/2">
            
          <CardContent className="flex flex-col justify-between flex-grow space-y-4">
            <Typography variant="h6" className="text-gray-800">
              {destination.title}
            </Typography>
  
            <Box className="flex items-center gap-4">
              <Rating
                name="half-rating-read"
                defaultValue={destination.ratingAverage}
                precision={0.25}
                readOnly
              />
              <Typography>
                {destination.ratingAverage}
                <span>({destination.ratingQuantity})</span>
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" className="my-2">
              {specialOffer.description.slice(0, 60)}...
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="body1"
                  className="flex space-x-3 text-gray-500"
                >
                  <Tooltip title={specialOffer.startDate}>
                    <CalendarMonth />
                  </Tooltip>
                  <Tooltip title={destination.durationDays + " Days"}>
                    <Schedule />
                  </Tooltip>
  
                  <Tooltip title={destination.locations.city + " Airports"}>
                    <ConnectingAirports />
                  </Tooltip>
                  <Tooltip title={destination.locations.city + ", " + destination.locations.country.countryId}>
                    <LocationOnOutlined />
                  </Tooltip>
                </Typography>
              </Box>
  
              <Link
                href={`/all-destinations/${destination._id}`}
                className="text-primary"
              >
                <button className="flex items-center cursor-pointer">
                  <span className="hover:underline">See more</span>
                  <span className="ml-1">→</span>
                </button>
              </Link>
            </Box>
          </CardContent>
        </div>
      </div>
    );
  };
  
  export default SpecialOfferCard;
  