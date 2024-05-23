"use client";
import { Button, Rating, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const DestinationReviewsSection = ({ destinationData }) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ rating, review });
  };
  return (
    <div className=" mt-6 bg-white rounded-lg">
      {/*------- show customer review ------- */}
      <div className=" border rounded-md">
        <div className="flex items-center gap-4 p-4">
          <h1 className="text-lg font-medium">Reviews:</h1>
          <Rating
            name="half-rating-read"
            defaultValue={destinationData.ratingAverage}
            precision={0.25}
            readOnly
          />
          <p>
            {destinationData.ratingAverage}
            <span>({destinationData.ratingQuantity})</span>
          </p>
        </div>

        {/* -----single customer review start---- */}
        <div className="space-y-4">
          <hr className="w-full mb-4 " />
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div
                  className="rounded-full overflow-hidden"
                  style={{ width: "60px", height: "60px" }}
                >
                  <Image
                    src="https://i.ibb.co/KXmt47T/caleb-george-Ae-Zncpkq-MVU-unsplash.jpg"
                    alt="userImage"
                    width={60}
                    height={60}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className=" font-semibold">Sara Rahman</p>
              </div>
              <p className="text-xs">01/05/2024</p>
            </div>
            <div className="mt-4">
              <Rating
                name="half-rating-read"
                defaultValue={destinationData.ratingAverage}
                precision={0.25}
                readOnly
              />
              <p>Review: {destinationData.description}</p>
            </div>
          </div>
        </div>
        {/* -----single customer review end---- */}
      </div>

      {/*------- give customer review ------- */}

      <h2 className="text-2xl font-bold my-6">Add a review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Your Rating</label>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Your Review *"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#2095ae",
                },
              },
            }}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="bg-primary text-white"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default DestinationReviewsSection;
