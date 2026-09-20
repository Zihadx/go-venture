"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";

import signUpImage from "@/assets/Sign-up/sign-up.png";

import { WORLD_PATH } from "@/libs/worldPath.js";
import { buildDotField, dotsInRing, dotsToPath } from "@/libs/joinUsDots.js";
import {
  WORLD_W,
  arcGeometry,
  frameRoute,
  haversineKm,
  ll,
  sparkline,
} from "@/libs/joinUsGeo.js";

import "./JoinUs.css";

/* -------------------------------------------------------------------------- */
/*  "The Departure" — a dot-matrix world, a camera that flies to each route,  */
/*  and a boarding-pass dock. Tailwind for everything; JoinUs.css only has    */
/*  keyframes, fonts and the grain texture.                                   */
/* -------------------------------------------------------------------------- */

const ROTATE_MS = 7000; // how long each route stays on screen
const FLIGHT_DELAY = 800; // plane waits for the camera to settle
const FLIGHT_MS = 3600;
const PLANE_PX = 22;

/* one easing curve + duration for camera, pins and stroke widths so they stay in lock-step */
const EASE = "duration-[1600ms] ease-[cubic-bezier(0.65,0,0.15,1)] motion-reduce:transition-none";
const T_CAM = `transition-[transform,stroke-width] ${EASE}`;
const T_STROKE = `transition-[stroke-width] ${EASE}`;
const T_PIN = `transition-transform ${EASE}`;

const withXY = (r) => ({ ...r, ...ll(r.lon, r.lat) });

const ORIGIN = withXY({
  code: "DAC",
  city: "Dhaka",
  lon: 90.41,
  lat: 23.81,
});

/* Demo data — swap `fare`, `seats`, `prices` for your fares API. `prices[0]` is this week. */
const ROUTES = [
  {
    code: "DPS",
    city: "Bali",
    country: "Indonesia",
    line: "Rice terraces at first light, reef by noon.",
    depart: "06:25",
    duration: "7h 40m",
    fare: 412,
    seats: 9,
    tz: "Asia/Makassar",
    lon: 115.19,
    lat: -8.65,
    prices: [412, 420, 431, 440, 428, 405, 386, 371, 379, 395, 418, 436],
  },
  {
    code: "HND",
    city: "Tokyo",
    country: "Japan",
    line: "Neon alleys, quiet shrines, the best food on earth.",
    depart: "23:50",
    duration: "6h 15m",
    fare: 538,
    seats: 4,
    tz: "Asia/Tokyo",
    lon: 139.69,
    lat: 35.69,
    prices: [538, 529, 517, 494, 476, 481, 502, 528, 551, 566, 549, 540],
  },
  {
    code: "KEF",
    city: "Reykjavík",
    country: "Iceland",
    line: "Chase the aurora across a country of steam and rock.",
    depart: "09:10",
    duration: "11h 05m",
    fare: 604,
    seats: 6,
    tz: "Atlantic/Reykjavik",
    lon: -21.94,
    lat: 64.15,
    prices: [604, 618, 631, 622, 597, 573, 548, 559, 586, 612, 640, 655],
  },
  {
    code: "CDG",
    city: "Paris",
    country: "France",
    line: "A slow week of markets, museums and long lunches.",
    depart: "14:45",
    duration: "9h 30m",
    fare: 489,
    seats: 12,
    tz: "Europe/Paris",
    lon: 2.35,
    lat: 48.86,
    prices: [489, 482, 470, 455, 441, 428, 436, 458, 480, 505, 522, 531],
  },
].map((r) => {
  const route = withXY(r);
  const spark = sparkline(r.prices);
  return {
    ...route,
    arc: arcGeometry(ORIGIN, route),
    km: Math.round(haversineKm(ORIGIN, route)),
    spark,
    bestLabel:
      spark.bestIdx === 0
        ? "Cheapest right now"
        : `Cheapest in ${spark.bestIdx} wk${spark.bestIdx > 1 ? "s" : ""}, −${spark.savingPct}%`,
  };
});

