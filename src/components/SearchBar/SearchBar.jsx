"use client"
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Select, MenuItem, Button, InputLabel, FormControl, TextField } from "@mui/material";
import { Search, LocationOn, Event, Person, SailingOutlined } from "@mui/icons-material";

const SearchBar = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    <div className="px-3 flex justify-center items-center">
      <div className="flex flex-col md:flex-row items-center justify-center bg-white shadow-md space-y-4 md:space-y-0 md:space-x-4 rounded-lg px-5 py-4 z-40 w-full md:w-auto -translate-y-28 -mt-10 md:-translate-y-10 md:-mt-0">
        {/* --------Destination -------------*/}
        <div className="flex items-center w-full">
          <LocationOn className="text-orange-500" />
          <FormControl className="ml-2 w-full" sx={{ minWidth: 150 }} size="small">
            <InputLabel id="destination-label">Where are you going?</InputLabel>
            <Controller
              name="destination"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="destination-label"
                  id="destination-select"
                  label="Where are you going?"
                >
                  {destinations.map((destination, index) => (
                    <MenuItem key={index} value={destination}>
                      {destination}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.destination && <span className="text-red-400 text-sm">This field is required</span>}
          </FormControl>
        </div>

        {/* ---------Activity --------------*/}
        <div className="flex items-center w-full">
          <SailingOutlined className="text-orange-500" />
          <FormControl className="ml-2 w-full" sx={{ minWidth: 150 }} size="small">
            <InputLabel id="activity-label">All Activity</InputLabel>
            <Controller
              name="activity"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="activity-label"
                  id="activity-select"
                  label="All Activity"
                >
                  {activities.map((activity, index) => (
                    <MenuItem key={index} value={activity}>
                      {activity}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.activity && <span className="text-red-400 text-sm">This field is required</span>}
          </FormControl>
        </div>

        {/*---------- Date -------------*/}
        <div className="flex items-center w-full">
          <Event className="text-orange-500" />
          <FormControl className="ml-2 w-full" sx={{ minWidth: 150 }} size="small">
            <Controller
              name="date"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  type="date"
                  label="When"
                  variant="outlined"
                  InputLabelProps={{
                    className: "text-gray-600",
                    shrink: true,
                  }}
                  InputProps={{
                    className: "text-gray-600",
                  }}
                />
              )}
            />
          </FormControl>
        </div>

        {/* -----------Seat ------------*/}
        <div className="flex items-center w-full">
          <Person className="text-orange-500" />
          <FormControl className="ml-2 w-full" sx={{ minWidth: 150 }} size="small">
            <InputLabel id="guests-label">Guests</InputLabel>
            <Controller
              name="guests"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="guests-label"
                  id="guests-select"
                  label="Guests"
                >
                  {guests.map((guest, index) => (
                    <MenuItem key={index} value={guest}>
                      {guest}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.guests && <span className="text-red-400 text-sm">This field is required</span>}
          </FormControl>
        </div>

        {/*--------------- Search Button ------------*/}
        <div className="w-full flex justify-center md:justify-start">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Search />}
            className="bg-primary text-white w-full"
            onClick={handleSubmit(onSubmit)}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
