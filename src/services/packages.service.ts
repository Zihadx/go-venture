import { TRIP_CATALOG } from "@/services/mock/mockTrips";
import type { TourPackage, PackageListFilters, PackageInput } from "@/types/package";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

const now = new Date().toISOString();


let packagesStore: TourPackage[] = (TRIP_CATALOG as any[]).map((t) => ({
  id: t.id,
  title: t.title,
  description: t.description,
  destination: t.destination,
  city: t.city,
  country: t.country,
  category: t.category,
  image: t.image,
  duration: t.duration,
  pricePerHead: t.pricePerHead,
  maxTravelers: t.maxTravelers,
  rating: Number(t.rating),
  reviewCount: t.reviewCount,
  highlights: t.highlights,
  status: "active",
  createdAt: now,
  updatedAt: now,
}));

export function getPackagesSnapshot(): TourPackage[] {
  return packagesStore;
}

export async function getPackages({ page = 0, pageSize = 10, search = "", status = "all", category = "all" }: PackageListFilters = {}) {
  await delay();
  let rows = packagesStore;
  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter((p) => p.title.toLowerCase().includes(q) || p.destination.toLowerCase().includes(q));
  }
  if (status !== "all") rows = rows.filter((p) => p.status === status);
  if (category !== "all") rows = rows.filter((p) => p.category === category);
  const total = rows.length;
  const start = page * pageSize;
  return { data: rows.slice(start, start + pageSize), total };
}

export async function getPackageById(id: string): Promise<TourPackage | null> {
  await delay(150);
  return packagesStore.find((p) => p.id === id) || null;
}

export async function createPackage(input: PackageInput): Promise<TourPackage> {
  await delay(300);
  const nowIso = new Date().toISOString();
  const pkg: TourPackage = {
    id: `TRIP-${100 + packagesStore.length}`,
    ...input,
    destination: `${input.city}, ${input.country}`,
    rating: 0,
    reviewCount: 0,
    highlights: ["Guided local tours included", "Airport transfers both ways"],
    createdAt: nowIso,
    updatedAt: nowIso,
  };
  packagesStore = [pkg, ...packagesStore];
  return pkg;
}

export async function updatePackage(id: string, input: PackageInput): Promise<TourPackage | undefined> {
  await delay(300);
  packagesStore = packagesStore.map((p) =>
    p.id === id
      ? { ...p, ...input, destination: `${input.city}, ${input.country}`, updatedAt: new Date().toISOString() }
      : p
  );
  return packagesStore.find((p) => p.id === id);
}

export async function setPackageStatus(id: string, status: TourPackage["status"]): Promise<TourPackage | undefined> {
  await delay(200);
  packagesStore = packagesStore.map((p) => (p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p));
  return packagesStore.find((p) => p.id === id);
}

export async function deletePackage(id: string): Promise<void> {
  await delay(200);
  packagesStore = packagesStore.filter((p) => p.id !== id);
}

export function getPackageCategories(): string[] {
  return [...new Set(packagesStore.map((p) => p.category))];
}