/* dots near the origin / destination light up in three soft rings */
const LIT_RINGS = [
  [0, 7],
  [7, 13],
  [13, 20],
];
const LIT_OPACITY = [0.95, 0.6, 0.32];
const LIT_WIDTH = [0.95, 0.85, 0.75];

const MERIDIANS = Array.from({ length: 13 }, (_, i) => i * 30);
const PARALLELS = [30, 60, 90, 120];

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** "09:42" in the destination's timezone; null until mounted so SSR and client agree. */
function useLocalTime(timeZone) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}

/* -------------------------------------------------------------------------- */

const PLANE_D =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

const PlaneIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d={PLANE_D} fill="currentColor" transform="rotate(90 12 12)" />
  </svg>
);

const Port = ({ code, city, right }) => (
  <div className={right ? "text-right" : undefined}>
    <b className="jr-display block text-[2.4rem] font-bold leading-none tracking-[-0.04em]">
      {code}
    </b>
    <span className="mt-1.5 block text-xs text-white/45">{city}</span>
  </div>
);

/** A map pin, positioned in screen space so it stays crisp and clickable at any zoom. */
function Pin({ point, cam, geo, kind, onSelect, holdProps }) {
  const x = cam.tx + cam.k * point.x;
  const y = cam.ty + cam.k * point.y;
  const style = { transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)` };

  // idle pins only show while they sit inside the map window — otherwise they'd collide with the headline or dock
  const visible =
    kind !== "idle" ||
    (x > geo.w * 0.04 &&
      x < geo.w * 0.96 &&
      y > geo.safe.top - 6 &&
      y < geo.h - geo.safe.bottom + 20);

  if (kind === "origin") {
    return (
      <div className={`absolute left-0 top-0 ${T_PIN}`} style={style}>
        <span className="absolute -left-3 -top-3 flex h-6 w-6 items-center justify-center">
          <span className="absolute h-6 w-6 animate-ping rounded-full bg-[#38b9d4]/40" />
          <span className="relative h-2.5 w-2.5 rounded-full bg-[#7fe3f5] shadow-[0_0_0_3px_rgba(127,227,245,0.25),0_0_18px_4px_rgba(56,185,212,0.6)]" />
        </span>
        <span className="absolute left-0 top-4 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#38b9d4]/30 bg-[#04131a]/70 px-2.5 py-1 text-xs text-[#9be9f7] backdrop-blur-md">
          {point.city}
        </span>
      </div>
    );
  }

  const active = kind === "active";

  return (
    <div className={`absolute left-0 top-0 ${T_PIN}`} style={style}>
      <button
        type="button"
        tabIndex={visible ? 0 : -1}
        onClick={onSelect}
        aria-label={`Show route to ${point.city}`}
        aria-pressed={active}
        {...holdProps}
        className={`group absolute -left-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full outline-none transition-opacity duration-700 focus-visible:ring-2 focus-visible:ring-[#38b9d4] ${
          visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {active ? (
          <>
            <span className="absolute h-6 w-6 animate-ping rounded-full bg-[#ffb020]/50" />
            <span className="relative h-3 w-3 rounded-full bg-[#ffb020] shadow-[0_0_0_4px_rgba(255,176,32,0.22),0_0_24px_6px_rgba(255,176,32,0.55)]" />
          </>
        ) : (
          <span className="h-2 w-2 rounded-full bg-white/45 ring-4 ring-white/5 transition duration-300 group-hover:scale-125 group-hover:bg-white" />
        )}

        <span
          className={
            active
              ? "absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#ffb020]/30 bg-[#04131a]/70 px-2.5 py-1 text-xs text-[#ffd48a] backdrop-blur-md"
              : "absolute left-1/2 top-full mt-0.5 -translate-x-1/2 whitespace-nowrap text-[11px] text-white/45 transition-colors group-hover:text-white"
          }
        >
          {point.city}
        </span>
      </button>
    </div>
  );
}

