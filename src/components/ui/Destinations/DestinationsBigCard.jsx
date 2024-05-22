import {
  AlarmAddOutlined,
  AlarmOnOutlined,
  CalendarMonthOutlined,
  LocationOnOutlined,
  MonetizationOnOutlined,
} from "@mui/icons-material";
import { Rating } from "@mui/material";
import Image from "next/image";

const DestinationsBigCard = ({ destination }) => {
  return (
    <div className="w-full flex-row lg:flex justify-between items-center gap-10">
      <div className="lg:w-1/2 rounded-tr-[100px] rounded-bl-[100px]">
        <Image
          alt={destination.image[0]}
          src={destination.image[0]}
          width={500}
          height={500}
          className="h-[400px] w-full rounded-sm rounded-tr-[100px] rounded-bl-[100px]"
        />
      </div>
      <div className="lg:w-1/2 space-y-4 mt-8 lg:mt-0">
        <p className="text-sm">
          <span className="mr-5">
            <LocationOnOutlined />
          </span>
          {destination.locations.city},{" "}
          {destination.locations.country.countryId}
        </p>
        <h1 className="text-3xl font-medium">{destination.title}</h1>
        {/* rating div------------- */}
        <div className="flex items-center gap-4">
          <Rating
            name="half-rating-read"
            defaultValue={destination.ratingAverage}
            precision={0.25}
            readOnly
          />
          <p>
            {destination.ratingAverage}
            <span>({destination.ratingQuantity})</span>
          </p>
        </div>

        {/*----- others data------------ */}
        <p>{destination.description}</p>
        <p>
          <MonetizationOnOutlined className="mr-3" /> Package Price: $
          {destination.packagePrice}
        </p>
        <p>
          <CalendarMonthOutlined className="mr-3" /> Start Date:{" "}
          {destination.startDate}
        </p>
        <p>
          <AlarmOnOutlined className="mr-3" /> Duration Days:{" "}
          {destination.durationDays}d
        </p>
      </div>
    </div>
  );
};

export default DestinationsBigCard;
