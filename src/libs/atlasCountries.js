/* Country helpers for the Atlas section.
   Pure JS, no React. Two jobs:
   1. normalizeCountry() — read whatever your API returns (name / image / coordinates …) without
      needing to know the exact field names, and
   2. place countries on the globe: use lat/lng from the API if it has them, otherwise look the
      country up by name in the table below (about 150 countries, aliases included). */

/** @typedef {{ lat: number, lon: number }} Coords */
/** @typedef {{ id: string, name: string, slug: string, image: string | null, coords: Coords | null,
 *              blurb: string, count: { n: number, label: string } | null, raw: any }} AtlasCountry */

const fold = (s) =>
  String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/* name  lat  lon  — approximate centre of the country, good enough for a globe pin */
const TABLE = `
Bangladesh 23.7 90.4
India 21.5 78.9
Nepal 28.4 84.1
Bhutan 27.5 90.4
Sri Lanka 7.9 80.7
Maldives 3.2 73.2
Pakistan 30.4 69.3
Afghanistan 33.9 67.7
Thailand 15.8 101.0
Malaysia 4.2 102.0
Singapore 1.35 103.8
Indonesia -2.5 118.0
Vietnam 14.1 108.3
Cambodia 12.6 104.9
Laos 19.9 102.5
Myanmar 21.9 95.9
Philippines 12.9 121.8
Japan 36.2 138.3
South Korea 35.9 127.8
North Korea 40.3 127.5
China 35.9 104.2
Taiwan 23.7 121.0
Hong Kong 22.3 114.2
Mongolia 46.9 103.8
Kazakhstan 48.0 66.9
Uzbekistan 41.4 64.6
Kyrgyzstan 41.2 74.8
Tajikistan 38.9 71.3
Turkmenistan 39.0 59.6
Azerbaijan 40.1 47.6
Armenia 40.1 45.0
Georgia 42.3 43.4
Turkey 39.0 35.2
Iran 32.4 53.7
Iraq 33.2 43.7
Syria 34.8 38.9
Lebanon 33.9 35.9
Jordan 31.2 36.5
Israel 31.0 34.9
Saudi Arabia 23.9 45.1
United Arab Emirates 23.4 53.8
Qatar 25.4 51.2
Kuwait 29.3 47.5
Bahrain 26.0 50.6
Oman 21.5 55.9
Yemen 15.6 48.5
Brunei 4.5 114.7
Timor Leste -8.9 125.7
United Kingdom 54.0 -2.5
Ireland 53.4 -8.2
France 46.6 2.2
Spain 40.4 -3.7
Portugal 39.6 -8.0
Italy 42.8 12.5
Germany 51.2 10.4
Netherlands 52.2 5.3
Belgium 50.6 4.6
Switzerland 46.8 8.2
Austria 47.6 14.1
Czech Republic 49.8 15.5
Poland 52.0 19.4
Hungary 47.2 19.5
Slovakia 48.7 19.7
Greece 39.1 22.9
Croatia 45.1 15.2
Slovenia 46.1 14.8
Serbia 44.0 20.9
Montenegro 42.7 19.4
Albania 41.2 20.0
North Macedonia 41.6 21.7
Bulgaria 42.7 25.5
Romania 45.9 25.0
Moldova 47.2 28.4
Ukraine 49.0 31.4
Belarus 53.7 27.9
Russia 57.0 40.0
Norway 61.0 9.0
Sweden 62.0 15.0
Finland 64.0 26.0
Denmark 56.0 9.5
Iceland 64.9 -18.6
Estonia 58.7 25.5
Latvia 56.9 24.6
Lithuania 55.3 23.9
Luxembourg 49.8 6.1
Malta 35.9 14.4
Cyprus 35.1 33.4
Greenland 71.7 -42.6
Egypt 26.8 30.8
Morocco 31.8 -7.1
Tunisia 34.0 9.0
Algeria 28.0 2.6
Libya 27.0 17.0
Sudan 15.6 30.0
Ethiopia 9.1 40.5
Kenya 0.5 38.0
Tanzania -6.4 34.9
Uganda 1.4 32.3
Rwanda -1.9 29.9
South Africa -29.0 24.7
Namibia -22.6 17.1
Botswana -22.3 24.7
Zimbabwe -19.0 29.2
Zambia -13.1 27.8
Mozambique -18.7 35.5
Madagascar -18.8 46.9
Mauritius -20.3 57.6
Seychelles -4.7 55.5
Nigeria 9.1 8.7
Ghana 7.9 -1.0
Senegal 14.5 -14.5
Ivory Coast 7.5 -5.5
Cameroon 7.4 12.4
DR Congo -2.9 23.7
Angola -11.2 17.9
Somalia 5.2 46.2
United States 39.8 -98.6
Canada 56.1 -106.3
Mexico 23.6 -102.5
Cuba 21.5 -77.8
Jamaica 18.1 -77.3
Bahamas 25.0 -77.4
Dominican Republic 18.7 -70.2
Costa Rica 9.7 -83.8
Panama 8.5 -80.8
Guatemala 15.8 -90.2
Belize 17.2 -88.5
Colombia 4.6 -74.3
Venezuela 6.4 -66.6
Ecuador -1.8 -78.2
Peru -9.2 -75.0
Bolivia -16.3 -63.6
Brazil -14.2 -51.9
Argentina -38.4 -63.6
Chile -35.7 -71.5
Uruguay -32.5 -55.8
Paraguay -23.4 -58.4
Australia -25.3 133.8
New Zealand -41.0 172.0
Fiji -17.7 178.1
Papua New Guinea -6.3 143.9
Vanuatu -15.4 166.9
Samoa -13.8 -172.1
French Polynesia -17.7 -149.4
Tonga -21.2 -175.2
`;

