export type LngLat = [number, number];

export interface DestinationLocation {
  city?: string;
  country?: { countryId?: string };
  /** GeoJSON order [lng, lat], or an object with lat/lng. Needed only for the map. */
  coordinates?:
    | LngLat
    | {
        lat?: number;
        lng?: number;
        lon?: number;
        latitude?: number;
        longitude?: number;
      };
}

export interface Destination {
  _id: string;
  title: string;
  description?: string;
  image: string[];
  locations?: DestinationLocation;
  ratingAverage?: number;
  ratingQuantity?: number;
  packagePrice?: number;
  durationDays?: number;
  startDate?: string;
}

export interface DestinationsResponse {
  data?: Destination[];
}