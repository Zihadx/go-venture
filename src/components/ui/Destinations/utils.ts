import type { DestinationLocation, LngLat } from "./types";

export const getCoordinates = (
  locations?: DestinationLocation
): LngLat | null => {
  const raw = locations?.coordinates;
  let lng: unknown;
  let lat: unknown;

  if (Array.isArray(raw)) {
    [lng, lat] = raw;
  } else if (raw && typeof raw === "object") {
    lng = raw.lng ?? raw.lon ?? raw.longitude;
    lat = raw.lat ?? raw.latitude;
  }

  if (lng == null || lat == null) return null;

  const x = Number(lng);
  const y = Number(lat);

  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  if (Math.abs(y) > 90 || Math.abs(x) > 180) return null;

  return [x, y];
};

// Fixed locale + UTC so server and client always render identical text.
export const formatDate = (value?: string): string => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};

export const formatPrice = (value?: number): string => {
  const price = Number(value);
  return Number.isFinite(price) ? `$${price.toLocaleString("en-US")}` : "";
};

export const formatLatLng = ([lng, lat]: LngLat): string =>
  `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? "N" : "S"} ${Math.abs(lng).toFixed(
    2
  )}°${lng >= 0 ? "E" : "W"}`;