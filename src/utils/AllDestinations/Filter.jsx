"use client"
import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, Slider, Typography } from '@mui/material';

const DestinationFilter = ({ destinations, onFilterChange }) => {
  const uniqueCategories = [...new Set(destinations.map(des => des.category))];

  const [priceRange, setPriceRange] = useState([50, 10000]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    onFilterChange({
      priceRange,
      ratingRange,
      categories: selectedCategories
    });
  }, [priceRange, ratingRange, selectedCategories]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleRatingChange = (event, newValue) => {
    setRatingRange(newValue);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter(c => c !== category)
        : [...prevCategories, category]
    );
  };

  return (
    <div>
      <div className="p-4 border rounded-lg shadow-md w-full">
        {/*------- Filter by price--------- */}
        <div className="my-4">
          <Typography variant="h6">Filter Price</Typography>
          <div className="mt-4">
            <Typography>{`$${priceRange[0]} - $${priceRange[1]}`}</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={50}
              max={10000}
              sx={{ color: 'orange' }}
            />
          </div>
        </div>
        <hr />
        {/* ----------Filter by rating------------ */}
        <div className="my-4">
          <Typography variant="h6">Rating</Typography>
          <div className="mt-4">
            <Typography>{`${ratingRange[0]} - ${ratingRange[1]}`}</Typography>
            <Slider
              value={ratingRange}
              onChange={handleRatingChange}
              valueLabelDisplay="auto"
              min={0}
              max={5}
              step={0.1} 
              sx={{ color: 'orange' }}
            />
          </div>
        </div>
        <hr />
        {/* --------Filter by category -------------*/}
        <div className="my-4">
          <Typography variant="h6">Category</Typography>
          <div className="mt-4">
            {uniqueCategories.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={handleCategoryChange}
                  />
                }
                label={category}
                sx={{ display: 'block' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationFilter;
