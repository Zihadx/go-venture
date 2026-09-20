"use client";

import React from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import {
  Select,
  MenuItem,
  ListSubheader,
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

import { motion } from "framer-motion";

/**
 * Design direction — "check-in counter"
 * Same visual language as the rest of the site: a boarding pass. The bar
 * reads as a single ticket with four punched fields and a stamp-style
 * search button at the end — dashed perforations between fields instead
 * of plain borders, grouped destinations instead of a flat list mixing
 * continents and countries.
 *
 * Colors are theme tokens (`dark:` variants throughout) driven by the
 * standard Tailwind `darkMode: 'class'` toggle.
 */

const DISPLAY_FONT =
  "'Fraunces', ui-serif, Georgia, 'Times New Roman', serif";

interface SearchFormValues {
  destination: string;
  activity: string;
  date: string;
  guests: string;
}

/** Continents are group headers, not selectable values — you pick a place, not a landmass. */
const destinationGroups: Record<string, string[]> = {
  Africa: ["Morocco", "Tanzania"],
  Americas: ["Argentina", "Canada"],
  Asia: ["Japan", "China"],
};

const activities = [
  "Beaches",
  "City tours",
  "Cruises",
  "Hiking",
  "Historical",
  "Museums",
];

const guestCounts = Array.from({ length: 10 }, (_, i) => i + 1);

const menuPaperSx = {
  mt: 1,
  borderRadius: "16px",
  boxShadow: "0 20px 45px rgba(18,35,58,0.16)",
  border: "1px solid rgba(18,35,58,0.06)",
  "& .MuiList-root": { py: 0.5 },
};

const selectStyles = {
  fontSize: "14px",
  fontWeight: 500,
  color: "inherit",
  "& .MuiSelect-select": {
    padding: 0,
    minHeight: "unset",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiSelect-icon": {
    right: 0,
    color: "rgba(18,35,58,0.35)",
    fontSize: 20,
  },
  "&:hover .MuiSelect-icon": { color: "#1D8FA6" },
};

const SearchBar = () => {
  const { control, handleSubmit } = useForm<SearchFormValues>({
    defaultValues: { destination: "", activity: "", date: "", guests: "" },
  });

  const onSubmit: SubmitHandler<SearchFormValues> = (data) => {
    console.log(data);
  };

  return (
    <section className="relative z-40 bg-[#F7F4EE] px-4 dark:bg-[#0B1420] sm:px-6">
      <div className="mx-auto max-w-6xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative -translate-y-10 overflow-hidden rounded-[24px] border border-white/70 bg-white/95 p-2 shadow-[0_25px_80px_rgba(18,35,58,0.16)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#12233A]/95 md:rounded-[28px]"
        >
          {/* Accent rail */}
          <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#1D8FA6] to-transparent opacity-70 dark:via-[#2CA6C0]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.1fr_0.95fr_0.85fr_auto]">
            {/* ===================== DESTINATION ===================== */}
            <SearchField
              icon={<LocationOnOutlined sx={{ fontSize: 19 }} />}
              label="Destination"
              divider
            >
              <Controller
                name="destination"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <Select
                      {...field}
                      displayEmpty
                      variant="standard"
                      disableUnderline
                      MenuProps={{ PaperProps: { sx: menuPaperSx } }}
                      renderValue={(selected) =>
                        selected ? (
                          (selected as string)
                        ) : (
                          <span className="text-[#12233A]/40 dark:text-[#F5F1E6]/35">
                            Where to?
                          </span>
                        )
                      }
                      sx={selectStyles}
                    >
                      {Object.entries(destinationGroups).flatMap(
                        ([continent, places]) => [
                          <ListSubheader
                            key={continent}
                            disableSticky
                            sx={{
                              fontSize: 11,
                              fontWeight: 600,
                              letterSpacing: "0.06em",
                              color: "#1D8FA6",
                              lineHeight: "32px",
                            }}
                          >
                            {continent}
                          </ListSubheader>,
                          ...places.map((place) => (
                            <MenuItem key={place} value={place} sx={{ fontSize: 14 }}>
                              {place}
                            </MenuItem>
                          )),
                        ]
                      )}
                    </Select>
                  </FormControl>
                )}
              />
            </SearchField>

            {/* ===================== EXPERIENCE ===================== */}
            <SearchField
              icon={<SailingOutlined sx={{ fontSize: 19 }} />}
              label="Experience"
              divider
            >
              <Controller
                name="activity"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <Select
                      {...field}
                      displayEmpty
                      variant="standard"
                      disableUnderline
                      MenuProps={{ PaperProps: { sx: menuPaperSx } }}
                      renderValue={(selected) =>
                        selected ? (
                          (selected as string)
                        ) : (
                          <span className="text-[#12233A]/40 dark:text-[#F5F1E6]/35">
                            Pick a vibe
                          </span>
                        )
                      }
                      sx={selectStyles}
                    >
                      {activities.map((activity) => (
                        <MenuItem key={activity} value={activity} sx={{ fontSize: 14 }}>
                          {activity}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </SearchField>

            {/* ===================== DATE ===================== */}
            <SearchField
              icon={<CalendarMonthOutlined sx={{ fontSize: 19 }} />}
              label="Departs"
              divider
            >
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="w-full border-0 bg-transparent p-0 text-sm font-medium text-[#12233A] outline-none [color-scheme:light] dark:text-[#F5F1E6] dark:[color-scheme:dark]"
                  />
                )}
              />
            </SearchField>

            {/* ===================== GUESTS ===================== */}
            <SearchField
              icon={<PeopleAltOutlined sx={{ fontSize: 19 }} />}
              label="Travelers"
            >
              <Controller
                name="guests"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <Select
                      {...field}
                      displayEmpty
                      variant="standard"
                      disableUnderline
                      MenuProps={{ PaperProps: { sx: menuPaperSx } }}
                      renderValue={(selected) =>
                        selected ? (
                          `${selected} ${selected === "1" ? "traveler" : "travelers"}`
                        ) : (
                          <span className="text-[#12233A]/40 dark:text-[#F5F1E6]/35">
                            Add travelers
                          </span>
                        )
                      }
                      sx={selectStyles}
                    >
                      {guestCounts.map((count) => (
                        <MenuItem key={count} value={String(count)} sx={{ fontSize: 14 }}>
                          {count} {count === 1 ? "traveler" : "travelers"}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </SearchField>

            {/* ===================== SEARCH — the stamp ===================== */}
            <div className="flex items-center border-t border-dashed border-[#12233A]/10 p-2 dark:border-[#2CA6C0]/15 lg:border-l lg:border-t-0 lg:pl-3">
              <motion.div
                className="w-full"
                whileHover={{ rotate: -2, scale: 1.03 }}
                whileTap={{ rotate: 0, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <Button
                  href="/all-destinations"
                  type="submit"
                  disableElevation
                  startIcon={<SearchRounded sx={{ fontSize: 20 }} />}
                  className="!h-[54px] !w-full !rounded-[17px] !bg-[#1D8FA6] !px-6 !text-sm !font-semibold !normal-case !tracking-wide !text-white transition-shadow duration-300 hover:!bg-[#177E93] hover:shadow-[0_14px_30px_rgba(29,143,166,0.3)] md:!h-[58px] lg:!w-[132px]"
                  style={{ fontFamily: DISPLAY_FONT }}
                >
                  Search
                </Button>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

/* =========================================================
   SEARCH FIELD
   A single punched slot on the pass — icon, small label, value.
========================================================= */

const SearchField = ({
  icon,
  label,
  divider = false,
  children,
}: {
  icon: React.ReactElement;
  label: string;
  divider?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`group relative flex min-h-[78px] items-center gap-3 px-4 py-3 md:px-5 ${
        divider
          ? "border-b border-dashed border-[#12233A]/10 dark:border-[#2CA6C0]/15 lg:border-b-0 lg:border-r"
          : ""
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1D8FA6]/[0.08] text-[#1D8FA6] transition-colors duration-300 group-hover:bg-[#1D8FA6] group-hover:text-white dark:bg-[#2CA6C0]/10 dark:text-[#2CA6C0]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="mb-1 text-[10px] font-medium text-[#12233A]/45 dark:text-[#F5F1E6]/40">
          {label}
        </p>
        <div className="text-sm font-medium text-[#12233A] dark:text-[#F5F1E6]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;