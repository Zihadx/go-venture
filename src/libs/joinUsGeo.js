/* Pure helpers for the Join Us route map. No React, no DOM — safe on the server. */

export const WORLD_W = 360;

/** Equirectangular projection, identical to worldPath.js (x = lon + 180, y = 90 - lat). */
export const ll = (lon, lat) => ({ x: lon + 180, y: 90 - lat });

const rad = (d) => (d * Math.PI) / 180;
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

/** Great-circle distance in km between two { lon, lat } points. */
export function haversineKm(a, b) {
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

/**
 * A quadratic arc between two map points, lifted toward the pole so it reads as a
 * great-circle on a flat map. Also returns sample points, used to frame the camera
 * around the *whole* arc and not just its end points.
 */
export function arcGeometry(a, b) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const cx = mx;
  const cy = my - len * 0.36;

  const samples = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const u = 1 - t;
    samples.push({
      x: u * u * a.x + 2 * u * t * cx + t * t * b.x,
      y: u * u * a.y + 2 * u * t * cy + t * t * b.y,
    });
  }

  return { d: `M${a.x} ${a.y}Q${cx} ${cy} ${b.x} ${b.y}`, samples };
}

/**
 * Camera: how to move/scale the world so `points` sit centred inside the `safe` rect.
 * Returns { k, tx, ty } for `translate(tx, ty) scale(k)` (world units -> px).
 * `k` is clamped so the map never gets smaller than the stage, and the pan is clamped
 * so the world's left/right edge never slides into view.
 */
export function frameRoute(points, { w, h, safe }, { kMin, kMax }) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }

  const sw = Math.max(w - safe.left - safe.right, 1);
  const sh = Math.max(h - safe.top - safe.bottom, 1);
  const k = clamp(
    Math.min(sw / Math.max(maxX - minX, 1), sh / Math.max(maxY - minY, 1)),
    kMin,
    kMax
  );

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  const tx = clamp(safe.left + sw / 2 - cx * k, Math.min(w - WORLD_W * k, 0), 0);
  const ty = safe.top + sh / 2 - cy * k;

  return { k, tx, ty };
}

/** Smooth (Catmull-Rom -> cubic Bézier) price line + area, sized for a w x h viewBox. */
export function sparkline(values, w = 160, h = 56, pad = 8) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;

  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * w,
    pad + (1 - (v - min) / span) * (h - pad * 2),
  ]);

  const f = (n) => n.toFixed(1);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    d +=
      `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ` +
      `${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ` +
      `${f(p2[0])} ${f(p2[1])}`;
  }

  const bestIdx = values.indexOf(min);
  return {
    line: d,
    area: `${d}L${w} ${h}L0 ${h}Z`,
    bestIdx,
    best: { x: (pts[bestIdx][0] / w) * 100, y: (pts[bestIdx][1] / h) * 100 },
    savingPct: Math.round((1 - min / values[0]) * 100),
  };
}