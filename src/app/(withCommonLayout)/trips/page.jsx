"use client";

import { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { TextField, InputAdornment, MenuItem, Select, Slider } from "@mui/material";
import { searchTrips } from "@/services/trips.service";
import { getWishlist, toggleWishlist } from "@/services/customer.service";
import useCurrentUser from "@/hooks/useCurrentUser";
import TripCard from "@/components/ui/Trips/TripCard";

export default function TripsBrowsePage() {
  const { user } = useCurrentUser();
  const [trips, setTrips] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sort, setSort] = useState("popular");
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    setLoading(true);
    searchTrips({ search, category, maxPrice, sort }).then(({ data, categories }) => {
      setTrips(data);
      setCategories(categories);
      setLoading(false);
    });
  }, [search, category, maxPrice, sort]);

  useEffect(() => {
    if (!user?.email) return;
    getWishlist(user.email).then((list) => setWishlistIds(list.map((t) => t.id)));
  }, [user?.email]);

  const handleToggleWishlist = async (tripId) => {
    if (!user?.email) return;
    const nowWishlisted = await toggleWishlist(user.email, tripId);
    setWishlistIds((prev) => (nowWishlisted ? [...prev, tripId] : prev.filter((id) => id !== tripId)));
  };

  return (
    <div className="custom-container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary">Explore trips</h1>
        <p className="text-gray-500 mt-1">Search, filter, and book a package in a few clicks.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <aside className="lg:w-64 shrink-0 space-y-6">
          <TextField
            fullWidth
            size="small"
            placeholder="Search destination or trip…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchOutlinedIcon fontSize="small" /></InputAdornment> }}
          />
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Category</p>
            <Select fullWidth size="small" value={category} onChange={(e) => setCategory(e.target.value)}>
              <MenuItem value="all">All categories</MenuItem>
              {categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Max price: ${maxPrice}</p>
            <Slider min={300} max={2000} step={50} value={maxPrice} onChange={(_, v) => setMaxPrice(v)} sx={{ color: "#2095ae" }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Sort by</p>
            <Select fullWidth size="small" value={sort} onChange={(e) => setSort(e.target.value)}>
              <MenuItem value="popular">Most popular</MenuItem>
              <MenuItem value="rating">Highest rated</MenuItem>
              <MenuItem value="price_low">Price: low to high</MenuItem>
              <MenuItem value="price_high">Price: high to low</MenuItem>
            </Select>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-4">{loading ? "Searching…" : `${trips.length} trips found`}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {loading &&
              Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-80 rounded-xl bg-gray-100 animate-pulse" />)}
            {!loading && trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                wishlisted={wishlistIds.includes(trip.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
          {!loading && trips.length === 0 && (
            <p className="text-center text-gray-400 py-16">No trips match your filters. Try widening your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
