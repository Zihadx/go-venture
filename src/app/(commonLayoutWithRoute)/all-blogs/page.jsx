"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownAZ,
  ArrowUpDown,
  BookOpen,
  CalendarDays,
  ChevronDown,
  Filter,
  Search,
  Sparkles,
  X,
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

  // =========================================================
  // FETCH BLOGS
  // =========================================================

  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);

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

  // =========================================================
  // HELPERS
  // =========================================================

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
    return blog?.title || blog?.name || blog?.heading || "";
  };

  const getBlogDescription = (blog) => {
    return blog?.description || blog?.excerpt || blog?.content || "";
  };

  // =========================================================
  // CATEGORIES
  // =========================================================

  const categories = useMemo(() => {
    const uniqueCategories = blogs
      .map(getBlogCategory)
      .filter(Boolean);

    return ["All", ...new Set(uniqueCategories)];
  }, [blogs]);

  // =========================================================
  // FILTER + SEARCH + SORT
  // =========================================================

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
      const query = search.toLowerCase().trim();

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

  // =========================================================
  // RESET
  // =========================================================

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("latest");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "All" ||
    sortBy !== "latest";

  // =========================================================
  // UI
  // =========================================================

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f8f6] text-gray-950">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-[620px] overflow-hidden md:min-h-[680px]">

        <Image
          src={bannerImage}
          alt="Travel stories and inspiration"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/85" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 flex min-h-[620px] items-end md:min-h-[680px]">

          <div className="custom-container w-full pb-20 md:pb-24">

            <div className="max-w-4xl">

              {/* Eyebrow */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-white" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90">
                  Go-Venture Journal
                </span>
              </div>

              {/* Heading */}
              <h1 className="max-w-4xl text-5xl font-medium leading-[0.96] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[88px]">

                Stories worth

                <span className="block font-light italic text-white/65">
                  traveling for.
                </span>

              </h1>

              {/* Description */}
              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/70 sm:text-base md:text-lg">
                Discover thoughtful travel stories, hidden places,
                practical guides, and inspiration for your next
                unforgettable journey.
              </p>

              {/* Hero bottom information */}
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">

                <div className="flex items-center gap-3 text-white/80">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                    <BookOpen className="h-4 w-4" />
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      {blogs.length}
                    </p>

                    <p className="text-[11px] uppercase tracking-wider text-white/50">
                      Stories
                    </p>
                  </div>
                </div>

                <div className="hidden h-8 w-px bg-white/20 sm:block" />

                <div className="flex items-center gap-3 text-white/80">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                    <CalendarDays className="h-4 w-4" />
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Fresh perspectives
                    </p>

                    <p className="text-[11px] uppercase tracking-wider text-white/50">
                      Updated regularly
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8f8f6] to-transparent" />

      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <section className="custom-container relative py-16 md:py-24">

        {/* Intro */}
        <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

          <div className="max-w-2xl">

            <div className="mb-4 flex items-center gap-3">

              <span className="h-px w-8 bg-primary" />

              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
                The Journal
              </span>

            </div>

            <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-gray-950 md:text-5xl">

              Explore ideas,

              <span className="block font-light italic text-gray-400">
                places & stories.
              </span>

            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
              From quiet hidden gems to unforgettable adventures,
              explore stories created to make your next journey
              more meaningful.
            </p>

          </div>

          {/* Result count */}
          <div className="flex items-center gap-3">

            <div className="rounded-full border border-gray-200 bg-white px-4 py-2.5 shadow-sm">

              <span className="text-sm font-semibold text-gray-950">
                {filteredBlogs.length}
              </span>

              <span className="ml-1.5 text-xs text-gray-500">
                {filteredBlogs.length === 1
                  ? "story"
                  : "stories"}
              </span>

            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-500 transition hover:border-gray-300 hover:text-gray-950"
              >
                Reset
              </button>
            )}

          </div>

        </div>

        {/* =====================================================
            SEARCH / SORT BAR
        ====================================================== */}

        <div className="relative z-20 mb-10 rounded-2xl border border-gray-200/80 bg-white p-2 shadow-[0_18px_60px_rgba(0,0,0,0.06)]">

          <div className="flex flex-col gap-2 md:flex-row">

            {/* Search */}
            <div className="relative flex-1">

              <Search className="absolute left-5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search stories, destinations, guides..."
                className="h-14 w-full rounded-xl border border-transparent bg-gray-50 pl-12 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:bg-gray-100 focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200 hover:text-gray-900"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

            </div>

            {/* Sort */}
            <div className="relative md:w-[220px]">

              <ArrowUpDown className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-14 w-full cursor-pointer appearance-none rounded-xl border border-transparent bg-gray-50 pl-11 pr-10 text-sm font-medium text-gray-700 outline-none transition-all hover:bg-gray-100 focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/10"
              >
                <option value="latest">
                  Latest Stories
                </option>

                <option value="oldest">
                  Oldest Stories
                </option>

                <option value="title">
                  Alphabetical
                </option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            </div>

            {/* Mobile filter */}
            <button
              type="button"
              onClick={() =>
                setMobileFilterOpen((current) => !current)
              }
              className="flex h-14 items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 text-sm font-semibold text-white transition-all hover:bg-primary md:px-8 lg:hidden"
            >
              <Filter className="h-4 w-4" />

              Filters

              {category !== "All" && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/15 px-1.5 text-[10px]">
                  1
                </span>
              )}
            </button>

          </div>

        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">

          {/* ===================================================
              SIDEBAR
          ==================================================== */}

          <aside
            className={`
              ${
                mobileFilterOpen
                  ? "block"
                  : "hidden"
              }
              lg:block
            `}
          >

            <div className="lg:sticky lg:top-28">

              <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white">

                {/* Sidebar header */}
                <div className="border-b border-gray-100 p-5">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                        Browse
                      </p>

                      <h3 className="mt-1 text-lg font-semibold tracking-tight text-gray-950">
                        Categories
                      </h3>

                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                    </div>

                  </div>

                </div>

                {/* Categories */}
                <div className="p-3">

                  <div className="space-y-1">

                    {categories.map((item) => {
                      const active = category === item;

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setCategory(item);
                            setMobileFilterOpen(false);
                          }}
                          className={`
                            group flex w-full items-center justify-between
                            rounded-xl px-3.5 py-3 text-left text-sm
                            transition-all duration-200
                            ${
                              active
                                ? "bg-gray-950 font-semibold text-white shadow-md"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                            }
                          `}
                        >

                          <span>{item}</span>

                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          )}

                        </button>
                      );
                    })}

                  </div>

                </div>

                {/* Sidebar bottom */}
                <div className="border-t border-gray-100 p-5">

                  <div className="flex items-center justify-between">

                    <span className="text-xs text-gray-400">
                      Showing
                    </span>

                    <span className="text-xs font-semibold text-gray-900">
                      {filteredBlogs.length} / {blogs.length}
                    </span>

                  </div>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-950"
                    >
                      <X className="h-3.5 w-3.5" />
                      Clear filters
                    </button>
                  )}

                </div>

              </div>

            </div>

          </aside>

          {/* ===================================================
              BLOG CONTENT
          ==================================================== */}

          <div className="min-w-0">

            {/* Result toolbar */}
            <div className="mb-6 flex items-center justify-between">

              <div>

                <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-400">
                  Travel Journal
                </p>

                <p className="mt-1 text-sm text-gray-500">

                  Showing{" "}

                  <span className="font-semibold text-gray-950">
                    {filteredBlogs.length}
                  </span>

                  {" "}of{" "}

                  <span className="font-semibold text-gray-950">
                    {blogs.length}
                  </span>

                  {" "}
                  stories

                </p>

              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="hidden items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-gray-500 transition hover:bg-white hover:text-gray-950 sm:flex"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear all
                </button>
              )}

            </div>

            {/* =================================================
                LOADING
            ================================================== */}

            {loading && (
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2">

                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
                  >

                    <div className="relative h-[270px] animate-pulse bg-gray-100" />

                    <div className="space-y-4 p-6">

                      <div className="h-3 w-20 animate-pulse rounded-full bg-gray-100" />

                      <div className="h-6 w-4/5 animate-pulse rounded bg-gray-100" />

                      <div className="h-4 w-full animate-pulse rounded bg-gray-100" />

                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />

                      <div className="pt-2">
                        <div className="h-3 w-28 animate-pulse rounded-full bg-gray-100" />
                      </div>

                    </div>

                  </div>
                ))}

              </div>
            )}

            {/* =================================================
                RESULTS
            ================================================== */}

            {!loading && filteredBlogs.length > 0 && (
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2">

                {filteredBlogs.map((blog) => (
                  <div
                    key={blog?._id || blog?.id}
                    className="group"
                  >
                    <BlogsCard blog={blog} />
                  </div>
                ))}

              </div>
            )}

            {/* =================================================
                EMPTY
            ================================================== */}

            {!loading && filteredBlogs.length === 0 && (
              <div className="relative flex min-h-[480px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 text-center">

                {/* Decorative background */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

                <div className="relative">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-gray-950">
                    Nothing found
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                    We couldn&apos;t find any stories matching your
                    current search or category. Try a different
                    keyword or explore all stories.
                  </p>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary"
                    >
                      <X className="h-4 w-4" />
                      Reset filters
                    </button>
                  )}

                </div>

              </div>
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          EDITORIAL CTA
      ====================================================== */}

      {!loading && blogs.length > 0 && (
        <section className="custom-container pb-20 md:pb-28">

          <div className="relative overflow-hidden rounded-[28px] bg-gray-950 px-7 py-14 md:px-14 md:py-16">

            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

            <div className="relative z-10 flex flex-col justify-between gap-10 md:flex-row md:items-end">

              <div className="max-w-2xl">

                <div className="mb-5 flex items-center gap-3">

                  <Sparkles className="h-4 w-4 text-primary" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
                    Keep exploring
                  </span>

                </div>

                <h2 className="text-3xl font-medium leading-tight tracking-tight text-white md:text-4xl">

                  The world is bigger

                  <span className="block font-light italic text-white/50">
                    than your screen.
                  </span>

                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-white/50">
                  Keep discovering places, experiences and stories
                  that make travel worth remembering.
                </p>

              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-semibold text-gray-950 transition hover:bg-primary hover:text-white"
              >
                Explore all stories
              </button>

            </div>

          </div>

        </section>
      )}

    </main>
  );
};

export default AllBlogsPage;