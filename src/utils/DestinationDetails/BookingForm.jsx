
"use client";

import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {
  FavoriteBorderOutlined,
  VisibilityOutlined,
  ArrowForwardRounded,
  PersonOutlineRounded,
  PhoneOutlined,
  NotesRounded,
  ShieldOutlined,
  CheckCircleRounded,
  EventAvailableRounded,
  AutoAwesomeRounded,
} from "@mui/icons-material";

const DestinationsBookingForm = ({ destinationData }) => {
  const [adultSeats, setAdultSeats] = useState(1);
  const [childSeats, setChildSeats] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [totalPrice, setTotalPrice] = useState("0.00");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const pricePerSeat = Number(destinationData?.packagePrice) || 0;

  const travelerCount = adultSeats + childSeats;
  const subtotal = travelerCount * pricePerSeat;
  const vat = subtotal * 0.05;

  useEffect(() => {
    setTotalPrice((subtotal + vat).toFixed(2));
  }, [subtotal, vat]);

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "15px",
      minHeight: "54px",
      backgroundColor: "rgba(148,163,184,0.035)",
      transition: "all .25s ease",

      "& fieldset": {
        borderColor: "rgba(148,163,184,.18)",
        transition: "border-color .25s ease",
      },

      "&:hover fieldset": {
        borderColor: "rgba(32,149,174,.4)",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#2095ae",
        borderWidth: "1px",
      },
    },

    "& .MuiInputLabel-root": {
      fontSize: "13px",
      color: "rgb(148 163 184)",
    },

    "& .MuiInputBase-input": {
      fontSize: "13px",
    },

    "& .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      fontSize: "13px",
    },
  };

 const handleBooking = () => {
  const params = new URLSearchParams({
    destinationId: destinationData?._id || destinationData?.id || "",
    date: bookingDate,
    adults: String(adultSeats),
    children: String(childSeats),
  });

  window.location.href = `/all-destinations/booking?${params.toString()}`;
};

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-black/[0.06] bg-white shadow-[0_30px_90px_-35px_rgba(15,23,42,.28)] dark:border-white/[0.08] dark:bg-[#0d1014] dark:shadow-[0_30px_90px_-40px_rgba(0,0,0,.8)]">

      {/* Ambient lighting */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-56 w-56 rounded-full bg-cyan-400/[0.06] blur-[90px]" />

      <div className="relative p-5 sm:p-6 lg:p-7">

        {/* ================= HEADER ================= */}
        <div className="flex items-start justify-between gap-5">

          <div className="min-w-0 flex-1">

            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/[0.07] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-primary">
              <AutoAwesomeRounded sx={{ fontSize: 12 }} />
              Curated journey
            </div>

            <h2 className="mt-3 text-[24px] font-semibold leading-[1.15] tracking-[-0.035em] text-gray-950 dark:text-white sm:text-[26px]">
              Reserve your escape
            </h2>

            <p className="mt-2 max-w-[260px] text-[12px] leading-5 text-gray-400 dark:text-gray-500">
              Personalize your journey and secure your place with confidence.
            </p>

          </div>

          {/* Price */}
          <div className="shrink-0 text-right">

            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400">
              From
            </p>

            <div className="mt-1 flex items-baseline justify-end gap-1">
              <span className="text-[24px] font-bold tracking-[-0.04em] text-gray-950 dark:text-white">
                ${pricePerSeat.toFixed(0)}
              </span>

              <span className="text-[10px] text-gray-400">
                / person
              </span>
            </div>

          </div>
        </div>

        {/* ================= DESTINATION CARD ================= */}
        <div className="mt-7 flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-gray-50/70 p-3 dark:border-white/[0.07] dark:bg-white/[0.025]">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <EventAvailableRounded sx={{ fontSize: 20 }} />
          </div>

          <div className="min-w-0 flex-1">

            <p className="truncate text-[12px] font-semibold text-gray-800 dark:text-gray-200">
              {destinationData?.title || "Your selected journey"}
            </p>

            <p className="mt-0.5 text-[10px] text-gray-400">
              {destinationData?.durationDays} days · Flexible planning
            </p>

          </div>

          <CheckCircleRounded
            sx={{ fontSize: 18 }}
            className="shrink-0 text-emerald-500"
          />

        </div>

        {/* ================= FORM ================= */}
        <div className="mt-7">

          {/* Booking date */}
          <div>
            <TextField
              label="Preferred travel date"
              type="date"
              fullWidth
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={fieldSx}
            />
          </div>

          {/* Travelers heading */}
          <div className="mt-6 mb-3 flex items-center justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                Travelers
              </p>

              <p className="mt-1 text-[10px] text-gray-400">
                Select the number of guests
              </p>
            </div>

            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
              {travelerCount}{" "}
              {travelerCount === 1 ? "traveler" : "travelers"}
            </span>

          </div>

          {/* Adults + Children */}
          <div className="grid grid-cols-2 gap-3">

            <TextField
              label="Adults"
              select
              value={adultSeats}
              onChange={(e) => setAdultSeats(Number(e.target.value))}
              fullWidth
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <PersonOutlineRounded
                    className="mr-2 text-gray-400"
                    fontSize="small"
                  />
                ),
              }}
            >
              {[...Array(10).keys()].map((x) => (
                <MenuItem key={x + 1} value={x + 1}>
                  {x + 1}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Children"
              select
              value={childSeats}
              onChange={(e) => setChildSeats(Number(e.target.value))}
              fullWidth
              sx={fieldSx}
            >
              {[...Array(11).keys()].map((x) => (
                <MenuItem key={x} value={x}>
                  {x}
                </MenuItem>
              ))}
            </TextField>

          </div>

          {/* Phone */}
          <div className="mt-3">
            <TextField
              label="Phone number"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <PhoneOutlined
                    className="mr-2 text-gray-400"
                    fontSize="small"
                  />
                ),
              }}
            />
          </div>

          {/* Message */}
          <div className="mt-3">
            <TextField
              label="Special requests"
              multiline
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              sx={{
                ...fieldSx,
                "& .MuiOutlinedInput-root": {
                  ...fieldSx["& .MuiOutlinedInput-root"],
                  alignItems: "flex-start",
                  paddingTop: "14px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <NotesRounded
                    className="mr-2 mt-1 text-gray-400"
                    fontSize="small"
                  />
                ),
              }}
            />
          </div>

        </div>

        {/* ================= PRICE SUMMARY ================= */}
        <div className="mt-6 overflow-hidden rounded-[22px] border border-gray-200/70 bg-gray-50/70 dark:border-white/[0.07] dark:bg-white/[0.025]">

          <div className="p-4">

            {/* Subtotal */}
            <div className="flex items-center justify-between">

              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                {travelerCount}{" "}
                {travelerCount === 1 ? "traveler" : "travelers"}
              </span>

              <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300">
                ${subtotal.toFixed(2)}
              </span>

            </div>

            {/* VAT */}
            <div className="mt-2.5 flex items-center justify-between">

              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                VAT
              </span>

              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                ${vat.toFixed(2)}
              </span>

            </div>

            <div className="my-4 h-px bg-gray-200 dark:bg-white/[0.08]" />

            {/* Total */}
            <div className="flex items-end justify-between">

              <div>

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Total journey
                </p>

                <p className="mt-1 text-[28px] font-bold tracking-[-0.045em] text-gray-950 dark:text-white">
                  ${totalPrice}
                </p>

              </div>

              <span className="mb-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                VAT included
              </span>

            </div>

          </div>
        </div>

        {/* ================= CTA ================= */}
        <Button 
        
          variant="contained"
          fullWidth
          onClick={handleBooking}
          endIcon={<ArrowForwardRounded />}
          sx={{
            mt: 2,
            height: 58,
            borderRadius: "18px",
            background:
              "linear-gradient(135deg, #2095ae 0%, #157c91 50%, #106d7f 100%)",
            textTransform: "none",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            boxShadow:
              "0 18px 40px -16px rgba(32,149,174,.65), inset 0 1px 0 rgba(255,255,255,.18)",
            "&:hover": {
              background:
                "linear-gradient(135deg, #249db6 0%, #168198 50%, #117285 100%)",
              transform: "translateY(-2px)",
              boxShadow:
                "0 22px 45px -16px rgba(32,149,174,.7), inset 0 1px 0 rgba(255,255,255,.2)",
            },
            transition: "all .3s cubic-bezier(.2,.8,.2,1)",
          }}
        >
          Continue to secure booking
        </Button>

        {/* ================= ACTIONS ================= */}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-gray-100 pt-5 dark:border-white/[0.07] pt-4">

          <button
            type="button"
            title="Add to wishlist"
            onClick={() => setIsWishlisted((prev) => !prev)}
            className="group flex items-center gap-2 text-[11px] font-semibold text-gray-500 transition hover:text-primary dark:text-gray-400"
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                isWishlisted
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-gray-200 group-hover:border-primary/30 group-hover:bg-primary/5 dark:border-white/10"
              }`}
            >
              <FavoriteBorderOutlined sx={{ fontSize: 17 }} />
            </span>

            {isWishlisted ? "Saved journey" : "Save journey"}
          </button>

          <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
            <VisibilityOutlined sx={{ fontSize: 15 }} />
            3,771 views
          </div>

        </div>

        {/* ================= TRUST STRIP ================= */}
        <div className="mt-5 grid grid-cols-2 gap-2">

          <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5 dark:bg-white/[0.025]">

            <ShieldOutlined
              sx={{ fontSize: 15 }}
              className="shrink-0 text-emerald-500"
            />

            <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400">
              Secure booking
            </span>

          </div>

          <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5 dark:bg-white/[0.025]">

            <CheckCircleRounded
              sx={{ fontSize: 15 }}
              className="shrink-0 text-primary"
            />

            <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400">
              No hidden fees
            </span>

          </div>

        </div>

        {/* Footer reassurance */}
        <p className="mt-4 text-center text-[9px] leading-4 text-gray-400">
          Your request is reviewed by our travel team before final confirmation.
        </p>

      </div>
    </div>
  );
};

export default DestinationsBookingForm;

