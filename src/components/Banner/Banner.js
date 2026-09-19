"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import FlightTakeoffRounded from "@mui/icons-material/FlightTakeoffRounded";

import "./Banner.css";

const AUTOPLAY_MS = 6500;

/* Where the CTA goes. Add a `link` field to your banner documents,
   or change this to match your destination route. */
const bannerHref = (banner) => banner?.link || "/destinations";

/* Only keyboard focus should pause autoplay; a tap or click focuses a button
   too, and that would leave the banner paused forever on touch screens. */
const isKeyboardFocus = (el) => {
  try {
    return el.matches(":focus-visible");
  } catch {
    return true;
  }
};

/* ------------------------------------------------------------------------
   Loading state: same silhouette as the real thing, so nothing jumps.
------------------------------------------------------------------------- */
function BannerSkeleton() {
  return (
    <section className="tb" aria-busy="true" aria-label="Loading featured destinations">
      <div className="tb-stage">
        <div className="tb-panel tb-skel" data-active="true" />
        {[0, 1, 2, 3].map((n) => (
          <div key={n} className="tb-panel tb-skel" data-active="false" />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------
   Banner
------------------------------------------------------------------------- */
const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef(null);
  const progressRef = useRef(null);
  const progress = useRef(0);
  const touchX = useRef(null);
  const railRef = useRef(null);

  const count = banners.length;
  const canAutoplay = count > 1 && !reduced;

  /* ---- data ---- */
  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/banners`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error(`Failed to fetch banners (${response.status})`);

        const json = await response.json();
        const list = Array.isArray(json?.data) ? json.data.filter((b) => b?.image) : [];
        setBanners(list);
        setStatus("ready");
      } catch (error) {
        if (error?.name === "AbortError") return;
        console.error("Failed to fetch banners:", error);
        setStatus("error");
      }
    })();

    return () => controller.abort();
  }, []);

  /* ---- environment: reduced motion + only run while visible ---- */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [status]);

  /* ---- navigation ---- */
  const goTo = useCallback((target) => {
    progress.current = 0;
    if (progressRef.current) progressRef.current.style.transform = "scaleX(0)";
    setActive(target);
  }, []);

  const next = useCallback(() => {
    if (count > 1) goTo((c) => (c + 1) % count);
  }, [count, goTo]);

  const prev = useCallback(() => {
    if (count > 1) goTo((c) => (c - 1 + count) % count);
  }, [count, goTo]);

  /* ---- mobile card rail: keep the active card centred ---- */
  useEffect(() => {
    const rail = railRef.current;
    const card = rail?.children[active];
    if (!rail || !card) return;
    const left = card.offsetLeft - (rail.clientWidth - card.clientWidth) / 2;
    rail.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
  }, [active, reduced]);

  /* ---- autoplay: driven by rAF so pause/resume is exact and the progress
          line never drifts from the timer ---- */
  useEffect(() => {
    if (!canAutoplay || paused || !inView) return;

    let raf;
    let last = performance.now();

    const tick = (now) => {
      progress.current += Math.min(now - last, 80) / AUTOPLAY_MS;
      last = now;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(progress.current, 1)})`;
      }
      if (progress.current >= 1) {
        next();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, canAutoplay, paused, inView, next]);

  /* ---- input ---- */
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  };

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 48) (dx < 0 ? next : prev)();
  };

  /* ---- render ---- */
  if (status === "loading") return <BannerSkeleton />;
  if (status === "error" || !count) return null;

  return (
    <section
      ref={rootRef}
      className="tb"
      style={{ "--tb-grow": count * 1.6 }}
      aria-roledescription="carousel"
      aria-label="Featured destinations"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
      onFocus={(e) => isKeyboardFocus(e.target) && setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      {/* Small cards: mobile only (hidden by CSS on larger screens) */}
      {count > 1 && (
        <div className="tb-rail" ref={railRef} aria-label="Choose a destination">
          {banners.map((banner, i) => {
            const label = banner?.locations?.city || banner?.title || "Destination";
            const place = [banner?.locations?.city, banner?.locations?.country]
              .filter(Boolean)
              .join(", ");

            return (
              <button
                key={banner?._id || i}
                type="button"
                className="tb-card"
                data-active={i === active}
                aria-current={i === active}
                aria-label={`Show ${place || label}`}
                onClick={() => goTo(i)}
              >
                <Image
                  src={banner.image}
                  alt=""
                  fill
                  sizes="96px"
                  className="tb-card-img"
                />
                <span className="tb-card-shade" />
                <span className="tb-card-label">{label}</span>
              </button>
            );
          })}
        </div>
      )}

      <div
        className="tb-stage"
        aria-live={paused ? "polite" : "off"}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {banners.map((banner, i) => {
          const isActive = i === active;
          const city = banner?.locations?.city;
          const country = banner?.locations?.country;
          const place = [city, country].filter(Boolean).join(", ");
          const label = city || banner?.title || "Destination";
          const words = String(banner?.title || "").split(/\s+/).filter(Boolean);

          return (
            <article
              key={banner?._id || i}
              className="tb-panel"
              data-active={isActive}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
            >
              {/* The photo is as wide as the whole stage and each panel is a
                  window onto it, so opening a panel reveals the picture
                  instead of stretching it. */}
              <div className="tb-media">
                <Image
                  src={banner.image}
                  alt={isActive ? banner?.title || label : ""}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="tb-img"
                />
              </div>
              <div className="tb-scrim" />
              <div className="tb-tint" />

              {/* Closed doorway: vertical name, click to open */}
              {!isActive && (
                <button
                  type="button"
                  className="tb-tab"
                  onClick={() => goTo(i)}
                  aria-label={`Show ${place || label}`}
                >
                  <span className="tb-tab-label">
                    <span className="tb-tab-city">{label}</span>
                    {city && country && <span className="tb-tab-country">{country}</span>}
                  </span>
                </button>
              )}

              {/* Open doorway */}
              <div className="tb-content">
                {count > 1 && (
                  <div className="tb-controls tb-fade">
                    <span className="tb-count">
                      {i + 1} / {count}
                    </span>
                    <button
                      type="button"
                      className="tb-arrow"
                      onClick={prev}
                      aria-label="Previous destination"
                    >
                      <ArrowBackRounded fontSize="inherit" />
                    </button>
                    <button
                      type="button"
                      className="tb-arrow"
                      onClick={next}
                      aria-label="Next destination"
                    >
                      <ArrowForwardRounded fontSize="inherit" />
                    </button>
                  </div>
                )}

                <div className="tb-body">
                  {(city || country) && (
                    <div className="tb-loc tb-fade">
                      <span className="tb-loc-pin" aria-hidden="true">
                        <LocationOnOutlined fontSize="inherit" />
                      </span>
                      {city && <span className="tb-loc-city">{city}</span>}
                      {city && country && (
                        <span className="tb-loc-sep" aria-hidden="true">
                          •
                        </span>
                      )}
                      {country && <span className="tb-loc-country">{country}</span>}
                    </div>
                  )}

                  {/* font-serif comes from your Tailwind theme */}
                  <h1 className="tb-title font-serif">
                    {words.map((word, n) => (
                      <Fragment key={n}>
                        {n > 0 && " "}
                        <span className="tb-word">
                          <span style={{ "--i": n }}>{word}</span>
                        </span>
                      </Fragment>
                    ))}
                  </h1>

                  {banner?.description && (
                    <p className="tb-desc tb-fade">{banner.description}</p>
                  )}

                  <div className="tb-cta-wrap tb-fade">
                    <Link href={bannerHref(banner)} className="tb-cta">
                      <span>Explore destination</span>
                      <span className="sr-only"> {label}</span>
                      <span className="tb-cta-icon" aria-hidden="true">
                        <FlightTakeoffRounded fontSize="inherit" />
                      </span>
                    </Link>
                  </div>
                </div>

                {canAutoplay && (
                  <div className="tb-progress" aria-hidden="true">
                    <span
                      ref={isActive ? progressRef : undefined}
                      className="tb-progress-bar"
                    />
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Banner;