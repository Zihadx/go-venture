import { TRIP_CATALOG, TRIP_CATEGORIES, getTripByIdSync } from "@/services/mock/mockTrips";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export async function searchTrips({ search = "", category = "all", maxPrice = 5000, sort = "popular" } = {}) {
  await delay();
  let rows = TRIP_CATALOG;
  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter(
      (t) => t.title.toLowerCase().includes(q) || t.destination.toLowerCase().includes(q) || t.country.toLowerCase().includes(q)
    );
  }
  if (category !== "all") rows = rows.filter((t) => t.category === category);
  rows = rows.filter((t) => t.pricePerHead <= maxPrice);

  rows = [...rows].sort((a, b) => {
    if (sort === "price_low") return a.pricePerHead - b.pricePerHead;
    if (sort === "price_high") return b.pricePerHead - a.pricePerHead;
    if (sort === "rating") return b.rating - a.rating;
    return b.reviewCount - a.reviewCount; // popular
  });

  return { data: rows, total: rows.length, categories: TRIP_CATEGORIES };
}

export async function getTripById(id) {
  await delay(150);
  return getTripByIdSync(id);
}
