"use client";

import { useEffect, useRef } from "react";

import { buildGlobeDots } from "@/libs/atlasGlobeData.js";

/* A dot-matrix globe on a plain <canvas>.
   - land dots are spread evenly over the sphere and shaded by depth
   - the selected country is flown to and its surrounding dots light up amber
   - drag to spin (with inertia), click a pin to select it, hover a pin for its name
   - the loop only runs while the globe is on screen, and respects prefers-reduced-motion */

const TAU = Math.PI * 2;
const RAD = Math.PI / 180;
const BUCKETS = 5;

/* three halo rings around the selected country: angular radius (rad), opacity, dot size */
const LIT = [
  { cos: Math.cos(0.075), alpha: 0.95, size: 1.8 },
  { cos: Math.cos(0.15), alpha: 0.62, size: 1.55 },
  { cos: Math.cos(0.25), alpha: 0.34, size: 1.3 },
];

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
const wrap = (a) => ((((a + Math.PI) % TAU) + TAU) % TAU) - Math.PI; // shortest way round

/** Where the globe sits inside the canvas: large and bleeding off the bottom on wide screens. */
function layout(w, h) {
  const wide = w >= 640 && w / h > 1.05;
  return wide
    ? { R: Math.min(h * 0.58, w * 0.4), cx: w * 0.6, cy: h * 0.58 }
    : { R: Math.min(w * 0.46, h * 0.44), cx: w / 2, cy: h * 0.58 };
}