const ALIASES = {
  uae: "united arab emirates",
  emirates: "united arab emirates",
  usa: "united states",
  us: "united states",
  america: "united states",
  "united states of america": "united states",
  uk: "united kingdom",
  "great britain": "united kingdom",
  britain: "united kingdom",
  england: "united kingdom",
  scotland: "united kingdom",
  wales: "united kingdom",
  korea: "south korea",
  "republic of korea": "south korea",
  czechia: "czech republic",
  burma: "myanmar",
  turkiye: "turkey",
  holland: "netherlands",
  "the netherlands": "netherlands",
  "russian federation": "russia",
  "viet nam": "vietnam",
  "cote d ivoire": "ivory coast",
  drc: "dr congo",
  "democratic republic of the congo": "dr congo",
  "east timor": "timor leste",
  "the maldives": "maldives",
  "the bahamas": "bahamas",
  "the philippines": "philippines",
};

const BY_NAME = new Map();
for (const line of TABLE.trim().split("\n")) {
  const m = line.match(/^(.*?)\s+(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)$/);
  if (m) BY_NAME.set(fold(m[1]), { lat: Number(m[2]), lon: Number(m[3]) });
}

/** @returns {Coords | null} */
export function lookupCoords(name) {
  const key = fold(name);
  return BY_NAME.get(ALIASES[key] ?? key) ?? null;
}

/* ------------------------------ field pickers ------------------------------ */

const NAME_KEYS = ["name", "countryName", "country", "title", "label"];
const SLUG_KEYS = ["slug", "code", "countryCode", "iso", "iso2"];
const IMAGE_KEYS = [
  "image", "images", "thumbnail", "banner", "cover", "coverImage", "heroImage",
  "photo", "photos", "picture", "img", "flag",
];
const BLURB_KEYS = ["tagline", "shortDescription", "subtitle", "description", "about", "overview", "excerpt"];
const COUNT_KEYS = [
  ["packageCount", "packages"], ["totalPackages", "packages"], ["packagesCount", "packages"],
  ["packages", "packages"], ["tourCount", "tours"], ["totalTours", "tours"], ["tours", "tours"],
  ["destinationCount", "destinations"], ["destinations", "destinations"],
];

const str = (v) => (typeof v === "string" && v.trim() ? v.trim() : null);
const num = (v) => {
  const n = typeof v === "string" ? parseFloat(v) : v;
  return typeof n === "number" && Number.isFinite(n) ? n : null;
};

const pickString = (o, keys) => {
  for (const k of keys) {
    const v = str(o?.[k]);
    if (v) return v;
  }
  return null;
};

function toUrl(v) {
  if (!v) return null;
  if (typeof v === "string") return v.trim() || null;
  if (Array.isArray(v)) return toUrl(v[0]);
  if (typeof v === "object") return toUrl(v.url ?? v.secure_url ?? v.src ?? v.path ?? v.location);
  return null;
}

function pickImage(o) {
  for (const k of IMAGE_KEYS) {
    const url = toUrl(o?.[k]);
    if (url) return url;
  }
  return null;
}

/** lat/lng fields, GeoJSON [lng, lat], or { lat, lng } objects. */
function pickCoords(o) {
  const lat = num(o?.lat ?? o?.latitude);
  const lon = num(o?.lng ?? o?.lon ?? o?.long ?? o?.longitude);
  if (lat !== null && lon !== null) return { lat, lon };

  const c = o?.location?.coordinates ?? o?.coordinates ?? o?.location;
  if (Array.isArray(c) && c.length >= 2) {
    const [a, b] = [num(c[0]), num(c[1])];
    if (a !== null && b !== null && Math.abs(a) <= 180 && Math.abs(b) <= 90) return { lat: b, lon: a };
  } else if (c && typeof c === "object") {
    const la = num(c.lat ?? c.latitude);
    const lo = num(c.lng ?? c.lon ?? c.longitude);
    if (la !== null && lo !== null) return { lat: la, lon: lo };
  }
  return null;
}

function pickBlurb(o) {
  const raw = pickString(o, BLURB_KEYS);
  if (!raw) return "";
  const text = raw.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= 130) return text;
  return `${text.slice(0, 130).replace(/\s+\S*$/, "")}…`;
}

function pickCount(o) {
  for (const [key, label] of COUNT_KEYS) {
    const v = o?.[key];
    const n = Array.isArray(v) ? v.length : num(v);
    if (n !== null && n > 0) return { n, label: n === 1 ? label.replace(/s$/, "") : label };
  }
  return null;
}

/** @returns {AtlasCountry} */
export function normalizeCountry(raw, i = 0) {
  const name = pickString(raw, NAME_KEYS) ?? "Destination";
  const slug = pickString(raw, SLUG_KEYS) ?? String(raw?._id ?? raw?.id ?? i);
  return {
    id: String(raw?._id ?? raw?.id ?? slug ?? i),
    name,
    slug,
    image: pickImage(raw),
    coords: pickCoords(raw) ?? lookupCoords(name),
    blurb: pickBlurb(raw),
    count: pickCount(raw),
    raw,
  };
}

/* -------------------------------- formatting -------------------------------- */

const abs2 = (n) => Math.abs(n).toFixed(1);

export const fmtCoord = ({ lat, lon }) =>
  `${abs2(lat)}°${lat >= 0 ? "N" : "S"}  ${abs2(lon)}°${lon >= 0 ? "E" : "W"}`;

/** Stable 0-360 hue from a string, for image-less placeholders. */
export function hueOf(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
}