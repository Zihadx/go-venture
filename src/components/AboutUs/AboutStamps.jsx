"use client";

import { motion } from "framer-motion";

/* The "passport" language of the About section:
   - Stamp: one of the eight "why travelers choose us" points, drawn as an ink stamp
            (text on a circle, a small line glyph in the middle, rough hand-pressed edges)
   - Seal:  the big "10+ years / since 2015" mark that sits on the photo collage
   Pure SVG + Tailwind. Framer only does the one-time "stamp lands" entrance. */

const GLYPHS = {
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M8.6 13.2L7 21l5-3 5 3-1.6-7.8" />
    </>
  ),
  seal: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.4l2.7 2.7L16 9.6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3.2 3.2 3.2 14.8 0 18M12 3c-3.2 3.2-3.2 14.8 0 18" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11.2A7 7 0 005 9.8C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  heart: <path d="M12 20s-7-4.3-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.7-7 10-7 10z" />,
  shield: (
    <>
      <path d="M12 3l7 3v5.5c0 4.4-3 7.6-7 9.5-4-1.9-7-5.1-7-9.5V6z" />
      <path d="M8.8 12l2.3 2.3 4.2-4.4" />
    </>
  ),
  bell: (
    <>
      <path d="M3.5 18h17" />
      <path d="M5.5 18a6.5 6.5 0 0113 0" />
      <path d="M12 8.5V6.5M10 6.5h4" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12.5V4h8.5L21 13.5 13.5 21z" />
      <circle cx="7.5" cy="8.5" r="1.2" />
    </>
  ),
};

/** Mount once. Gives every stamp the slightly uneven edge of real ink. */
export function InkFilter() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <filter id="gv-ink" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.3" />
        </filter>
      </defs>
    </svg>
  );
}

/**
 * @param {{ id: string, label: string, glyph: keyof typeof GLYPHS, rotate: number, index: number }} props
 */
export function Stamp({ id, label, glyph, rotate, index }) {
  const size = label.length > 16 ? 7.3 : label.length > 12 ? 8.3 : 9.4;

  return (
    <motion.li
      initial={{ opacity: 0, scale: 1.55, rotate: rotate * 3 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group list-none"
    >
      <span className="sr-only">{label}</span>

      <span className="mx-auto block aspect-square w-full max-w-[9.5rem] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-[1.06]">
        <svg
          viewBox="0 0 120 120"
          aria-hidden="true"
          className="h-full w-full text-[#1a7f95] opacity-90 mix-blend-multiply"
          style={{ filter: "url(#gv-ink)" }}
        >
          <defs>
            <path id={`${id}-top`} d="M 16 60 A 44 44 0 0 1 104 60" />
            <path id={`${id}-bottom`} d="M 14 60 A 46 46 0 0 0 106 60" />
          </defs>

          <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="60" cy="60" r="53.5" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 2.5" />

          <text fontSize={size} fontWeight="700" letterSpacing="1.4" fill="currentColor">
            <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
              {label.toUpperCase()}
            </textPath>
          </text>
          <text fontSize="6.6" fontWeight="600" letterSpacing="2.2" fill="currentColor">
            <textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle">
              GO-VENTURE
            </textPath>
          </text>

          <g
            transform="translate(45 45) scale(1.25)"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {GLYPHS[glyph]}
          </g>
        </svg>
      </span>
    </motion.li>
  );
}

/** The big cream seal: static "10+" centre, slowly turning text ring. */
export function Seal({ className = "" }) {
  const r = 88;
  const circ = Math.round(2 * Math.PI * r);

  return (
    <div
      role="img"
      aria-label="Since 2015. Ten plus years of discovery."
      className={`relative aspect-square rounded-full bg-[#F5F2EB] shadow-[0_24px_60px_-18px_rgba(17,24,39,0.35),0_0_0_1px_rgba(17,24,39,0.06)] ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-[spin_45s_linear_infinite] text-[#1a7f95] motion-reduce:animate-none"
      >
        <defs>
          <path id="gv-seal-ring" d={`M 100 100 m -${r} 0 a ${r} ${r} 0 1 1 ${r * 2} 0 a ${r} ${r} 0 1 1 -${r * 2} 0`} />
        </defs>
        <text fontSize="10.5" fontWeight="700" letterSpacing="2" fill="currentColor">
          <textPath href="#gv-seal-ring" textLength={circ - 4} lengthAdjust="spacing">
            GO-VENTURE · TRAVEL DIFFERENTLY · SINCE 2015 ·
          </textPath>
        </text>
      </svg>

      <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute inset-0 h-full w-full text-[#1a7f95]">
        <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="66" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 3" />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-[#111827]">
        <span className="text-[clamp(2rem,3.4vw,3.1rem)] font-semibold leading-none tracking-[-0.06em]">10+</span>
        <span className="mt-1.5 text-center text-[clamp(0.55rem,0.8vw,0.7rem)] leading-tight tracking-[0.08em] text-[#111827]/55">
          years of
          <br />
          discovery
        </span>
      </div>
    </div>
  );
}