/* Land dots for the globe. Pure maths, client-side, ~40 ms once.
   1. Rasterise worldPath.js into a 0.5° land mask (scan-line, even-odd — same trick as the flat map).
   2. Spread points evenly over a sphere (Fibonacci lattice) and keep the ones that land on land.
   Even spacing on the sphere is what keeps the poles from getting crowded, unlike a lat/lon grid. */

import { WORLD_PATH } from "./worldPath.js";

const RES = 2; // mask cells per degree
const MW = 360 * RES;
const MH = 180 * RES;

const parseRings = (d) =>
  d
    .split("Z")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((seg) =>
      seg
        .replace(/^M/, "")
        .split("L")
        .map((pt) => pt.split(",").map(Number))
    );

function buildLandMask() {
  const edges = [];
  for (const ring of parseRings(WORLD_PATH)) {
    for (let i = 0; i < ring.length; i++) {
      const [x1, y1] = ring[i];
      const [x2, y2] = ring[(i + 1) % ring.length];
      if (y1 !== y2) edges.push(x1, y1, x2, y2);
    }
  }

  const mask = new Uint8Array(MW * MH);

  for (let row = 0; row < MH; row++) {
    const y = (row + 0.5) / RES; // world y = 90 - lat
    const xs = [];
    for (let i = 0; i < edges.length; i += 4) {
      const y1 = edges[i + 1];
      const y2 = edges[i + 3];
      if (y1 <= y === y2 <= y) continue;
      const x1 = edges[i];
      xs.push(x1 + ((y - y1) * (edges[i + 2] - x1)) / (y2 - y1));
    }
    xs.sort((a, b) => a - b);

    for (let p = 0; p + 1 < xs.length; p += 2) {
      const c0 = Math.max(Math.ceil(xs[p] * RES - 0.5), 0);
      const c1 = Math.min(Math.floor(xs[p + 1] * RES - 0.5), MW - 1);
      for (let c = c0; c <= c1; c++) mask[row * MW + c] = 1;
    }
  }

  return mask;
}

/**
 * @param {number} n  points spread over the whole sphere (about 30% end up as land)
 * @returns {{ count: number, lon: Float32Array, sinLat: Float32Array, cosLat: Float32Array }}
 */
export function buildGlobeDots(n = 36000) {
  const mask = buildLandMask();
  const golden = Math.PI * (3 - Math.sqrt(5));

  const lon = [];
  const sinLat = [];
  const cosLat = [];

  for (let i = 0; i < n; i++) {
    const s = 1 - (2 * (i + 0.5)) / n; // sin(lat), evenly spaced => equal-area bands
    const lat = Math.asin(s);
    const l = ((i * golden) % (Math.PI * 2)) - Math.PI;

    const cx = Math.min(Math.floor(((l * 180) / Math.PI + 180) * RES), MW - 1);
    const cy = Math.min(Math.max(Math.floor((90 - (lat * 180) / Math.PI) * RES), 0), MH - 1);
    if (!mask[cy * MW + cx]) continue;

    lon.push(l);
    sinLat.push(s);
    cosLat.push(Math.cos(lat));
  }

  return {
    count: lon.length,
    lon: Float32Array.from(lon),
    sinLat: Float32Array.from(sinLat),
    cosLat: Float32Array.from(cosLat),
  };
}