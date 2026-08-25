"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  ChevronDown,
  BookOpen,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";

import bannerImage from "@/assets/All-image/all-destinations-banner2.jpg";
import BlogsCard from "@/components/ui/CardDesign/BlogsCard/BlogsCard";

const AllBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blogs`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const result = await res.json();

        setBlogs(Array.isArray(result?.data) ? result.data : []);
      } catch (error) {
        console.error("Blog fetching error:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  // ---------------------------------------
  // Helpers
  // ---------------------------------------

  const getBlogCategory = (blog) => {
    if (typeof blog?.category === "string") {
      return blog.category;
    }

    if (typeof blog?.blogCategory === "string") {
      return blog.blogCategory;
    }

    if (typeof blog?.category?.name === "string") {
      return blog.category.name;
    }

    return "Travel";
  };

  const getBlogDate = (blog) => {
    return (
      blog?.createdAt ||
      blog?.publishedAt ||
      blog?.updatedAt ||
      blog?.date ||
      null
    );
  };

  const getBlogTitle = (blog) => {
    return (
      blog?.title ||
      blog?.name ||
      blog?.heading ||
      ""
    );
  };

  const getBlogDescription = (blog) => {
    return (
      blog?.description ||
      blog?.excerpt ||
      blog?.content ||
      ""
    );
  };

  // ---------------------------------------
  // Categories
  // ---------------------------------------

  const categories = useMemo(() => {
    const uniqueCategories = blogs
      .map(getBlogCategory)
      .filter(Boolean);

    return ["All", ...new Set(uniqueCategories)];
  }, [blogs]);

  // ---------------------------------------
  // Filter + Search + Sort
  // ---------------------------------------

  const filteredBlogs = useMemo(() => {
    let result = [...blogs];

    // Category
    if (category !== "All") {
      result = result.filter(
        (blog) => getBlogCategory(blog) === category
      );
    }

    // Search
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((blog) => {
        const title = getBlogTitle(blog).toLowerCase();
        const description = getBlogDescription(blog).toLowerCase();
        const blogCategory = getBlogCategory(blog).toLowerCase();

        return (
          title.includes(query) ||
          description.includes(query) ||
          blogCategory.includes(query)
        );
      });
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(getBlogDate(a) || 0).getTime();
      const dateB = new Date(getBlogDate(b) || 0).getTime();

      if (sortBy === "latest") {
        return dateB - dateA;
      }

      if (sortBy === "oldest") {
        return dateA - dateB;
      }

      if (sortBy === "title") {
        return getBlogTitle(a).localeCompare(getBlogTitle(b));
      }

      return 0;
    });

    return result;
  }, [blogs, category, search, sortBy]);

  // ---------------------------------------
  // Reset
  // ---------------------------------------

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("latest");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "All" ||
    sortBy !== "latest";

  return (
    <main className="bg-white">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative h-[430px] md:h-[500px] overflow-hidden">
        <Image
          src={bannerImage}
          alt="Travel blogs"
          fill
          priority
          className="object-cover"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/75" />

        <div className="relative z-10 flex h-full items-center justify-center px-5">
          <div className="max-w-3xl text-center text-white">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              Travel Stories & Inspiration
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Stories That
              <span className="block text-white/80">
                Inspire You to Explore
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/80 sm:text-base md:text-lg">
              Discover inspiring destinations, unforgettable experiences,
              practical travel guides and stories from around the world.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <section className="custom-container py-12 md:py-16">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              <BookOpen className="h-4 w-4" />
              Our Journal
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
              Explore Our Latest Stories
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
              Find travel inspiration, hidden gems, expert tips and stories
              to help you plan your next adventure.
            </p>
          </div>

          <div className="hidden rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-500 md:block">
            <span className="font-semibold text-gray-900">
              {filteredBlogs.length}
            </span>{" "}
            {filteredBlogs.length === 1 ? "story" : "stories"}
          </div>
        </div>

        {/* =====================================================
            SEARCH BAR
        ====================================================== */}

        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-3 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">

          <div className="flex flex-col gap-3 lg:flex-row">

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles, destinations, travel tips..."
                className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="relative lg:w-[210px]">
              <ArrowUpDown className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-14 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-10 text-sm font-medium text-gray-700 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
              >
                <option value="latest">Latest Stories</option>
                <option value="oldest">Oldest Stories</option>
                <option value="title">Alphabetical</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Mobile Filter */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex h-14 items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 text-sm font-semibold text-white transition hover:bg-gray-800 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {/* =====================================================
            MAIN GRID
        ====================================================== */}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

          {/* ===================================================
              SIDEBAR
          ==================================================== */}

          <aside
            className={`
              w-full shrink-0 lg:sticky lg:top-24 lg:block lg:w-[270px]
              ${mobileFilterOpen ? "block" : "hidden"}
            `}
          >
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

              {/* Filter heading */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Filters
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Refine your stories
                  </p>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Category */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-900">
                    Categories
                  </h4>

                  <span className="text-xs text-gray-400">
                    {categories.length - 1}
                  </span>
                </div>

                <div className="space-y-1">
                  {categories.map((item) => {
                    const active = category === item;

                    return (
                      <button
                        key={item}
                        onClick={() => {
                          setCategory(item);
                          setMobileFilterOpen(false);
                        }}
                        className={`
                          group flex w-full items-center justify-between
                          rounded-xl px-3 py-2.5 text-left text-sm
                          transition-all
                          ${
                            active
                              ? "bg-primary text-white shadow-sm"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }
                        `}
                      >
                        <span>{item}</span>

                        {active && (
                          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold">
                            Active
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-gray-100" />

              {/* Active filters */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-gray-900">
                  Current Selection
                </h4>

                <div className="flex flex-wrap gap-2">

                  {category !== "All" && (
                    <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
                      {category}
                    </span>
                  )}

                  {search && (
                    <span className="max-w-full truncate rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
                      “{search}”
                    </span>
                  )}

                  {!hasActiveFilters && (
                    <span className="text-xs text-gray-400">
                      No filters applied
                    </span>
                  )}
                </div>
              </div>

              {/* Reset button */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                >
                  <RotateCcw className="h-4 w-4" />
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* ===================================================
              BLOG AREA
          ==================================================== */}

          <div className="min-w-0 flex-1">

            {/* Result toolbar */}
            <div className="mb-5 flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredBlogs.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    {blogs.length}
                  </span>{" "}
                  stories
                </p>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="hidden items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-primary sm:flex"
                >
                  <X className="h-4 w-4" />
                  Clear filters
                </button>
              )}
            </div>

            {/* Loading */}
            {loading && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
                  >
                    <div className="h-64 animate-pulse bg-gray-100" />

                    <div className="space-y-3 p-5">
                      <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
                      <div className="h-5 w-4/5 animate-pulse rounded bg-gray-100" />
                      <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                    </div>
                  </div>
                ))}

              </div>
            )}

            {/* Blog Grid */}
            {!loading && filteredBlogs.length > 0 && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {filteredBlogs.map((blog) => (
                  <BlogsCard
                    key={blog?._id || blog?.id}
                    blog={blog}
                  />
                ))}
              </div>
            )}

            {/* Empty */}
            {!loading && filteredBlogs.length === 0 && (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50/70 px-6 text-center">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <Search className="h-7 w-7 text-gray-400" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  No stories found
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  We couldn&apos;t find any articles matching your current
                  search or filters. Try another keyword or clear your filters.
                </p>

                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AllBlogsPage;