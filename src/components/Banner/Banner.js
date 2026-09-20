"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import FlightTakeoffRounded from "@mui/icons-material/FlightTakeoffRounded";

import "./Banner.css";

const AUTOPLAY_MS = 6500;
const SWIPE_PX = 48;
const MAX_FRAME_MS = 80;
const FALLBACK_LABEL = "Destination";

/* ---------------------------------- utils --------------------------------- */

const isKeyboardFocus = (el) => {
  try {
    return el.matches(":focus-visible");
  } catch {
    return true;
  }
};

/** Normalise one API banner into everything the UI needs, once. */
const toSlide = (banner, i) => {
  const city = banner?.locations?.city || "";
  const country = banner?.locations?.country || "";
  const title = banner?.title || "";

  return {
    id: banner?._id || i,
    image: banner.image,
    title,
    description: banner?.description || "",
    href: banner?.link || "/destinations",
    city,
    country,
    label: city || title || FALLBACK_LABEL,
    place: [city, country].filter(Boolean).join(", "),
    words: title.split(/\s+/).filter(Boolean),
  };
};

/* -------------------------------- skeleton -------------------------------- */

function BannerSkeleton() {
  return (
    <section className="tb" aria-busy="true" aria-label="Loading featured destinations">
      <div className="tb-stage">
        {[0, 1, 2, 3, 4].map((n) => (
          <div key={n} className="tb-panel tb-skel" data-active={n === 0} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- banner --------------------------------- */

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [status, setStatus] = useState("loading");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef(null);
  const railRef = useRef(null);
  const progressRef = useRef(null);
  const progress = useRef(0);
  const touchX = useRef(null);

  const slides = useMemo(() => banners.map(toSlide), [banners]);
  const count = slides.length;
  const isCarousel = count > 1;
  const canAutoplay = isCarousel && !reduced;

  /* fetch ------------------------------------------------------------------ */

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/banners`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error(`Failed to fetch banners (${res.status})`);

        const json = await res.json();

        setBanners(
          Array.isArray(json?.data) ? json.data.filter((b) => b?.image) : []
        );
        setStatus("ready");
      } catch (error) {
        if (error?.name === "AbortError") return;
        console.error("Failed to fetch banners:", error);
        setStatus("error");
      }
    })();

    return () => controller.abort();
  }, []);

  /* reduced motion --------------------------------------------------------- */

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReduced(e.matches);

    setReduced(mq.matches);
    mq.addEventListener("change", onChange);

    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* pause when off-screen -------------------------------------------------- */

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );

    io.observe(el);

    return () => io.disconnect();
  }, [status]);

  /* navigation ------------------------------------------------------------- */

  const goTo = useCallback((target) => {
    progress.current = 0;

    if (progressRef.current) {
      progressRef.current.style.transform = "scaleX(0)";
    }

    setActive(target);
  }, []);

  const step = useCallback(
    (delta) => {
      if (count > 1) goTo((c) => (c + delta + count) % count);
    },
    [count, goTo]
  );

  const next = useCallback(() => step(1), [step]);
  const prev = useCallback(() => step(-1), [step]);

  /* keep the thumbnail rail centred on the active card --------------------- */

  useEffect(() => {
    const rail = railRef.current;
    const card = rail?.children[active];
    if (!rail || !card) return;

    rail.scrollTo({
      left: card.offsetLeft - (rail.clientWidth - card.clientWidth) / 2,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active, reduced]);

  /* autoplay --------------------------------------------------------------- */

  useEffect(() => {
    if (!canAutoplay || paused || !inView) return;

    let raf;
    let last = performance.now();

    const tick = (now) => {
      progress.current += Math.min(now - last, MAX_FRAME_MS) / AUTOPLAY_MS;
      last = now;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(
          progress.current,
          1
        )})`;
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

  /* input handlers --------------------------------------------------------- */

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  };

  const onPointerEnter = (e) => e.pointerType === "mouse" && setPaused(true);
  const onPointerLeave = (e) => e.pointerType === "mouse" && setPaused(false);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchX.current == null) return;

    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;

    if (Math.abs(dx) > SWIPE_PX) (dx < 0 ? next : prev)();
  };

  /* render ----------------------------------------------------------------- */

  if (status === "loading") return <BannerSkeleton />;
  if (status === "error" || !count) return null;

  return (
    <section
      ref={rootRef}
      className="tb relative isolate overflow-hidden !bg-transparent"
      style={{ "--tb-grow": count * 1.6 }}
      aria-roledescription="carousel"
      aria-label="Featured destinations"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={(e) => isKeyboardFocus(e.target) && setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      <video
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/videos/travel-bg.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/35" />

      {isCarousel && (
        <div className="tb-rail" ref={railRef} aria-label="Choose a destination">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              className="tb-card"
              data-active={i === active}
              aria-current={i === active}
              aria-label={`Show ${slide.place || slide.label}`}
              onClick={() => goTo(i)}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                sizes="96px"
                className="tb-card-img"
              />

              <span className="tb-card-shade" />
              <span className="tb-card-label">{slide.label}</span>
            </button>
          ))}
        </div>
      )}

      <div
        className="tb-stage"
        aria-live={paused ? "polite" : "off"}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, i) => {
          const isActive = i === active;

          return (
            <article
              key={slide.id}
              className="tb-panel"
              data-active={isActive}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
            >
              <div className="tb-media">
                <Image
                  src={slide.image}
                  alt={isActive ? slide.title || slide.label : ""}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="tb-img"
                />
              </div>

              <div className="tb-scrim" />
              <div className="tb-tint" />

              {!isActive && (
                <button
                  type="button"
                  className="tb-tab"
                  onClick={() => goTo(i)}
                  aria-label={`Show ${slide.place || slide.label}`}
                >
                  <span className="tb-tab-label">
                    <span className="tb-tab-city">{slide.label}</span>

                    {slide.city && slide.country && (
                      <span className="tb-tab-country">{slide.country}</span>
                    )}
                  </span>
                </button>
              )}

              <div className="tb-content">
                {isCarousel && (
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
                  {(slide.city || slide.country) && (
                    <div className="tb-loc tb-fade">
                      <span className="tb-loc-pin" aria-hidden="true">
                        <LocationOnOutlined fontSize="inherit" />
                      </span>

                      {slide.city && (
                        <span className="tb-loc-city">{slide.city}</span>
                      )}

                      {slide.city && slide.country && (
                        <span className="tb-loc-sep" aria-hidden="true">
                          •
                        </span>
                      )}

                      {slide.country && (
                        <span className="tb-loc-country">{slide.country}</span>
                      )}
                    </div>
                  )}

                  <h1 className="tb-title font-serif">
                    {slide.words.map((word, n) => (
                      <Fragment key={n}>
                        {n > 0 && " "}
                        <span className="tb-word">
                          <span style={{ "--i": n }}>{word}</span>
                        </span>
                      </Fragment>
                    ))}
                  </h1>

                  {slide.description && (
                    <p className="tb-desc tb-fade">{slide.description}</p>
                  )}

                  <div className="tb-cta-wrap tb-fade">
                    <Link href={slide.href} className="tb-cta">
                      <span>Explore destination</span>
                      <span className="sr-only"> {slide.label}</span>

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