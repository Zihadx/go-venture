"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Rating,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    userImage: "https://i.ibb.co/CBSJbcN/IMG-20240329-141614.jpg",
    feedback:
      "I had a wonderful time exploring the local culture and cuisine. The service was top-notch.",
    username: "Adnin",
    rating: 5,
    title: "Great Experience",
    location: "Paris, France",
    date: "2024-04-15",
  },
  {
    userImage: "https://i.ibb.co/TtNS9Pd/IMG-20240115-214145-1.jpg",
    feedback:
      "I had a wonderful time exploring the local culture and cuisine. The service was top-notch.",
    username: "Zihad",
    rating: 4,
    title: "Memorable Journey",
    location: "Tokyo, Japan",
    date: "2024-03-10",
  },
  {
    userImage: "https://i.ibb.co/CBSJbcN/IMG-20240329-141614.jpg",
    feedback:
      "I had a wonderful time exploring the local culture and cuisine. The service was top-notch.",
    username: "Minha",
    rating: 5,
    title: "Unforgettable Adventure",
    location: "Machu Picchu, Peru",
    date: "2024-05-05",
  },
];

const ClientReviewsSection = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // Hide default arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      className="relative bg-cover bg-center mt-20"
      style={{
        backgroundImage: `url('https://i.ibb.co/3hSQYvj/review-Section.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box className="bg-opacity-65 bg-primary p-2 lg:p-16">
        <Typography
          variant="h4"
          align="center"
          className="text-white font-bold pt-4 md:pt-0"
        >
          Guest Feedback
        </Typography>
        <Typography
          variant="body1"
          align="center"
          className="text-gray-100 mt-4 max-w-2xl mx-auto"
        >
          Discover the feedback from our valued guests. Find out why they chose
          Go-Venture&apos;s for their travel needs and how we exceeded their
          expectations.
        </Typography>
        <Box className="relative mt-8 px-4">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial, index) => (
              <Box key={index} className="p-4 w-full">
                <Card className="bg-gray-800 text-white h-full">
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box display="flex" alignItems="center" className="mb-4">
                        <Avatar
                          src={testimonial.userImage}
                          alt={testimonial.username}
                          className="w-12 h-12 mr-4"
                        />
                        <Box>
                          <Box className="space-y-1">
                            <Typography variant="h6" className="font-semibold">
                              {testimonial.username}
                            </Typography>
                            <Typography variant="body2" className="text-xs">
                              {testimonial.location}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="p" className="text-xs">
                              {testimonial.date}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Box>
                        <Rating
                          name="half-rating-read"
                          defaultValue={testimonial.rating}
                          precision={0.25}
                          readOnly
                        />
                      </Box>
                    </Box>
                    <Typography variant="h6" className="text-gray-200 font-bold my-3">
                      {testimonial.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-200">
                      {testimonial.feedback}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>

          <IconButton
            className="absolute top-1/2 right-4 transform -translate-y-1/2"
            onClick={() => sliderRef.current.slickNext()}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <ArrowForwardIosIcon style={{ color: "white" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientReviewsSection;
