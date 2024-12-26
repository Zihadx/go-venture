import DestinationsBookingForm from "@/utils/DestinationDetails/BookingForm";
import DestinationReviewsSection from "@/utils/DestinationDetails/DestinationReviews";
import FAQsection from "@/utils/DestinationDetails/FAQsection";
import {
  AlarmOnOutlined,
  CalendarMonthOutlined,
  LocationOnOutlined,
  MonetizationOnOutlined,
  Verified,
} from "@mui/icons-material";
import Image from "next/image";

const DestinationsDetailsPage = async ({ params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/destinations/${params.destinationId}`
  );
  

  const destination = await res.json();
  const destinationData = destination.data;
  // console.log(destinationData);
  // console.log(params);
  const startDate = new Date(destinationData.startDate).toLocaleDateString(
    "en-CA"
  );
  const endDate = new Date(destinationData.endDate).toLocaleDateString("en-CA");
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

      <div className="flex-row lg:flex justify-between items-baseline gap-6 custom-container mb-8">
        <div className="lg:w-2/3 w-full overflow-y-auto">
          {/* -------image layout start ------- */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {destinationData.image.length === 4 && (
              <>
                <div className="col-span-12 md:col-span-8">
                  <Image
                    src={destinationData.image[0]}
                    alt={destinationData.image[0]}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Image
                    src={destinationData.image[1]}
                    alt={destinationData.image[1]}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <Image
                    src={destinationData.image[2]}
                    alt={destinationData.image[2]}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="col-span-6 md:col-span-8">
                  <Image
                    src={destinationData.image[3]}
                    alt={destinationData.image[3]}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </>
            )}

            {destinationData.image.length === 3 && (
              <>
                <div className="col-span-12">
                  <Image
                    src={destinationData.image[0]}
                    alt={destinationData.image[0]}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="col-span-6 md:col-span-6">
                  <Image
                    src={destinationData.image[1]}
                    alt={destinationData.image[1]}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="col-span-6 md:col-span-6">
                  <Image
                    src={destinationData.image[2]}
                    alt={destinationData.image[2]}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </>
            )}
          </div>
          {/* -------image layout end ------- */}

          <h1 className="text-2xl font-bold mt-6">{destinationData.title}</h1>
          <p className="text-sm mt-2">
            <span className="mr-3">
              <LocationOnOutlined sx={{ fontSize: 20 }} />
            </span>
            {destinationData.locations.city},{" "}
            {destinationData.locations.country.countryId}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
            <div className="flex items-center">
              <AlarmOnOutlined className="mr-3 text-primary text-3xl" />
              <div>
                <p>Duration</p>
                <p>{destinationData.durationDays} Days</p>
              </div>
            </div>

            <div className="flex items-center">
              <MonetizationOnOutlined className="mr-3 text-primary text-3xl" />
              <div>
                <p className="w-full">Package Price</p>
                <p>${destinationData.packagePrice} | Person</p>
              </div>
            </div>

            <div className="flex items-center">
              <CalendarMonthOutlined className="mr-3 text-primary text-3xl" />
              <div>
                <p className="w-full">Start Date</p>
                <p>{startDate}</p>
              </div>
            </div>
            <div className="flex items-center">
              <CalendarMonthOutlined className="mr-3 text-primary text-3xl" />
              <div>
                <p className="w-full">End Date</p>
                <p>{endDate}</p>
              </div>
            </div>
          </div>
          <div className="my-6">
            <p>Dynamic Descriptions: {destinationData.description}</p>
            <p className="my-4">
              Static Description: Add more word on main description data for
              dynamic descriptions--- Discover the world&apos;s most beautiful
              and intriguing destinations with Go-Venture&apos;s. From the
              sun-kissed beaches of the Caribbean to the ancient ruins of Asia,
              our curated list of destinations promises something for every
              traveler. Browse our top picks and start planning your dream
              vacation today.
            </p>
          </div>

          {/* ----Attractions -----------------*/}
          <div className="my-6 flex gap-6">
            <h1 className="text-2xl font-bold">Attractions:</h1>
            <div>
              {destinationData.attractions.map((attraction, index) => (
                <p key={index}>
                  <span className="text-primary mr-4">
                    <Verified sx={{ fontSize: 20 }} />
                  </span>
                  {attraction}
                </p>
              ))}
            </div>
          </div>

          {/* ----FAQ sections ---------------- */}
          <FAQsection />
          {/* ----Reviews sections ---------------- */}
          <div className="mt-6">
            <h1 className="text-2xl font-bold mb-4">Customer Experience</h1>

            <DestinationReviewsSection destinationData={destinationData} />
          </div>
        </div>
        {/* Booking sections ---------------- */}
        <div className="lg:w-1/3 w-full h-full lg:sticky self-start top-0 overflow-y-scroll md:h-screen scrollbar-hide">
          <div>
            <h1 className="text-2xl font-bold mb-4 mt-8 md:mt-0 text-center">
              Book Your Adventure
            </h1>
            <DestinationsBookingForm destinationData={destinationData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationsDetailsPage;
