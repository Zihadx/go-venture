"use client";

import { useEffect, useMemo, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";

import AddRounded from "@mui/icons-material/AddRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";
import RemoveRounded from "@mui/icons-material/RemoveRounded";

/* Each service gets a small, working "product moment" instead of an icon and a paragraph:
   1. Personalized itineraries — pick interests and pace, the day rebuilds itself
   2. Family-friendly trips     — add travellers, the stay / seats / pace plan adapts
   3. 24/7 support              — a live thread at 02:14 that gets sorted before breakfast
   4. Trusted experiences       — an itemised quote where every line is vetted
   All figures and places are illustrative sample content. */

const EASE = [0.22, 1, 0.36, 1];

const CARD =
  "rounded-[1.5rem] border border-[#111827]/[0.07] bg-white shadow-[0_1px_0_rgba(17,24,39,0.03),0_24px_60px_-28px_rgba(17,24,39,0.22)]";

const useMotion = () => {
  const reduce = useReducedMotion();
  return { reduce, t: (d = 0.35, delay = 0) => (reduce ? { duration: 0 } : { duration: d, delay, ease: EASE }) };
};

const Person = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8z" />
  </svg>
);

/* ------------------------------------------------------------------------- */
/*  1. Personalized itineraries                                               */
/* ------------------------------------------------------------------------- */

const INTERESTS = [
  { id: "food", label: "Food" },
  { id: "culture", label: "Culture" },
  { id: "nature", label: "Nature" },
  { id: "nightlife", label: "Nightlife" },
];

const PACES = [
  { id: "slow", label: "Slow", stops: 3 },
  { id: "balanced", label: "Balanced", stops: 5 },
  { id: "full", label: "Full", stops: 7 },
];

const ACTIVITIES = [
  { id: "sensoji", time: "06:30", title: "Senso-ji at sunrise", tags: ["culture"] },
  { id: "tsukiji", time: "07:45", title: "Breakfast crawl at Tsukiji", tags: ["food"] },
  { id: "takao", time: "09:15", title: "Easy trail up Mt. Takao", tags: ["nature"] },
  { id: "nezu", time: "11:00", title: "Nezu Museum and its garden", tags: ["culture", "nature"] },
  { id: "tea", time: "14:00", title: "Tea ceremony in Asakusa", tags: ["culture"] },
  { id: "gyoen", time: "15:30", title: "Picnic in Shinjuku Gyoen", tags: ["nature", "food"] },
  { id: "shimo", time: "16:45", title: "Vintage streets of Shimokitazawa", tags: ["culture", "nightlife"] },
  { id: "ramen", time: "19:00", title: "Ramen alley in Shinjuku", tags: ["food"] },
  { id: "gai", time: "21:00", title: "Golden Gai bar hop", tags: ["nightlife", "food"] },
];

