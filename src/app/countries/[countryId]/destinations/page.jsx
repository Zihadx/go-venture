import DestinationsSmallCard from "@/components/ui/Destinations/DestinationsSmallCard";
import { LocationCity, LocationOnOutlined } from "@mui/icons-material";
import Image from "next/image";

const DestinationsByCountryPage = async ({ params }) => {
  const { countryId} = params;
  //  ---------------country details------------
  const countryRes = await fetch(
    `http://localhost:5000/api/v1/countries/${countryId}`
  );
  const countriesData = await countryRes.json();
  console.log(countriesData);

  //  ---------------Destinations details by country------------
  const destinationRes = await fetch(
    `http://localhost:5000/api/v1/countries/${countryId}/destinations`
  );
  const destinationData = await destinationRes.json();

  console.log(destinationData);

  return (
    <div>
      <div className="relative w-full mb-10">
        <Image
          src={countriesData.data.image}
          width={400}
          height={400}
          alt="Banner"
          className="object-cover w-full h-[400px]"
        />
        <div className="absolute inset-0 bg-gray-950 bg-opacity-50 flex items-center justify-center text-center">
          <div className="lg:w-1/2 w-full text-center">
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold">
              {countriesData.data.title}
            </h1>
            <p className="text-white text-md mt-4">
              {countriesData.data.descriptions}
            </p>
            <h1 className="text-xl text-white"> <LocationOnOutlined /> {countriesData.data.name}</h1>
          </div>
        </div>
      </div>

      <div className="custom-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinationData?.map((destination) => (
            <DestinationsSmallCard
              key={destination._id}
              destination={destination}
            ></DestinationsSmallCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationsByCountryPage;
