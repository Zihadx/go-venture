import DestinationsBookingForm from "@/utils/DestinationDetails/BookingForm";
import DestinationMaps from "@/utils/DestinationDetails/DestinationMaps";
import DestinationReviewsSection from "@/utils/DestinationDetails/DestinationReviews";
import FAQsection from "@/utils/DestinationDetails/FAQsection";
import ImageLayout from "@/utils/DestinationDetails/ImageLayout";
import {
  AlarmOnOutlined,
  CalendarMonthOutlined,
  LocationOnOutlined,
  MonetizationOnOutlined,
} from "@mui/icons-material";
import Image from "next/image";

const DestinationsDetailsPage = async ({ params }) => {
  const res = await fetch(
    `http://localhost:5000/api/v1/destinations/${params.destinationId}`
  );
  const destination = await res.json();
  const destinationData = destination.data;
  console.log(destinationData);

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
          <ImageLayout destinationData={destinationData} />
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
          <div>
            <p className="my-6">{destinationData.description}</p>

            <FAQsection />
          </div>
          <div className="mt-6">
            <h1 className="text-2xl font-bold mb-4">Customer Experience</h1>

            <DestinationReviewsSection destinationData={destinationData} />
          </div>
        </div>
        <div className="lg:w-1/3 w-full h-full lg:sticky self-start top-0">
          <div>
            <h1 className="text-2xl font-bold mb-4 text-center">Book Your Adventure</h1>
            <DestinationsBookingForm destinationData={destinationData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationsDetailsPage;
