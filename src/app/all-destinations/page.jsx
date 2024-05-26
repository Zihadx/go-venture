import DestinationsSmallCard from "@/components/ui/Destinations/DestinationsSmallCard";
import Image from "next/image";
import bannerImage from "@/assets/All-image/all-destinations-banner2.jpg";
import DestinationFilter from "@/utils/AllDestinations/Filter";

const allDestinationsPage = async () => {
  const res = await fetch("http://localhost:5000/api/v1/destinations");
  const destinations = await res.json();
  console.log(destinations);
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

      {/*--------All Destinations --------- */}
      <div className="flex-row lg:flex justify-between items-baseline gap-10 custom-container mb-10">

         {/*-------- Destinations Filtering --------- */}
        <div className="lg:w-1/3 w-full lg:sticky top-0 self-start mb-4">
          <DestinationFilter  destinations={destinations}/>
        </div>

        {/*--------All Destinations  --------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 relative lg:w-2/3 w-full overflow-y-auto">
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
