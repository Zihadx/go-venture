"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowForwardRounded } from "@mui/icons-material";
import BlogsCard from "../ui/CardDesign/BlogsCard/BlogsCard";

const BlogsPage = ({ blogs }) => {
  const blogList = blogs?.data?.slice(0, 3) || [];
  const totalBlogs = blogs?.data?.length || 0;

  const ease = [0.22, 1, 0.36, 1];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f8f6] py-24 md:py-32">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-52 -top-40 h-[620px] w-[620px] rounded-full bg-[#2095AE]/[0.035] blur-3xl" />

        <div className="absolute -bottom-60 -left-40 h-[500px] w-[500px] rounded-full bg-[#2095AE]/[0.025] blur-3xl" />
      </div>

      <div className="custom-container relative z-10">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease }}
            className="max-w-3xl"
          >
            {/* Eyebrow */}
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#2095AE]">
              Travel Journal
            </span>

            {/* Heading */}
            <h2 className="mt-5 text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.92] tracking-[-0.065em] text-[#111827]">
              Stories worth
              <br />
              <span className="font-serif italic text-[#2095AE]">
                travelling for.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-[15px] leading-[1.85] text-[#111827]/55 sm:text-base">
              Destination guides, travel inspiration and stories from the
              places that make the world worth exploring.
            </p>
          </motion.div>

          {/* Desktop CTA */}
          {totalBlogs > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="hidden lg:block"
            >
              <Link
                href="/all-blogs"
                className="group inline-flex items-center gap-4"
              >
                <span className="text-sm font-semibold text-[#111827] transition-colors duration-300 group-hover:text-[#2095AE]">
                  Explore all stories
                </span>

                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#111827]/15 transition-all duration-300 group-hover:border-[#2095AE] group-hover:bg-[#2095AE]">
                  <ArrowForwardRounded
                    sx={{ fontSize: 18 }}
                    className="text-[#111827] transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
                  />
                </span>
              </Link>
            </motion.div>
          )}
        </div>

        {/* =====================================================
            BLOG COLLECTION
        ====================================================== */}
        {blogList.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {blogList.map((blog) => (
              <motion.div
                key={blog._id}
                variants={itemVariants}
                className="h-full"
              >
                <BlogsCard blog={blog} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="mt-16 border border-dashed border-[#111827]/15 py-24 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#2095AE]">
              Travel Journal
            </span>

            <p className="mt-4 text-sm text-[#111827]/45">
              No travel stories available yet.
            </p>
          </div>
        )}

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}
        {totalBlogs > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="mt-14 flex justify-center lg:hidden"
          >
            <Link
              href="/all-blogs"
              className="group inline-flex items-center gap-3 rounded-full bg-[#2095AE] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(32,149,174,0.16)] transition-all duration-300 hover:bg-[#16788D] hover:shadow-[0_16px_35px_rgba(32,149,174,0.24)]"
            >
              Explore all {totalBlogs} stories

              <ArrowForwardRounded
                sx={{ fontSize: 17 }}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogsPage;