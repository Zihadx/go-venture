"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  MenuItem,
  Button,
  FormControl,
} from "@mui/material";
import {
  SearchRounded,
  LocationOnOutlined,
  CalendarMonthOutlined,
  PeopleAltOutlined,
  SailingOutlined,
} from "@mui/icons-material";

const SearchBar = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      destination: "",
      activity: "",
      date: "",
      guests: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const destinations = [
    "Africa",
    "Morocco",
    "Tanzania",
    "Americas",
    "Argentina",
    "Canada",
    "Asia",
    "Japan",
    "China",
  ];

  const activities = [
    "Beaches",
    "City Tours",
    "Cruises",
    "Hiking",
    "Historical",
    "Museum",
  ];

  const guests = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <section className=" relative z-40 px-4 sm:px-6 bg-[#F7F8F5]">
      <div className="mx-auto  max-w-6xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
          bottom-12
            relative
            overflow-hidden
            rounded-[24px]
            border
            border-white/70
            bg-white/95
            p-2
            shadow-[0_25px_80px_rgba(7,21,37,0.16)]
            backdrop-blur-2xl
            md:rounded-[28px]
          "
        >
          {/* subtle accent */}
          <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#2095ae] to-transparent opacity-70" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.25fr_1.15fr_1fr_0.8fr_auto]">
            {/* =====================================================
                DESTINATION
            ====================================================== */}
            <SearchField
              icon={<LocationOnOutlined />}
              label="Destination"
              value={
                <Controller
                  name="destination"
                  control={control}
                  rules={{ required: "Please select a destination" }}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <Select
                        {...field}
                        displayEmpty
                        variant="standard"
                        disableUnderline
                        renderValue={(selected) =>
                          selected ? (
                            selected
                          ) : (
                            <span className="text-[#10213a]/40">
                              Where do you want to go?
                            </span>
                          )
                        }
                        sx={selectStyles}
                      >
                        <MenuItem value="">
                          Where do you want to go?
                        </MenuItem>

                        {destinations.map((destination) => (
                          <MenuItem
                            key={destination}
                            value={destination}
                          >
                            {destination}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              }
              error={errors.destination?.message}
            />

            {/* =====================================================
                ACTIVITY
            ====================================================== */}
            <SearchField
              icon={<SailingOutlined />}
              label="Experience"
              value={
                <Controller
                  name="activity"
                  control={control}
                  rules={{ required: "Please select an activity" }}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <Select
                        {...field}
                        displayEmpty
                        variant="standard"
                        disableUnderline
                        renderValue={(selected) =>
                          selected ? (
                            selected
                          ) : (
                            <span className="text-[#10213a]/40">
                              Choose an experience
                            </span>
                          )
                        }
                        sx={selectStyles}
                      >
                        <MenuItem value="">
                          Choose an experience
                        </MenuItem>

                        {activities.map((activity) => (
                          <MenuItem
                            key={activity}
                            value={activity}
                          >
                            {activity}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              }
              error={errors.activity?.message}
            />

            {/* =====================================================
                DATE
            ====================================================== */}
            <SearchField
              icon={<CalendarMonthOutlined />}
              label="When"
              value={
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      className="
                        w-full
                        border-0
                        bg-transparent
                        p-0
                        text-sm
                        font-medium
                        text-[#10213a]
                        outline-none
                        focus:ring-0
                      "
                    />
                  )}
                />
              }
            />

            {/* =====================================================
                GUESTS
            ====================================================== */}
            <SearchField
              icon={<PeopleAltOutlined />}
              label="Travelers"
              value={
                <Controller
                  name="guests"
                  control={control}
                  rules={{ required: "Please select guests" }}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <Select
                        {...field}
                        displayEmpty
                        variant="standard"
                        disableUnderline
                        renderValue={(selected) =>
                          selected ? (
                            `${selected} ${
                              selected === 1
                                ? "traveler"
                                : "travelers"
                            }`
                          ) : (
                            <span className="text-[#10213a]/40">
                              Add travelers
                            </span>
                          )
                        }
                        sx={selectStyles}
                      >
                        <MenuItem value="">
                          Add travelers
                        </MenuItem>

                        {guests.map((guest) => (
                          <MenuItem
                            key={guest}
                            value={guest}
                          >
                            {guest}{" "}
                            {guest === 1
                              ? "traveler"
                              : "travelers"}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              }
              error={errors.guests?.message}
            />

            {/* =====================================================
                SEARCH
            ====================================================== */}
            <div className="flex items-center p-2 md:p-3">
              <Button
                type="submit"
                disableElevation
                startIcon={
                  <SearchRounded
                    sx={{ fontSize: 20 }}
                  />
                }
                className="
                  !h-[54px]
                  !w-full
                  !rounded-[17px]
                  !bg-[#2095ae]
                  !px-6
                  !text-sm
                  !font-semibold
                  !normal-case
                  !tracking-wide
                  !text-white
                  transition-all
                  duration-300
                  hover:!bg-[#167b91]
                  hover:shadow-[0_12px_30px_rgba(32,149,174,0.25)]
                  md:!h-[58px]
                  lg:!w-[132px]
                "
              >
                Search
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

/* =========================================================
   SEARCH FIELD
========================================================= */

const SearchField = ({
  icon,
  label,
  value,
  error,
}) => {
  return (
    <div
      className="
        group
        relative
        flex
        min-h-[82px]
        items-center
        gap-3
        px-4
        py-3
        md:px-5
        lg:min-h-[82px]
        lg:border-r
        lg:border-[#10213a]/8
      "
    >
      {/* Icon */}
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#2095ae]/[0.08]
          text-[#2095ae]
          transition-all
          duration-300
          group-hover:bg-[#2095ae]
          group-hover:text-white
        "
      >
        {React.cloneElement(icon, {
          sx: { fontSize: 19 },
        })}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#10213a]/40">
          {label}
        </p>

        <div className="text-sm font-medium text-[#10213a]">
          {value}
        </div>

        {error && (
          <p className="mt-1 text-[10px] text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

/* =========================================================
   MUI SELECT STYLES
========================================================= */

const selectStyles = {
  fontSize: "14px",
  fontWeight: 500,
  color: "#10213a",

  "& .MuiSelect-select": {
    padding: 0,
    minHeight: "unset",
    display: "flex",
    alignItems: "center",
  },

  "& .MuiSelect-icon": {
    right: 0,
    color: "rgba(16,33,58,0.35)",
    fontSize: 20,
  },

  "&:hover .MuiSelect-icon": {
    color: "#2095ae",
  },
};

export default SearchBar;