export function ItineraryDemo() {
  const { t, reduce } = useMotion();
  const [picked, setPicked] = useState(["food", "culture"]);
  const [pace, setPace] = useState("balanced");

  /* best matches first (most shared interests), trimmed to the pace, then back into clock order */
  const stops = useMemo(() => {
    const limit = PACES.find((p) => p.id === pace).stops;
    return ACTIVITIES.map((a) => ({ ...a, score: a.tags.filter((x) => picked.includes(x)).length }))
      .filter((a) => a.score > 0)
      .sort((a, b) => b.score - a.score || a.time.localeCompare(b.time))
      .slice(0, limit)
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [picked, pace]);

  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[13.5rem_minmax(0,1fr)]">
      <div className="flex flex-col gap-6 rounded-[1.5rem] border border-[#111827]/[0.07] bg-white/70 p-5 backdrop-blur-sm">
        <div>
          <p className="text-sm font-medium text-[#111827]">What do you love?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {INTERESTS.map((i) => {
              const on = picked.includes(i.id);
              return (
                <button
                  key={i.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(i.id)}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2095AE] ${
                    on
                      ? "border-[#2095AE] bg-[#2095AE] text-white"
                      : "border-[#111827]/10 bg-white text-[#111827]/65 hover:border-[#111827]/25"
                  }`}
                >
                  {on && <CheckRounded sx={{ fontSize: 14 }} />}
                  {i.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-[#111827]">Your pace</p>
          <div role="group" aria-label="Pace" className="relative mt-3 flex rounded-full bg-[#111827]/[0.06] p-1">
            <span
              aria-hidden="true"
              className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-white shadow-[0_2px_8px_rgba(17,24,39,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(${PACES.findIndex((p) => p.id === pace) * 100}%)` }}
            />
            {PACES.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={pace === p.id}
                onClick={() => setPace(p.id)}
                className="relative flex-1 rounded-full py-1.5 text-[12.5px] outline-none focus-visible:ring-2 focus-visible:ring-[#2095AE]"
              >
                <span className={pace === p.id ? "font-medium text-[#111827]" : "text-[#111827]/55"}>{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`${CARD} p-5 sm:p-6 lg:min-h-[26rem]`}>
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-lg font-medium tracking-[-0.03em] text-[#111827]">A day in Tokyo</p>
          <p className="text-sm tabular-nums text-[#111827]/45">
            {stops.length} {stops.length === 1 ? "stop" : "stops"}
          </p>
        </div>

        <ol className="relative mt-5">
          <span aria-hidden="true" className="absolute bottom-3 left-[65px] top-3 w-px bg-[#111827]/10" />
          {stops.map((a) => (
              <motion.li
                key={a.id}
                initial={reduce ? false : { opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={t(0.4)}
                className="relative flex items-center gap-4 py-2.5"
              >
                <span className="w-11 shrink-0 text-right text-[13px] tabular-nums text-[#111827]/45">{a.time}</span>
                <span className="relative z-10 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-white bg-[#2095AE] shadow-[0_0_0_1px_rgba(32,149,174,0.35)]" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] text-[#111827]">{a.title}</span>
                  <span className="mt-1 flex gap-1.5">
                    {a.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-2 py-0.5 text-[11px] capitalize ${
                          picked.includes(tag) ? "bg-[#2095AE]/10 text-[#1a7f95]" : "bg-[#111827]/[0.05] text-[#111827]/40"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>
              </motion.li>
          ))}
        </ol>

        {stops.length === 0 && (
          <p className="mt-10 text-center text-sm text-[#111827]/50">
            Pick at least one interest and we&apos;ll build the day around it.
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/*  2. Family-friendly trips                                                  */
/* ------------------------------------------------------------------------- */

function Stepper({ label, hint, value, min, max, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-[15px] font-medium text-[#111827]">{label}</p>
        <p className="text-xs text-[#111827]/45">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Fewer ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className="grid h-9 w-9 place-items-center rounded-full border border-[#111827]/10 text-[#111827] transition-colors hover:border-[#2095AE] hover:text-[#2095AE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2095AE] disabled:pointer-events-none disabled:opacity-30"
        >
          <RemoveRounded sx={{ fontSize: 18 }} />
        </button>
        <span className="w-5 text-center text-lg font-medium tabular-nums text-[#111827]" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          aria-label={`More ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          className="grid h-9 w-9 place-items-center rounded-full border border-[#111827]/10 text-[#111827] transition-colors hover:border-[#2095AE] hover:text-[#2095AE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2095AE] disabled:pointer-events-none disabled:opacity-30"
        >
          <AddRounded sx={{ fontSize: 18 }} />
        </button>
      </div>
    </div>
  );
}

export function FamilyDemo() {
  const { t, reduce } = useMotion();
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(2);

  const total = adults + kids;
  const rooms = kids > 0 ? Math.ceil(total / 4) : Math.ceil(adults / 2);
  const roomName = kids > 0 ? "family room" : adults === 1 ? "single room" : "double room";

  const plan = [
    ["Stay", `${rooms} ${roomName}${rooms > 1 ? "s" : ""}`],
    ["Flights", `${total} ${total === 1 ? "seat" : "seats"}, booked together`],
    ["Days", kids > 0 ? "Two main stops, with rest built in" : "Paced the way you like"],
    ["Meals", kids > 0 ? "Kid-friendly picks, flexible times" : "Your table, your time"],
  ];

  const people = [
    ...Array.from({ length: adults }, (_, i) => ({ id: `a${i}`, kid: false })),
    ...Array.from({ length: kids }, (_, i) => ({ id: `k${i}`, kid: true })),
  ];

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className={`${CARD} p-5 sm:p-6`}>
        <p className="text-lg font-medium tracking-[-0.03em] text-[#111827]">Who&apos;s coming?</p>
        <div className="mt-1 divide-y divide-[#111827]/[0.07]">
          <Stepper label="Adults" hint="18 and over" value={adults} min={1} max={6} onChange={setAdults} />
          <Stepper label="Children" hint="Under 18" value={kids} min={0} max={5} onChange={setKids} />
        </div>

        <div className="mt-2 flex min-h-[3.5rem] flex-wrap items-end gap-2 rounded-2xl bg-[#2095AE]/[0.05] p-3">
          {people.map((p) => (
              <motion.span
                key={p.id}
                initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={t(0.3)}
                className={`grid place-items-center rounded-full ${
                  p.kid ? "h-8 w-8 bg-[#ffb020] text-white" : "h-11 w-11 bg-[#2095AE] text-white"
                }`}
              >
                <Person className={p.kid ? "h-4 w-4" : "h-6 w-6"} />
              </motion.span>
          ))}
        </div>
      </div>

      <div className={`${CARD} p-5 sm:p-6`}>
        <p className="text-lg font-medium tracking-[-0.03em] text-[#111827]">Your plan</p>
        <dl className="mt-2 divide-y divide-[#111827]/[0.07]">
          {plan.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-6 py-4">
              <dt className="text-sm text-[#111827]/45">{label}</dt>
              <dd className="text-right text-[15px] text-[#111827]">
                <motion.span
                  key={value}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={t(0.25)}
                  className="block"
                >
                  {value}
                </motion.span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/*  3. 24/7 travel support                                                    */
/* ------------------------------------------------------------------------- */

const SCRIPT = [
  { who: "you", at: "02:14", text: "Our flight is delayed by three hours." },
  { who: "team", at: "02:15", text: "Got it. I've moved your airport pickup to 05:40 and told the hotel you'll arrive late." },
  { who: "you", at: "02:16", text: "That's a relief, thank you." },
  { who: "team", at: "02:16", text: "Safe travels. Message us any time, we're here." },
];

/* [delay in ms, state patch] */
const BEATS = [
  [500, { shown: 1 }],
  [1400, { typing: true }],
  [2900, { shown: 2, typing: false }],
  [4300, { shown: 3 }],
  [4900, { typing: true }],
  [6100, { shown: 4, typing: false }],
];

function DayRing() {
  const [hour, setHour] = useState(null);
  useEffect(() => setHour(new Date().getHours()), []);

  return (
    <svg viewBox="0 0 48 48" className="h-11 w-11 shrink-0" aria-hidden="true">
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
        const now = i === hour;
        const r1 = now ? 15 : 17;
        return (
          <line
            key={i}
            x1={24 + Math.cos(a) * r1}
            y1={24 + Math.sin(a) * r1}
            x2={24 + Math.cos(a) * 21}
            y2={24 + Math.sin(a) * 21}
            stroke={now ? "#ffb020" : "#2095AE"}
            strokeWidth={now ? 2.4 : 1.6}
            strokeLinecap="round"
          />
        );
      })}
      <text x="24" y="27.5" textAnchor="middle" fontSize="9" fontWeight="600" fill="#111827">
        24/7
      </text>
    </svg>
  );
}

export function SupportDemo() {
  const { reduce } = useMotion();
  const [state, setState] = useState({ shown: 0, typing: false });
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce) {
      setState({ shown: SCRIPT.length, typing: false });
      return undefined;
    }
    setState({ shown: 0, typing: false });
    const ids = BEATS.map(([ms, patch]) => setTimeout(() => setState((s) => ({ ...s, ...patch })), ms));
    return () => ids.forEach(clearTimeout);
  }, [run, reduce]);

  const done = state.shown === SCRIPT.length;

  return (
    <div className={`${CARD} mx-auto max-w-md overflow-hidden`}>
      <div className="flex items-center gap-3 border-b border-[#111827]/[0.07] px-5 py-4">
        <DayRing />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-medium text-[#111827]">Go-Venture support</p>
          <p className="flex items-center gap-1.5 text-xs text-[#111827]/50">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Online, day and night
          </p>
        </div>
        {done && !reduce && (
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="rounded-full border border-[#111827]/10 px-3 py-1.5 text-xs text-[#111827]/60 transition-colors hover:border-[#2095AE] hover:text-[#2095AE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2095AE]"
          >
            Replay
          </button>
        )}
      </div>

      <div className="flex min-h-[19rem] flex-col justify-end gap-3 bg-[#F7F8F5]/70 px-5 py-5" aria-live="polite">
        {SCRIPT.slice(0, state.shown).map((m, i) => (
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: EASE }}
            className={`flex flex-col ${m.who === "you" ? "items-end" : "items-start"}`}
          >
            <p
              className={`max-w-[85%] rounded-[1.25rem] px-4 py-2.5 text-[14px] leading-snug ${
                m.who === "you"
                  ? "rounded-br-md bg-[#2095AE] text-white"
                  : "rounded-bl-md bg-white text-[#111827] shadow-[0_1px_0_rgba(17,24,39,0.05),0_8px_20px_-12px_rgba(17,24,39,0.25)]"
              }`}
            >
              {m.text}
            </p>
            <span className="mt-1 px-1 text-[11px] tabular-nums text-[#111827]/35">{m.at}</span>
          </motion.div>
        ))}

        {state.typing && (
          <div className="flex w-fit items-center gap-1 rounded-[1.25rem] rounded-bl-md bg-white px-4 py-3 shadow-[0_1px_0_rgba(17,24,39,0.05)]">
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                animate={reduce ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
                className="h-1.5 w-1.5 rounded-full bg-[#111827]/35"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/*  4. Trusted experiences                                                    */
/* ------------------------------------------------------------------------- */

const QUOTE = [
  { label: "Flights, Dhaka to Tokyo", note: "Airline confirmed", price: 538 },
  { label: "Four nights in Shinjuku", note: "Partner hotel, visited by our team", price: 612 },
  { label: "Small-group food tour", note: "Local guide, reviewed", price: 84 },
  { label: "Airport transfers", note: "Licensed operator", price: 46 },
];

export function TrustDemo() {
  const { t, reduce } = useMotion();
  const total = QUOTE.reduce((n, q) => n + q.price, 0);

  return (
    <div className={`${CARD} mx-auto max-w-md p-5 sm:p-6`}>
      <div className="flex items-baseline justify-between">
        <p className="text-lg font-medium tracking-[-0.03em] text-[#111827]">Your quote</p>
        <p className="text-xs text-[#111827]/40">Sample, for illustration</p>
      </div>

      <ul className="mt-3 divide-y divide-[#111827]/[0.07]">
        {QUOTE.map((q, i) => (
          <motion.li
            key={q.label}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.45, 0.12 + i * 0.16)}
            className="flex items-center gap-3.5 py-3.5"
          >
            <motion.span
              initial={reduce ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 22, delay: 0.3 + i * 0.16 }}
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#2095AE] text-white"
            >
              <CheckRounded sx={{ fontSize: 15 }} />
            </motion.span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[15px] text-[#111827]">{q.label}</span>
              <span className="block truncate text-xs text-[#111827]/45">{q.note}</span>
            </span>
            <span className="text-[15px] tabular-nums text-[#111827]">${q.price}</span>
          </motion.li>
        ))}
      </ul>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={t(0.5, 0.95)}
        className="mt-1 flex items-baseline justify-between border-t border-dashed border-[#111827]/20 pt-4"
      >
        <span className="text-sm text-[#111827]/55">Total, every line itemised</span>
        <span className="text-2xl font-medium tracking-[-0.03em] tabular-nums text-[#111827]">${total.toLocaleString("en-US")}</span>
      </motion.div>
    </div>
  );
}