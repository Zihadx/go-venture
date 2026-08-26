import HotDealsCard from "../ui/CardDesign/HotDealsCard/HotDealsCard";
import { ArrowForwardRounded, LocalFireDepartmentRounded } from "@mui/icons-material";
import Link from "next/link";

const HotDeals = ({ hotDealData = [], destinations }) => {
  const destinationData = destinations?.data || [];

  return (
    <section className="relative mt-28 overflow-hidden py-10 md:mt-36">
      <div className="custom-container">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-12 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">

            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2095ae]/10 text-[#2095ae]">
                <LocalFireDepartmentRounded fontSize="small" />
              </span>

              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2095ae]">
                Limited Time Offers
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-medium leading-[1.08] tracking-tight text-[#10213a] md:text-5xl lg:text-6xl">
              Extraordinary trips.
              <br />

              <span className="font-serif italic text-[#2095ae]">
                Exceptional prices.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
              Unlock incredible destinations at prices worth travelling for.
              These exclusive offers won&apos;t stay around forever.
            </p>
          </div>

          {/* Desktop CTA */}
          <Link
            href="/all-destinations"
            className="group hidden items-center gap-3 text-sm font-semibold text-[#10213a] md:flex"
          >
            <span className="border-b border-[#10213a]/20 pb-1 transition-colors duration-300 group-hover:border-[#2095ae] group-hover:text-[#2095ae]">
              View all destinations
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#10213a]/15 transition-all duration-300 group-hover:border-[#2095ae] group-hover:bg-[#2095ae] group-hover:text-white">
              <ArrowForwardRounded
                fontSize="small"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </div>

        {/* =====================================================
            DEAL GRID
        ====================================================== */}

        {hotDealData.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {hotDealData.map((hotDeal) => {
              const destination = destinationData.find(
                (dest) => dest._id === hotDeal.destinationId
              );

              if (!destination) return null;

              return (
                <HotDealsCard
                  key={hotDeal._id}
                  hotDeal={hotDeal}
                  destination={destination}
                />
              );
            })}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-gray-200 py-20 text-center">
            <p className="text-sm text-gray-500">
              No special offers are available right now.
            </p>
          </div>
        )}

        {/* =====================================================
            MOBILE CTA
        ====================================================== */}

        {hotDealData.length > 0 && (
          <div className="mt-10 flex justify-center md:hidden">
            <Link
              href="/all-destinations"
              className="group inline-flex items-center gap-3 rounded-full bg-[#2095ae] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(32,149,174,0.15)] transition-all duration-300 hover:bg-[#16788d] hover:shadow-[0_15px_35px_rgba(32,149,174,0.25)]"
            >
              Explore destinations

              <ArrowForwardRounded
                fontSize="small"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default HotDeals;