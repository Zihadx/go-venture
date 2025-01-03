"use client";
import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  isToday,
  isSameMonth,
} from "date-fns";
import { ArrowLeftSharp, ArrowRightSharp } from "@mui/icons-material";
import { Divider } from "@mui/material";
import Image from "next/image";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const generateCalendarRows = () => {
    const startOfMonthDate = startOfMonth(currentDate);
    const endOfMonthDate = endOfMonth(currentDate);

    const startDate = startOfWeek(startOfMonthDate, { weekStartsOn: 1 });
    const endDate = endOfWeek(endOfMonthDate, { weekStartsOn: 1 });

    let day = startDate;
    const rows = [];

    while (day <= endDate) {
      const week = Array(7)
        .fill(0)
        .map(() => {
          const currentDay = day;
          day = addDays(day, 1);
          return currentDay;
        });
      rows.push(week);
    }

    return rows;
  };

  const calendarRows = generateCalendarRows();

  return (
    <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-4">
      <div>
        <h1 className="text-xl font-semibold mb-4">Recent Booking Schedule</h1>
        <div className="flex justify-center gap-4 items-center mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeftSharp style={{ fontSize: "40px" }} />
          </button>
          <h2 className="text-xl font-bold">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <ArrowRightSharp style={{ fontSize: "40px" }} />
          </button>
        </div>

        <div className="grid grid-cols-7 text-center font-semibold text-gray-600">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarRows.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`p-2 h-12 flex items-center justify-center rounded-md cursor-pointer 
                  ${isToday(day) ? "bg-blue-500 text-white" : ""}
                  ${
                    !isSameMonth(day, currentDate)
                      ? "text-gray-400"
                      : "text-gray-800"
                  }
                  hover:bg-blue-100
                `}
                >
                  {format(day, "d")}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
        <Divider style={{ marginTop: "16px", marginBottom: "16px" }} />
      </div>

      <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="w-full md:w-1/3">
          <Image
            src="https://i.ibb.co/3hSQYvj/review-Section.jpg"
            alt="Review Section"
            width={300}
            height={150}
            layout="responsive"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">Bali-2</h1>
          <div className="flex justify-between items-center gap-3">
            <Image
              src="https://i.ibb.co/3hSQYvj/review-Section.jpg"
              alt="Review Section"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p>Sukarna</p>
            <p>12m ago</p>
          </div>
        </div>
        <div className="bg-blue-100 p-2">
            <h1>30,35</h1>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="w-full md:w-1/3">
          <Image
            src="https://i.ibb.co/3hSQYvj/review-Section.jpg"
            alt="Review Section"
            width={300}
            height={150}
            layout="responsive"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">Bali-2</h1>
          <div className="flex justify-between items-center gap-3">
            <Image
              src="https://i.ibb.co/3hSQYvj/review-Section.jpg"
              alt="Review Section"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p>Sukarna</p>
            <p>12m ago</p>
          </div>
        </div>
        <div className="bg-blue-100 p-2">
            <h1>30,35</h1>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="w-full md:w-1/3">
          <Image
            src="https://i.ibb.co/3hSQYvj/review-Section.jpg"
            alt="Review Section"
            width={300}
            height={150}
            layout="responsive"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">Bali-2</h1>
          <div className="flex justify-between items-center gap-3">
            <Image
              src="https://i.ibb.co/3hSQYvj/review-Section.jpg"
              alt="Review Section"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p>Sukarna</p>
            <p>12m ago</p>
          </div>
        </div>
        <div className="bg-blue-100 p-2">
            <h1>30,35</h1>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="w-full md:w-1/3">
          <Image
            src="https://i.ibb.co/3hSQYvj/review-Section.jpg"
            alt="Review Section"
            width={300}
            height={150}
            layout="responsive"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">Bali-2</h1>
          <div className="flex justify-between items-center gap-3">
            <Image
              src="https://i.ibb.co/3hSQYvj/review-Section.jpg"
              alt="Review Section"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p>Sukarna</p>
            <p>12m ago</p>
          </div>
        </div>
        <div className="bg-blue-100 p-2">
            <h1>30,35</h1>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Calendar;
