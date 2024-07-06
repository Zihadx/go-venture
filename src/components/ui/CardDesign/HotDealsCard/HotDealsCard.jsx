import Image from "next/image";
import {
  Badge,
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { CalendarMonthOutlined } from "@mui/icons-material";
import Link from "next/link";

const HotDealsCard = ({ hotDeal, destination }) => {
  return (
    <Card className="rounded overflow-hidden shadow-lg relative mt-10">
      <Box className="absolute top-0 left-0 bg-yellow-700 text-white px-2 py-1 rounded-br-lg ">
        20% OFF
      </Box>
      <CardMedia>
        <Image
          src={destination.coverImage}
          alt={destination.title}
          width={500}
          height={300}
          className="object-cover h-48 w-full"
        />
      </CardMedia>
      <Box className="absolute top-0 right-0 bg-primary text-white px-2 py-1 rounded-bl-lg flex items-center">
        <CalendarMonthOutlined fontSize="small" />
        <Typography variant="body2" className="ml-1">
          {destination.durationDays} Days Tours
        </Typography>
      </Box>
      <CardContent className="space-y-4">
        <Typography variant="h6" className="text-gray-800">
          {destination.title}
        </Typography>
        <Typography variant="h5" className="font-bold">
          {hotDeal.title.slice(0, 25)}...
        </Typography>

        <Box className="flex items-center gap-4">
          <Rating
            className="text-orange-500"
            name="half-rating-read"
            defaultValue={destination.ratingAverage}
            precision={0.25}
            readOnly
          />
          <Typography variant="p">
            {destination.ratingAverage}
            <span>({destination.ratingQuantity})</span>
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" className="my-2">
          {hotDeal.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
         <Box>
  <Typography variant="p" className="line-through text-gray-500">
    ${hotDeal.price}
  </Typography>
  <br />
  <Typography variant="p">
    ${hotDeal.discountPrice} | Per person
  </Typography>
</Box>


          <Link
            href={`/all-destinations/${destination._id}`}
            className="text-primary"
          >
            <button className="flex items-center cursor-pointer">
              <span className="hover:underline">
                See more
              </span>
              <span className="ml-1">→</span>
            </button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HotDealsCard;
