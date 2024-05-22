import { Box, Grid } from "@mui/material";
import Image from "next/image";

const DestinationsDetailsPage = async ({ params }) => {
  const res = await fetch(
    `http://localhost:5000/api/v1/destinations/${params.destinationId}`
  );
  const destination = await res.json();
  const destinationData = destination.data;
  console.log(destinationData);
  return (
    <div>
      <div className="relative w-full mb-10">
        <Image
          src={destinationData.coverImage}
          width={400}
          height={400}
          alt="Banner"
          className="object-cover w-full h-[400px]"
        />
        <div className="absolute inset-0 bg-gray-800 bg-opacity-55 flex items-center justify-center text-center">
          <div className="lg:w-1/2 w-full text-center">
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold ">
              {destinationData.title}
            </h1>
            <p className="text-white text-md mt-4">
              {destinationData.description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-row lg:flex justify-between items-baseline gap-2 custom-container">
        <div className="lg:w-2/3 w-full overflow-y-auto">

            {/* -------image layout start ------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">
            {destinationData.image.length > 0 && (
              <div className="col-span-12 lg:col-span-8">
                <Image
                  src={destinationData.image[0]}
                  alt={destinationData.image[0]}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            {destinationData.image.slice(1).map((img, index) => (
              <div
                key={index}
                className={
                  index < 2 ? "col-span-4" : "col-span-4 lg:col-span-8"
                }
              >
                <Image
                  src={img}
                  alt={`Image ${index + 2}`}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
             {/* -------image layout end ------- */}
             
        </div>
        <div className="lg:w-1/3 w-full lg:sticky top-0 bg-red-400">
          Booking
        </div>
      </div>
    </div>
  );
};

export default DestinationsDetailsPage;
