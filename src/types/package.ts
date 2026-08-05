export type PackageStatus = "active" | "draft" | "archived";

export interface TourPackage {
  id: string;
  title: string;
  description: string;
  destination: string;
  city: string;
  country: string;
  category: string;
  image: string;
  duration: number;
  pricePerHead: number;
  maxTravelers: number;
  rating: number;
  reviewCount: number;
  highlights: string[];
  status: PackageStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PackageListFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: PackageStatus | "all";
  category?: string;
}

export interface PackageInput {
  title: string;
  description: string;
  city: string;
  country: string;
  category: string;
  image: string;
  duration: number;
  pricePerHead: number;
  maxTravelers: number;
  status: PackageStatus;
}
