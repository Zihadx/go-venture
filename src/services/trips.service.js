import { getPackagesSnapshot, getPackageById as getPackageByIdAsync } from "@/services/packages.service";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

// Only "active" (published) packages are ever shown publicly — draft and
// archived packages exist in the admin store but never leak into the
// customer-facing catalog or booking flow.
function getPublishedPackages() {
  return getPackagesSnapshot().filter((p) => p.status === "active");
}

export async function searchTrips({ search = "", category = "all", maxPrice = 5000, sort = "popular" } = {}) {
  await delay();
  let rows = getPublishedPackages();
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

  const categories = [...new Set(getPublishedPackages().map((t) => t.category))];
  return { data: rows, total: rows.length, categories };
}

export async function getTripById(id) {
  await delay(150);
  return getPackageByIdAsync(id);
}
