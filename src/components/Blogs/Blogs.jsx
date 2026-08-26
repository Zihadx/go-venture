import React from "react";
import Link from "next/link";
import BlogsCard from "../ui/CardDesign/BlogsCard/BlogsCard";
import { ArrowForwardRounded } from "@mui/icons-material";

const BlogsPage = ({ blogs }) => {
  const blogList = blogs?.data?.slice(0, 3) || [];
  const totalBlogs = blogs?.data?.length || 0;

  return (
    <section className="relative mt-28 overflow-hidden py-10 md:mt-36">
      <div className="custom-container">

        {/* =========================
            SECTION HEADER
        ========================== */}
        <div className="mb-12 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#2095ae]" />

              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2095ae]">
                Travel Journal
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-medium leading-[1.1] tracking-tight text-[#10213a] md:text-5xl lg:text-6xl">
              Stories that
              <span className="font-serif italic text-[#2095ae]">
                {" "}
                inspire
              </span>
              <br />
              your next journey.
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
              Explore inspiring destinations, thoughtful travel guides, and
              stories designed to help you discover more of the world.
            </p>
          </div>

          {/* Desktop CTA */}
          {totalBlogs > 0 && (
            <Link
              href="/all-blogs"
              className="group hidden items-center gap-3 text-sm font-semibold text-[#10213a] transition-all duration-300 md:flex"
            >
              <span className="border-b border-[#10213a]/30 pb-1 transition-colors duration-300 group-hover:border-[#2095ae] group-hover:text-[#2095ae]">
                Explore all stories
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#10213a]/15 transition-all duration-300 group-hover:border-[#2095ae] group-hover:bg-[#2095ae] group-hover:text-white">
                <ArrowForwardRounded
                  fontSize="small"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          )}
        </div>

        {/* =========================
            BLOG GRID
        ========================== */}
        {blogList.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {blogList.map((blog, index) => (
              <div
                key={blog._id}
                className="group relative"
              >
                {/* Editorial Meta */}
                <div className="mb-4 flex items-center justify-between px-1">
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-gray-400">
                    0{index + 1}
                  </span>

                  <span className="mx-4 h-px flex-1 bg-gray-200/70" />

                  <span className="text-[10px] uppercase tracking-[0.18em] text-gray-400">
                    Journal
                  </span>
                </div>

                {/* Card */}
                <div className="overflow-hidden  transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <BlogsCard blog={blog} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-[24px] border border-dashed border-gray-200 py-20 text-center">
            <p className="text-sm text-gray-500">
              No travel stories available yet.
            </p>
          </div>
        )}

        {/* =========================
            MOBILE CTA
        ========================== */}
        {totalBlogs > 0 && (
          <div className="mt-10 flex justify-center md:hidden">
            <Link
              href="/all-blogs"
              className="group inline-flex items-center gap-3 rounded-full bg-[#2095ae] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(32,149,174,0.15)] transition-all duration-300 hover:bg-[#16788d] hover:shadow-[0_15px_35px_rgba(32,149,174,0.25)]"
            >
              Explore all {totalBlogs}+ stories

              <ArrowForwardRounded
                fontSize="small"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}

        {/* =========================
            DESKTOP BOTTOM INFO
        ========================== */}
        {totalBlogs > 0 && (
          <div className="mt-12 hidden items-center justify-between border-t border-gray-200 pt-6 md:flex">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
              Curated travel inspiration
            </p>

            <p className="text-sm text-gray-500">
              <span className="font-semibold text-[#2095ae]">
                {totalBlogs}+
              </span>{" "}
              stories waiting to be discovered
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogsPage;