"use client";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {
  FavoriteBorderOutlined,
  HeartBrokenOutlined,
  ViewAgendaOutlined,
  ViewArray,
  VisibilityOutlined,
} from "@mui/icons-material";
import { FaEye } from "react-icons/fa";

const DestinationsBookingForm = ({ destinationData }) => {
  const [adultSeats, setAdultSeats] = useState(1);
  const [childSeats, setChildSeats] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const pricePerSeat = destinationData.packagePrice;
  const taxRate = 0.05;

  useEffect(() => {
    const calculateTotalPrice = () => {
      const seatsTotal = (adultSeats + childSeats) * pricePerSeat;
      const totalWithTax = seatsTotal * (1 + taxRate);
      setTotalPrice(totalWithTax.toFixed(2));
    };

    calculateTotalPrice();
  }, [adultSeats, childSeats, pricePerSeat]);

  return (
    <div className="max-w-sm h-full mx-auto p-4 border rounded-lg">
      <div className="text-lg font-semibold mb-4 text-center">
        <h1>Price: ${pricePerSeat.toFixed(2)}</h1>
      </div>
      <div className="mb-4">
        <TextField
          label="Booking Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          className="mb-4"
        />
        <div className="flex justify-between items-center gap-2">
          <TextField
            label="Adult"
            select
            value={adultSeats}
            onChange={(e) => setAdultSeats(Number(e.target.value))}
            fullWidth
            className="mb-4"
          >
            {[...Array(10).keys()].map((x) => (
              <MenuItem key={x + 1} value={x + 1}>
                {x + 1}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Child"
            select
            value={childSeats}
            onChange={(e) => setChildSeats(Number(e.target.value))}
            fullWidth
            className="mb-4"
          >
            {[...Array(11).keys()].map((x) => (
              <MenuItem key={x} value={x}>
                {x}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <TextField
          label="Phone Number"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Message"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          className="mb-4"
        />
      </div>
      <div className="text-lg font-semibold my-6">
        Total (Include 5% vat): ${totalPrice}
      </div>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => alert("Booking Proceeded")}
        className="mb-4 bg-primary text-white"
      >
        Proceed Booking
      </Button>
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-2">
          <h1 className="text-gray-500">Save to Wish List </h1>
          <button title="Add To Favorite List" className="group">
            <FavoriteBorderOutlined
              className="text-white bg-gray-950 bg-opacity-50 p-1 rounded-full"
              style={{ fontSize: 30 }}
            />
          </button>
        </div>

        <span className="text-gray-500 flex items-center gap-2">
          {" "}
          <span>
            <VisibilityOutlined />
          </span>{" "}
          3771
        </span>
      </div>
    </div>
  );
};

export default DestinationsBookingForm;