function pill(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * @param {{
 *   pins: { id: string, name: string, lat: number, lon: number }[],
 *   selectedId: string | null,
 *   onSelect: (id: string) => void,
 *   onInteract?: () => void,
 *   className?: string,
 * }} props
 */
export default function AtlasGlobe({ pins, selectedId, onSelect, onInteract, className = "" }) {
  const canvasRef = useRef(null);

  // everything the render loop needs lives in one mutable object: no React re-renders per frame
  const s = useRef({
    lam: 0, phi: 0.3, tLam: 0, tPhi: 0.3, vLam: 0, vPhi: 0,
    follow: true, init: false, drag: null, hover: null, hits: [],
    w: 0, h: 0, dpr: 1, visible: true,
  }).current;

  const live = useRef({ pins, selectedId, onSelect, onInteract });
  useEffect(() => {
    live.current = { pins, selectedId, onSelect, onInteract };
  });

  /* fly to whichever country is selected */
  useEffect(() => {
    const p = live.current.pins.find((x) => x.id === selectedId);
    if (!p) return;
    s.tLam = p.lon * RAD;
    s.tPhi = clamp(p.lat * RAD * 0.75, -1, 1);
    s.follow = true;
    s.vLam = 0;
    s.vPhi = 0;
    if (!s.init) {
      // first paint: start turned away so the intro is a proper fly-in
      s.init = true;
      s.lam = s.tLam - 1.5;
      s.phi = s.tPhi * 0.3;
    }
  }, [selectedId, s]);

  /* canvas, data, loop */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const data = buildGlobeDots();
    const font = getComputedStyle(canvas).fontFamily;

    const base = Array.from({ length: BUCKETS }, () => new Float32Array(data.count * 2));
    const baseN = new Int32Array(BUCKETS);
    const lit = LIT.map(() => new Float32Array(data.count * 2));
    const litN = new Int32Array(LIT.length);
    const out = [0, 0, 0];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      s.dpr = Math.min(window.devicePixelRatio || 1, 2);
      s.w = r.width;
      s.h = r.height;
      canvas.width = Math.round(r.width * s.dpr);
      canvas.height = Math.round(r.height * s.dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => {
      s.visible = e.isIntersecting;
    });
    io.observe(canvas);

    /* orthographic projection of (lon, sinLat, cosLat) around the current centre */
    const project = (lam, sinP, cosP, sp0, cp0, cx, cy, R) => {
      const dl = lam - s.lam;
      const cd = Math.cos(dl);
      out[0] = cx + R * cosP * Math.sin(dl);
      out[1] = cy - R * (cp0 * sinP - sp0 * cosP * cd);
      out[2] = sp0 * sinP + cp0 * cosP * cd; // > 0 means facing us
    };

    const step = (dt) => {
      if (s.drag) return;
      if (s.follow) {
        const k = reduce ? 1 : 1 - Math.exp(-dt * 4.2);
        s.lam += wrap(s.tLam - s.lam) * k;
        s.phi += (s.tPhi - s.phi) * k;
      } else if (!reduce) {
        s.lam += s.vLam * dt;
        s.phi = clamp(s.phi + s.vPhi * dt, -1.25, 1.25);
        const decay = Math.exp(-dt * 2.6);
        s.vLam *= decay;
        s.vPhi *= decay;
      }
    };

    const draw = (t) => {
      const { w, h, dpr } = s;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const { R, cx, cy } = layout(w, h);
      const sp0 = Math.sin(s.phi);
      const cp0 = Math.cos(s.phi);
      const { pins: list, selectedId: selId } = live.current;
      const sel = list.find((p) => p.id === selId) ?? null;

      /* atmosphere + body */
      const glow = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.22);
      glow.addColorStop(0, "rgba(56,185,212,0.24)");
      glow.addColorStop(1, "rgba(56,185,212,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.22, 0, TAU);
      ctx.fill();

      const body = ctx.createRadialGradient(cx - R * 0.32, cy - R * 0.38, R * 0.08, cx, cy, R);
      body.addColorStop(0, "rgba(32,149,174,0.30)");
      body.addColorStop(0.55, "rgba(9,44,56,0.55)");
      body.addColorStop(1, "rgba(4,19,26,0.92)");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, TAU);
      ctx.fill();

      ctx.strokeStyle = "rgba(160,225,240,0.22)";
      ctx.lineWidth = 1;
      ctx.stroke();

      /* graticule */
      ctx.strokeStyle = "rgba(160,220,235,0.075)";
      ctx.beginPath();
      for (let lat = -60; lat <= 60; lat += 30) {
        const sinP = Math.sin(lat * RAD);
        const cosP = Math.cos(lat * RAD);
        let pen = false;
        for (let lon = -180; lon <= 180; lon += 6) {
          project(lon * RAD, sinP, cosP, sp0, cp0, cx, cy, R);
          if (out[2] > 0) {
            if (pen) ctx.lineTo(out[0], out[1]);
            else ctx.moveTo(out[0], out[1]);
            pen = true;
          } else pen = false;
        }
      }
      for (let lon = -180; lon < 180; lon += 30) {
        let pen = false;
        for (let lat = -90; lat <= 90; lat += 6) {
          project(lon * RAD, Math.sin(lat * RAD), Math.cos(lat * RAD), sp0, cp0, cx, cy, R);
          if (out[2] > 0) {
            if (pen) ctx.lineTo(out[0], out[1]);
            else ctx.moveTo(out[0], out[1]);
            pen = true;
          } else pen = false;
        }
      }
      ctx.stroke();

      /* land dots, bucketed by depth so each colour is a single fill */
      baseN.fill(0);
      litN.fill(0);
      const sLam = sel ? sel.lon * RAD : 0;
      const sSin = sel ? Math.sin(sel.lat * RAD) : 0;
      const sCos = sel ? Math.cos(sel.lat * RAD) : 0;

      for (let i = 0; i < data.count; i++) {
        const sinP = data.sinLat[i];
        const cosP = data.cosLat[i];
        const lam = data.lon[i];
        const dl = lam - s.lam;
        const cd = Math.cos(dl);
        const cosc = sp0 * sinP + cp0 * cosP * cd;
        if (cosc <= 0.03) continue;

        const x = cx + R * cosP * Math.sin(dl);
        const y = cy - R * (cp0 * sinP - sp0 * cosP * cd);
        if (x < -4 || x > w + 4 || y < -4 || y > h + 4) continue;

        let level = -1;
        if (sel) {
          const cs = sSin * sinP + sCos * cosP * Math.cos(lam - sLam);
          level = cs > LIT[0].cos ? 0 : cs > LIT[1].cos ? 1 : cs > LIT[2].cos ? 2 : -1;
        }

        if (level >= 0) {
          lit[level][litN[level]++] = x;
          lit[level][litN[level]++] = y;
        } else {
          const b = Math.min(BUCKETS - 1, (cosc * BUCKETS) | 0);
          base[b][baseN[b]++] = x;
          base[b][baseN[b]++] = y;
        }
      }

      const dr = clamp(R / 300, 0.8, 1.4);
      for (let b = 0; b < BUCKETS; b++) {
        const depth = (b + 0.5) / BUCKETS;
        const r = dr * (0.7 + 0.5 * depth);
        ctx.fillStyle = `rgba(150,205,220,${(0.1 + 0.55 * depth).toFixed(3)})`;
        ctx.beginPath();
        for (let j = 0; j < baseN[b]; j += 2) {
          ctx.moveTo(base[b][j] + r, base[b][j + 1]);
          ctx.arc(base[b][j], base[b][j + 1], r, 0, TAU);
        }
        ctx.fill();
      }
      for (let l = LIT.length - 1; l >= 0; l--) {
        const r = dr * LIT[l].size;
        ctx.fillStyle = `rgba(255,194,90,${LIT[l].alpha})`;
        ctx.beginPath();
        for (let j = 0; j < litN[l]; j += 2) {
          ctx.moveTo(lit[l][j] + r, lit[l][j + 1]);
          ctx.arc(lit[l][j], lit[l][j + 1], r, 0, TAU);
        }
        ctx.fill();
      }

      /* pins */
      s.hits.length = 0;
      ctx.font = `500 12.5px ${font}`;
      ctx.textBaseline = "middle";

      const label = (text, x, y, tone) => {
        const tw = ctx.measureText(text).width;
        const bw = tw + 22;
        const bx = x + 16 + bw > w - 8 ? x - 16 - bw : x + 16;
        pill(ctx, bx, y - 13, bw, 26, 13);
        ctx.fillStyle = "rgba(4,19,26,0.78)";
        ctx.fill();
        ctx.strokeStyle = tone === "amber" ? "rgba(255,176,32,0.45)" : "rgba(255,255,255,0.22)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = tone === "amber" ? "#ffd48a" : "rgba(255,255,255,0.92)";
        ctx.fillText(text, bx + 11, y + 0.5);
      };

      let selPos = null;
      for (const p of list) {
        project(p.lon * RAD, Math.sin(p.lat * RAD), Math.cos(p.lat * RAD), sp0, cp0, cx, cy, R);
        if (out[2] < 0.12) continue;
        const x = out[0];
        const y = out[1];
        s.hits.push({ id: p.id, x, y });

        if (p.id === selId) {
          selPos = { x, y, name: p.name };
          continue;
        }
        const hot = s.hover === p.id;
        ctx.beginPath();
        ctx.arc(x, y, hot ? 4.2 : 2.8, 0, TAU);
        ctx.fillStyle = "rgba(4,19,26,0.9)";
        ctx.fill();
        ctx.strokeStyle = hot ? "#fff" : "rgba(255,255,255,0.65)";
        ctx.lineWidth = 1.3;
        ctx.stroke();
        if (hot) label(p.name, x, y, "white");
      }

      if (selPos) {
        const ph = reduce ? 0.35 : (t * 0.8) % 1;
        ctx.beginPath();
        ctx.arc(selPos.x, selPos.y, 6 + ph * 18, 0, TAU);
        ctx.strokeStyle = `rgba(255,176,32,${(0.6 * (1 - ph)).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.save();
        ctx.shadowColor = "rgba(255,176,32,0.9)";
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(selPos.x, selPos.y, 4.6, 0, TAU);
        ctx.fillStyle = "#ffb020";
        ctx.fill();
        ctx.restore();

        label(selPos.name, selPos.x, selPos.y, "amber");
      }
    };

    let raf = 0;
    let last = performance.now();
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (!s.visible) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      step(dt);
      draw(now / 1000);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [s]);

  /* ------------------------------- pointer ------------------------------- */

  const nearestPin = (px, py) => {
    let best = null;
    let bestD = 16;
    for (const h of s.hits) {
      const d = Math.hypot(h.x - px, h.y - py);
      if (d < bestD) {
        best = h.id;
        bestD = d;
      }
    }
    return best;
  };

  const local = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    s.drag = { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, t: performance.now(), moved: false };
    s.follow = false;
    s.vLam = 0;
    s.vPhi = 0;
    e.currentTarget.style.cursor = "grabbing";
  };

  const onPointerMove = (e) => {
    const d = s.drag;
    if (!d) {
      const [px, py] = local(e);
      s.hover = nearestPin(px, py);
      e.currentTarget.style.cursor = s.hover ? "pointer" : "grab";
      return;
    }
    const now = performance.now();
    const dt = Math.max((now - d.t) / 1000, 0.001);
    const { R } = layout(s.w, s.h);
    const dLam = -(e.clientX - d.x) / R;
    const dPhi = (e.clientY - d.y) / R;

    s.lam += dLam;
    s.phi = clamp(s.phi + dPhi, -1.25, 1.25);
    s.vLam = s.vLam * 0.6 + (dLam / dt) * 0.4;
    s.vPhi = s.vPhi * 0.6 + (dPhi / dt) * 0.4;

    d.x = e.clientX;
    d.y = e.clientY;
    d.t = now;
    if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) > 4) {
      d.moved = true;
      live.current.onInteract?.();
    }
  };

  const release = (e, cancelled) => {
    const d = s.drag;
    s.drag = null;
    e.currentTarget.style.cursor = "grab";
    if (!d) return;

    if (!d.moved && !cancelled) {
      const [px, py] = local(e);
      const id = nearestPin(px, py);
      if (id) {
        live.current.onInteract?.();
        live.current.onSelect(id);
      }
    } else if (performance.now() - d.t > 90) {
      s.vLam = 0; // held still before letting go: no fling
      s.vPhi = 0;
    }
  };

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full cursor-grab touch-pan-y ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(e) => release(e, false)}
      onPointerCancel={(e) => release(e, true)}
      onPointerLeave={() => {
        s.hover = null;
      }}
    />
  );
}