import DestinationsSmallCard from "@/components/ui/Destinations/DestinationsSmallCard";
import React from "react";

const allDestinationsPage = async () => {
  const res = await fetch("http://localhost:5000/api/v1/destinations");
  const destinations = await res.json();
  console.log(destinations);
  return (
    <div className="custom-container">
      <h1 className="text-5xl my-20">All Destinations</h1>
      <div className="flex justify-between items-baseline gap-2">
        <div className="w-1/3 sticky top-0">
          <h1 className="text-4xl bg-red-200">Filter</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 relative w-2/3 overflow-y-auto">
          {destinations.data.map((destination) => (
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

export default allDestinationsPage;
