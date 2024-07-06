"use client"
import React, { useState, useEffect } from 'react';
import DestinationsSmallCard from '@/components/ui/Destinations/DestinationsSmallCard';
import Image from 'next/image';
import bannerImage from '@/assets/All-image/all-destinations-banner2.jpg';
import SearchBar from '@/components/SearchBar/SearchBar';
import DestinationFilter from '@/utils/AllDestinations/Filter';

const AllDestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [50, 10000],
    ratingRange: [0, 5],
    categories: []
  });

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/destinations');
        const data = await res.json();
        if (Array.isArray(data.data)) {
          setDestinations(data.data);
          setFilteredDestinations(data.data);
        } else {
          console.error('Data is not in expected format:', data);
          setDestinations([]);
          setFilteredDestinations([]);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
        setDestinations([]);
        setFilteredDestinations([]);
      }
    };

    fetchDestinations();
  }, []);

  const applyFilters = () => {
    const { priceRange, ratingRange, categories } = filters;
    const filtered = destinations.filter(destination => {
      const withinPriceRange = destination.packagePrice >= priceRange[0] && destination.packagePrice <= priceRange[1];
      const withinRatingRange = destination.ratingAverage >= ratingRange[0] && destination.ratingAverage <= ratingRange[1];
      const withinCategory = categories.length === 0 || categories.includes(destination.category);

      return withinPriceRange && withinRatingRange && withinCategory;
    });
    setFilteredDestinations(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters();
  };

  return (
    <div>
      <div className="relative w-full mb-10">
        <Image
          src={bannerImage}
          width={400}
          height={400}
          alt="Banner"
          className="object-cover w-full h-[400px]"
        />
        <div className="absolute inset-0 bg-gray-950 bg-opacity-50 flex items-center justify-center text-center">
          <div className="lg:w-1/2 w-full text-center">
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold">
              Explore the Unseen Wonders of Our Planet
            </h1>
            <p className="text-white text-md mt-4">
              Find your next adventure. Discover the world&apos;s most stunning
              and unseen destinations.
            </p>
          </div>
        </div>
      </div>
      <div className="md:-mt-10">
        <SearchBar />
      </div>
      <div className="flex-row lg:flex justify-between items-baseline gap-10 custom-container mb-10">
        <div className="lg:w-1/3 w-full h-full lg:sticky top-0 self-start overflow-y-scroll md:h-screen scrollbar-hide">
          <DestinationFilter destinations={destinations} onFilterChange={handleFilterChange} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 relative lg:w-2/3 w-full overflow-y-auto">
          {filteredDestinations.map((destination) => (
            <DestinationsSmallCard
              key={destination._id}
              destination={destination}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDestinationsPage;