function PriceRadar({ route }) {
  const { line, area, best } = route.spark;

  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="text-white/45">Price, next 12 weeks</span>
        <span className="text-[#7fe3f5]">{route.bestLabel}</span>
      </div>

      <div className="mt-2 flex items-end gap-4">
        <div className="shrink-0">
          <span className="block text-xs text-white/45">from</span>
          <span className="jr-display text-[2.3rem] font-semibold leading-none tracking-[-0.03em]">
            ${route.fare}
          </span>
        </div>

        <div
          key={route.code}
          className="relative h-14 min-w-0 flex-1 animate-[jr-wipe_1100ms_cubic-bezier(0.22,1,0.36,1)_both]"
        >
          <svg
            viewBox="0 0 160 56"
            preserveAspectRatio="none"
            className="h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="jr-spark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffb020" stopOpacity="0.32" />
                <stop offset="1" stopColor="#ffb020" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#jr-spark)" />
            <path
              d={line}
              fill="none"
              stroke="#ffb020"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffb020] ring-4 ring-[#ffb020]/25"
            style={{ left: `${best.x}%`, top: `${best.y}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const JoinUsPage = () => {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(true);
  const [geo, setGeo] = useState(null); // stage size + the "safe window" the camera frames the route in
  const [dots, setDots] = useState(null);
  const [entered, setEntered] = useState(false); // false = world overview, true = flown to the route

  const sectionRef = useRef(null);
  const windowRef = useRef(null);
  const arcRef = useRef(null);
  const haloRef = useRef(null);
  const planeRef = useRef(null);
  const kRef = useRef(1);

  const route = ROUTES[index];
  const clock = useLocalTime(route.tz);
  const paused = held || !inView;

  const next = useCallback(() => setIndex((i) => (i + 1) % ROUTES.length), []);

  const holdProps = {
    onPointerEnter: (e) => e.pointerType === "mouse" && setHeld(true),
    onPointerLeave: (e) => e.pointerType === "mouse" && setHeld(false),
    onFocusCapture: (e) => e.target.matches?.(":focus-visible") && setHeld(true),
    onBlurCapture: () => setHeld(false),
  };

  /* ---- measure the stage and the empty "window" between headline and dock ---- */
  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    const win = windowRef.current;
    if (!section || !win) return undefined;

    const measure = () => {
      const s = section.getBoundingClientRect();
      const r = win.getBoundingClientRect();
      const w = Math.round(s.width);
      const h = Math.round(s.height);
      const side = Math.max(Math.round(w * 0.07), 56); // pin labels need ~56px of air on phones
      const safe = {
        left: side,
        right: side,
        top: Math.round(r.top - s.top) + 34,
        bottom: Math.round(s.bottom - r.bottom) + 34, // room for the pin labels
      };
      setGeo((p) =>
        p &&
        p.w === w &&
        p.h === h &&
        p.safe.top === safe.top &&
        p.safe.bottom === safe.bottom &&
        p.safe.left === safe.left
          ? p
          : { w, h, safe }
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    ro.observe(win);
    return () => ro.disconnect();
  }, []);

  /* ---- build the dot matrix once, on the client ---- */
  useEffect(() => {
    setDots(buildDotField());
  }, []);

  /* ---- fly from the world overview to the first route shortly after mount ---- */
  const hasGeo = geo !== null;
  useEffect(() => {
    if (!hasGeo || entered) return undefined;
    const id = setTimeout(() => setEntered(true), 450);
    return () => clearTimeout(id);
  }, [hasGeo, entered]);

  /* ---- pause the carousel while the section is off-screen ---- */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ---- camera ---- */
  const kMin = geo ? geo.w / WORLD_W : 1;
  const kMax = Math.max(kMin * 1.35, Math.min(Math.max(kMin * 1.75, 5), 8));

  const target = useMemo(
    () => (geo ? frameRoute([ORIGIN, route, ...route.arc.samples], geo, { kMin, kMax }) : null),
    [geo, route, kMin, kMax]
  );

  const overview = geo
    ? {
        k: kMin,
        tx: 0,
        ty: geo.safe.top + (geo.h - geo.safe.top - geo.safe.bottom) / 2 - 76 * kMin,
      }
    : null;

  const cam = geo ? (entered ? target : overview) : null;

  useIsoLayoutEffect(() => {
    if (cam) kRef.current = cam.k;
  }, [cam]);

  /* ---- lit-up dots + the base matrix ---- */
  const dotsPath = useMemo(() => (dots ? dotsToPath(dots) : ""), [dots]);

  const litOrigin = useMemo(
    () =>
      dots
        ? LIT_RINGS.map(([a, b]) => dotsToPath(dotsInRing(dots, ORIGIN.x, ORIGIN.y, a, b)))
        : [],
    [dots]
  );

  const litDest = useMemo(
    () =>
      dots
        ? LIT_RINGS.map(([a, b]) => dotsToPath(dotsInRing(dots, route.x, route.y, a, b)))
        : [],
    [dots, route]
  );

  /* ---- the flight: one rAF loop drives the arc trail and the plane, so they can't drift ---- */
  const ready = geo !== null && entered;

  useIsoLayoutEffect(() => {
    if (!ready) return undefined;
    const arc = arcRef.current;
    const halo = haloRef.current;
    const plane = planeRef.current;
    if (!arc || !halo || !plane) return undefined;

    const len = arc.getTotalLength();
    const paint = (f) => {
      const offset = String(len * (1 - f));
      arc.style.strokeDashoffset = offset;
      halo.style.strokeDashoffset = offset;
    };
    arc.style.strokeDasharray = String(len);
    halo.style.strokeDasharray = String(len);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(1);
      return undefined;
    }

    paint(0);
    let raf;
    let t0;

    const tick = (now) => {
      if (t0 === undefined) t0 = now;
      const t = Math.min(Math.max((now - t0 - FLIGHT_DELAY) / FLIGHT_MS, 0), 1);
      const f = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic
      paint(f);

      const at = len * f;
      const p = arc.getPointAtLength(at);
      const a = arc.getPointAtLength(Math.max(at - 0.4, 0));
      const b = arc.getPointAtLength(Math.min(at + 0.4, len));
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;

      plane.setAttribute(
        "transform",
        `translate(${p.x} ${p.y}) rotate(${angle}) scale(${PLANE_PX / 24 / kRef.current})`
      );
      plane.style.opacity = t <= 0 || t >= 1 ? 0 : Math.min(1, t * 12, (1 - t) * 12);

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, route.code]);

  const px = (n) => (cam ? n / cam.k : n); // constant on-screen stroke widths, whatever the zoom
  const pad = (n) => String(n).padStart(2, "0");

  /* ------------------------------------------------------------------------ */

  return (
    <section
      ref={sectionRef}
      aria-label="Join Go-Venture"
      className="jr relative isolate flex min-h-[56rem] flex-col overflow-hidden bg-[#04131a] py-12 text-white lg:min-h-[60rem] lg:py-16"
    >
      {/* ------------------------------ stage ------------------------------ */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(60rem_40rem_at_78%_-10%,rgba(32,149,174,0.22),transparent_60%),radial-gradient(50rem_36rem_at_-8%_105%,rgba(255,176,32,0.1),transparent_60%)]" />

        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
          {geo && cam && (
            <svg className="absolute inset-0 h-full w-full" width={geo.w} height={geo.h}>
              <defs>
                <linearGradient
                  id="jr-arc"
                  gradientUnits="userSpaceOnUse"
                  x1={ORIGIN.x}
                  y1={ORIGIN.y}
                  x2={route.x}
                  y2={route.y}
                >
                  <stop offset="0" stopColor="#38b9d4" />
                  <stop offset="1" stopColor="#ffb020" />
                </linearGradient>
              </defs>

              <g
                className={T_CAM}
                style={{
                  transform: `translate(${cam.tx}px, ${cam.ty}px) scale(${cam.k})`,
                  transformOrigin: "0 0",
                }}
              >
                {/* graticule */}
                <g fill="none" stroke="rgba(160,220,235,0.07)">
                  {MERIDIANS.map((x) => (
                    <line
                      key={`m${x}`}
                      x1={x}
                      y1={0}
                      x2={x}
                      y2={150}
                      className={T_STROKE}
                      style={{ strokeWidth: px(1) }}
                    />
                  ))}
                  {PARALLELS.map((y) => (
                    <line
                      key={`p${y}`}
                      x1={0}
                      y1={y}
                      x2={WORLD_W}
                      y2={y}
                      className={T_STROKE}
                      style={{ strokeWidth: px(1) }}
                    />
                  ))}
                </g>

                {/* land body + hairline coast */}
                <path
                  d={WORLD_PATH}
                  fillRule="evenodd"
                  fill="rgba(120,200,220,0.035)"
                  stroke="rgba(170,225,240,0.12)"
                  strokeLinejoin="round"
                  className={T_STROKE}
                  style={{ strokeWidth: px(0.9) }}
                />

                {/* the dot matrix */}
                {dotsPath && (
                  <path
                    d={dotsPath}
                    fill="none"
                    stroke="rgba(150,205,220,0.36)"
                    strokeWidth={0.7}
                    strokeLinecap="round"
                    className="animate-[jr-fade_1600ms_ease-out_both]"
                  />
                )}

                {/* halos: dots around Dhaka (teal) and the destination (amber) light up */}
                {litOrigin.map((d, i) => (
                  <path
                    key={`o${i}`}
                    d={d}
                    fill="none"
                    stroke="#7fe3f5"
                    strokeOpacity={LIT_OPACITY[i]}
                    strokeWidth={LIT_WIDTH[i]}
                    strokeLinecap="round"
                    className="animate-[jr-fade_1200ms_ease-out_both]"
                    style={{ animationDelay: `${500 + i * 180}ms` }}
                  />
                ))}
                {litDest.map((d, i) => (
                  <path
                    key={`${route.code}-${i}`}
                    d={d}
                    fill="none"
                    stroke="#ffc25a"
                    strokeOpacity={LIT_OPACITY[i]}
                    strokeWidth={LIT_WIDTH[i]}
                    strokeLinecap="round"
                    className="animate-[jr-fade_1000ms_ease-out_both]"
                    style={{ animationDelay: `${1100 + i * 220}ms` }}
                  />
                ))}

                {/* the other routes, faint */}
                {ROUTES.map(
                  (r, i) =>
                    i !== index && (
                      <path
                        key={r.code}
                        d={r.arc.d}
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeDasharray="1 2.4"
                        strokeLinecap="round"
                        className={T_STROKE}
                        style={{ strokeWidth: px(1.3) }}
                      />
                    )
                )}

                {/* the live route: halo + line + plane */}
                <g key={route.code}>
                  <path
                    ref={haloRef}
                    d={route.arc.d}
                    fill="none"
                    stroke="url(#jr-arc)"
                    strokeLinecap="round"
                    opacity={0.22}
                    className={T_STROKE}
                    style={{ strokeWidth: px(9), strokeDasharray: 4000, strokeDashoffset: 4000 }}
                  />
                  <path
                    ref={arcRef}
                    d={route.arc.d}
                    fill="none"
                    stroke="url(#jr-arc)"
                    strokeLinecap="round"
                    className={T_STROKE}
                    style={{ strokeWidth: px(2.2), strokeDasharray: 4000, strokeDashoffset: 4000 }}
                  />
                  <g ref={planeRef} style={{ opacity: 0 }}>
                    <path
                      d={PLANE_D}
                      fill="#fff"
                      transform="rotate(90) translate(-12 -12)"
                      style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.9))" }}
                    />
                  </g>
                </g>
              </g>
            </svg>
          )}
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_42%,#04131a_100%)]" />
        <div className="jr-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />
      </div>

      {/* ----------------------------- content ----------------------------- */}
      <div className="custom-container relative z-10 flex w-full flex-1 flex-col">
        {/* headline */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3 text-sm text-white/60">
              <span className="relative h-7 w-7 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15">
                <Image src={signUpImage} alt="" fill sizes="28px" className="object-contain p-1" />
              </span>
              <span className="font-medium text-white/85">Go-Venture</span>
            </div>

            <p className="text-lg text-white/55">Your next stop is</p>

            <h2
              key={route.code}
              aria-label={route.city}
              className="jr-display mt-1 flex flex-wrap gap-[0.04em] text-[clamp(3.4rem,9.5vw,7.75rem)] font-bold uppercase leading-[0.85] tracking-[-0.045em]"
            >
              {[...route.city].map((ch, i) => (
                <span key={`${route.code}-${i}`} aria-hidden="true" className="inline-block [perspective:420px]">
                  <span
                    style={{ "--i": i }}
                    className="inline-block origin-bottom animate-[jr-flip_560ms_cubic-bezier(0.3,1.2,0.4,1)_backwards] bg-[linear-gradient(175deg,#fff_30%,rgba(255,255,255,0.55))] bg-clip-text text-transparent [animation-delay:calc(var(--i)*55ms)]"
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                </span>
              ))}
            </h2>

            <p className="mt-5 flex items-center gap-4 text-sm">
              <b className="font-semibold text-[#ffb020]">{route.country}</b>
              <span className="h-px w-16 bg-[linear-gradient(90deg,rgba(255,255,255,0.3),transparent)]" />
              <span className="text-white/45">
                {index + 1} of {ROUTES.length} routes
              </span>
            </p>
          </div>

          <p className="max-w-[40ch] text-[0.95rem] leading-relaxed text-white/55 lg:pb-2">
            Go-Venture reads the route, the season and the price history, then builds the trip
            around how you actually travel.
          </p>
        </div>

        {/* empty window: the camera frames the live route inside this space */}
        <div ref={windowRef} className="min-h-[16rem] flex-1 lg:min-h-[15rem]" aria-hidden="true" />

        {/* dock */}
        <div className="flex flex-col gap-4" {...holdProps}>
          <div
            role="group"
            aria-label="Choose a route"
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {ROUTES.map((r, i) => {
              const on = i === index;
              return (
                <button
                  key={r.code}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setIndex(i)}
                  className={`relative flex shrink-0 items-baseline gap-2 overflow-hidden rounded-full border px-4 py-2.5 text-[13px] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38b9d4] ${
                    on
                      ? "border-white bg-white text-[#06191e]"
                      : "border-white/10 bg-white/[0.04] text-white/60 backdrop-blur-md hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
                  }`}
                >
                  <span
                    className={`jr-display text-xs font-bold tracking-[0.08em] ${
                      on ? "text-[#1a8aa3]" : "text-white/40"
                    }`}
                  >
                    {r.code}
                  </span>
                  <span>{r.city}</span>

                  {on && (
                    <span
                      key={r.code}
                      onAnimationEnd={next}
                      className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-[#2095ae]"
                      style={{
                        animation: `jr-fill ${ROTATE_MS}ms linear forwards`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl lg:grid-cols-[minmax(0,1fr)_17.5rem]">
            {/* main ticket */}
            <div className="grid gap-7 p-6 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.85fr_1.15fr] lg:items-center lg:gap-8 lg:p-7">
              <div className="min-w-0">
                <div className="flex items-end gap-3">
                  <Port code={ORIGIN.code} city={ORIGIN.city} />

                  <div className="relative mb-8 h-4 min-w-8 flex-1">
                    <span className="absolute inset-x-0 top-1/2 border-t border-dashed border-white/25" />
                    <span
                      key={route.code}
                      className="absolute top-1/2 h-4 w-4 -translate-y-1/2 animate-[jr-taxi_3600ms_cubic-bezier(0.5,0,0.2,1)_800ms_both] text-[#ffb020]"
                    >
                      <PlaneIcon className="h-4 w-4" />
                    </span>
                    <span className="absolute inset-x-0 top-full mt-2.5 text-center text-[11px] text-white/40">
                      {route.km.toLocaleString("en-US")} km
                    </span>
                  </div>

                  <Port code={route.code} city={route.city} right />
                </div>

                <p className="mt-4 max-w-[30ch] text-[13px] leading-snug text-white/55">{route.line}</p>
              </div>

              <dl className="text-[13px]">
                {[
                  ["Departs", route.depart],
                  ["In the air", route.duration],
                  ["Local time", clock ?? "--:--"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b border-white/10 py-1.5 first:pt-0"
                  >
                    <dt className="text-white/45">{label}</dt>
                    <dd className="jr-display font-semibold">{value}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-1.5">
                  <dt className="text-white/45">Seats left</dt>
                  <dd className="jr-display flex items-center gap-2 font-semibold">
                    <span className="h-1 w-10 overflow-hidden rounded-full bg-white/10">
                      <span
                        className={`block h-full rounded-full ${
                          route.seats <= 6 ? "bg-[#ffb020]" : "bg-[#38b9d4]"
                        }`}
                        style={{ width: `${Math.min(route.seats / 24, 1) * 100}%` }}
                      />
                    </span>
                    {route.seats}
                  </dd>
                </div>
              </dl>

              <div className="sm:col-span-2 lg:col-span-1">
                <PriceRadar route={route} />
              </div>
            </div>

            {/* stub */}
            <div className="relative flex flex-col justify-between gap-5 border-t border-dashed border-[#06191e]/25 bg-[#ece7df] p-6 text-[#06191e] lg:border-l lg:border-t-0">
              <p className="jr-display text-[1.3rem] font-semibold leading-tight tracking-[-0.02em]">
                Save {route.city} and we&apos;ll tell you the week it gets cheap.
              </p>

              <div>
                <Link
                  href="/register"
                  className="group flex items-center justify-between whitespace-nowrap rounded-full bg-[#06191e] py-2 pl-5 pr-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#2095ae] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2095ae]"
                >
                  Create your account
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowForwardRounded sx={{ fontSize: 16 }} />
                  </span>
                </Link>

                <Link
                  href="/login"
                  className="mt-3 block text-center text-xs text-[#06191e]/55 transition-colors hover:text-[#06191e]"
                >
                  Already travelling with us? <u className="underline-offset-2">Sign in</u>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------- pins ------------------------------ */}
      <div
        className={`pointer-events-none absolute inset-0 z-20 overflow-hidden transition-opacity duration-1000 ${
          geo && cam ? "opacity-100" : "opacity-0"
        }`}
        {...holdProps}
      >
        {geo && cam && (
          <>
            <Pin point={ORIGIN} cam={cam} kind="origin" />
            {ROUTES.map((r, i) => (
              <Pin
                key={r.code}
                point={r}
                cam={cam}
                geo={geo}
                kind={i === index ? "active" : "idle"}
                onSelect={() => setIndex(i)}
                holdProps={holdProps}
              />
            ))}
          </>
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        Next stop: {route.city}, {route.country}. {route.km.toLocaleString("en-US")} kilometres from Dhaka,
        fares from ${route.fare}.
      </p>
    </section>
  );
};

export default JoinUsPage;