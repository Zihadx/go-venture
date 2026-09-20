/* Turns the flat coastline path into a hex-packed dot matrix.
   Pure maths (no canvas / DOM), so it also runs on the server. ~5 ms for the whole world. */

import { WORLD_PATH } from "./worldPath.js";

const X_MAX = 360;
const Y_MIN = 6; // just above Greenland
const Y_MAX = 146; // just below Tierra del Fuego (Antarctica is intentionally left out)

/** worldPath.js only uses absolute M / L / Z, so parsing is a couple of splits. */
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

/**
 * Scan-line, even-odd fill. For every dot row we intersect the row with every coastline
 * edge, sort the crossings and treat each pair as a stretch of land — holes (lakes, seas)
 * fall out of the even-odd rule for free. Odd rows are shifted by half a step (hex packing).
 * Returns [[x, y], …] in world units.
 */
export function buildDotField({ dx = 1.6, dy = 1.4 } = {}) {
  const edges = [];
  for (const ring of parseRings(WORLD_PATH)) {
    for (let i = 0; i < ring.length; i++) {
      const [x1, y1] = ring[i];
      const [x2, y2] = ring[(i + 1) % ring.length];
      if (y1 !== y2) edges.push(x1, y1, x2, y2);
    }
  }

  const dots = [];

  for (let row = 0; ; row++) {
    const y = Number((Y_MIN + row * dy).toFixed(2));
    if (y > Y_MAX) break;

    const xs = [];
    for (let i = 0; i < edges.length; i += 4) {
      const y1 = edges[i + 1];
      const y2 = edges[i + 3];
      if (y1 <= y === y2 <= y) continue; // edge doesn't cross this row (half-open rule)
      const x1 = edges[i];
      xs.push(x1 + ((y - y1) * (edges[i + 2] - x1)) / (y2 - y1));
    }
    xs.sort((a, b) => a - b);

    const offset = row % 2 ? dx / 2 : 0;
    let p = 0;
    for (let col = 0; ; col++) {
      const x = Number((offset + col * dx).toFixed(2));
      if (x > X_MAX) break;
      while (p + 1 < xs.length && xs[p + 1] < x) p += 2;
      if (p + 1 < xs.length && x >= xs[p]) dots.push([Number(x.toFixed(1)), Number(y.toFixed(1))]);
    }
  }

  return dots;
}

/** One SVG path made of zero-length segments; with stroke-linecap="round" each becomes a dot. */
export const dotsToPath = (dots) => dots.map(([x, y]) => `M${x} ${y}h0`).join("");

/** Dots whose distance from (cx, cy) lies in [r0, r1) — used for the "lit up" halos. */
export const dotsInRing = (dots, cx, cy, r0, r1) =>
  dots.filter(([x, y]) => {
    const d = Math.hypot(x - cx, y - cy);
    return d >= r0 && d < r1;
  });