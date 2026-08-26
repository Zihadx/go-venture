import DestinationsBigCard from "../ui/Destinations/DestinationsBigCard";
import DestinationsSmallCard from "../ui/Destinations/DestinationsSmallCard";
import Link from "next/link";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";

const DestinationsPage = ({ destinations }) => {
  const destinationList = destinations?.data || [];

  return (
    <section className="relative overflow-hidden bg-[#f7f8f6] py-24 sm:py-28 lg:py-36">
      {/* Ambient background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-[#2095AE]/[0.035] blur-3xl" />

        <div className="absolute left-0 top-[35%] h-px w-full bg-[#111827]/[0.05]" />

        <div className="absolute right-[7%] top-[18%] hidden h-32 w-px bg-[#2095AE]/20 lg:block" />
      </div>

      <div className="custom-container relative z-10">
        {/* =====================================================
            SECTION INTRO
        ====================================================== */}

        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#2095AE]">
              02
            </span>

            <span className="h-px w-12 bg-[#2095AE]/50" />

            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#111827]/40">
              Destinations
            </span>
          </div>

          <div>
            <h1 className="max-w-5xl text-[clamp(3rem,6vw,6.8rem)] font-medium leading-[0.9] tracking-[-0.06em] text-[#111827]">
              Go where the
              <br />
              <span className="font-serif italic text-[#2095AE]">
                extraordinary
              </span>{" "}
              begins.
            </h1>

            <p className="mt-8 max-w-2xl text-[15px] leading-[1.85] text-[#111827]/55 sm:text-base">
              Explore destinations selected for more than their beauty.
              Discover places with character, culture, adventure and stories
              worth carrying home.
            </p>
          </div>
        </div>

        {/* =====================================================
            FILTER / CATEGORY BAR
        ====================================================== */}

        <div className="mt-14 flex flex-col gap-5 border-y border-[#111827]/10 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="group relative px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#111827]"
            >
              Destinations

              <span className="absolute bottom-0 left-4 h-[2px] w-[calc(100%-2rem)] bg-[#2095AE]" />
            </button>

            <button
              type="button"
              className="group px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#111827]/35 transition-colors duration-300 hover:text-[#2095AE]"
            >
              Sanctuaries
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2095AE]" />

            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#111827]/35">
              {destinationList.length}+ curated locations
            </span>
          </div>
        </div>

        {/* =====================================================
            FEATURED DESTINATION
        ====================================================== */}

        {destinationList.slice(0, 1).map((destination) => (
          <div key={destination._id} className="mt-16">
            <DestinationsBigCard destination={destination} />
          </div>
        ))}

        {/* =====================================================
            COLLECTION HEADER
        ====================================================== */}

        <div className="mt-28 flex flex-col gap-5 border-b border-[#111827]/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.28em] text-[#2095AE]">
              The Collection
            </span>

            <h2 className="text-3xl font-medium tracking-[-0.04em] text-[#111827] sm:text-4xl">
              Places worth disappearing into.
            </h2>
          </div>

          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#111827]/35">
            Selected retreats
          </span>
        </div>

        {/* =====================================================
            DESTINATION COLLECTION
        ====================================================== */}

        <div className="mt-10 grid grid-cols-1 gap-x-7 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {destinationList.slice(1, 4).map((destination, index) => (
            <DestinationsSmallCard
              key={destination._id}
              destination={destination}
              index={index}
            />
          ))}
        </div>

        {/* =====================================================
            VIEW ALL
        ====================================================== */}

        <div className="mt-20 flex justify-center">
          <Link
            href="/all-destinations"
            className="group inline-flex items-center gap-6 border-b border-[#111827]/20 pb-3 transition-colors duration-300 hover:border-[#2095AE]"
          >
            <span className="text-sm font-semibold tracking-[-0.01em] text-[#111827]">
              View all{" "}
              <span className="text-[#2095AE]">
                {destinationList.length}+
              </span>{" "}
              destinations
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#111827]/15 transition-all duration-300 group-hover:border-[#2095AE] group-hover:bg-[#2095AE]">
              <ArrowForwardRounded
                sx={{ fontSize: 17 }}
                className="text-[#111827] transition-colors duration-300 group-hover:text-white"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationsPage;