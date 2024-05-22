import { Button } from "@mui/material";
import DestinationsBigCard from "../ui/Destinations/DestinationsBigCard";
import DestinationsSmallCard from "../ui/Destinations/DestinationsSmallCard";

const DestinationsPage = ({ destinations }) => {
  return (
    <div className="custom-container my-16">
      <div className="w-full md:w-1/2 text-center mx-auto space-y-4">
        <h1 className="text-4xl font-semibold">Discover Your Next Adventure</h1>
        <p>
          Explore curated destinations with Go-Venture&apos;s. Whether for
          adventure, relaxation, or culture, we have the perfect spot for you.
          Start your journey today.
        </p>
      </div>
      <div className="flex justify-center items-center mt-10 mb-4 gap-8">
        <Button
          variant="outlined"
          className="text-primary  border-primary hover:border-primary"
        >
          Destinations
        </Button>
        <Button
          variant="outlined"
          className="text-primary  border-primary hover:border-primary"
        >
          Sanctuaries
        </Button>
      </div>
      <p className=" mt-6 border border-t-0 border-gray-300" />
      {/* ------destinations big card ----- */}
      <div className="flex-row md:flex justify-between items-center gap-4 mt-10">
        {destinations.data.slice(0, 1).map((destination) => (
          <DestinationsBigCard
            key={destination._id}
            destination={destination}
          />
        ))}
      </div>
      {/* ------destinations small card ----- */}
      <h1 className=" mt-10 text-lg font-medium">
        Perfect Retreats for Your Next Vacation
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {destinations.data
          .slice(1, destinations.data.length)
          .map((destination) => (
            <DestinationsSmallCard
              key={destination._id}
              destination={destination}
            />
          ))}
      </div>
    </div>
  );
};

export default DestinationsPage;
