"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type {
  Map as MapLibreMap,
  Marker as MapLibreMarker,
} from "maplibre-gl";
import AddRounded from "@mui/icons-material/AddRounded";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import CropFreeRounded from "@mui/icons-material/CropFreeRounded";
import RemoveRounded from "@mui/icons-material/RemoveRounded";

import "maplibre-gl/dist/maplibre-gl.css";

import type { Destination, LngLat } from "./types";
import { formatPrice, getCoordinates } from "./utils";

/* -------------------------------------------------------------------------
   Setup:  npm i maplibre-gl

   Destinations need coordinates at `locations.coordinates` as [lng, lat]
   (or { lat, lng }). Anything without them is skipped; with none at all the
   atlas renders nothing.

   With maplibre-gl v5+ the map is a globe. On older versions it falls back
   to a flat map automatically.
-------------------------------------------------------------------------- */

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface AtlasFocus {
  id: string;
  /** Changes on every request so the same place can be flown to again. */
  nonce: number;
}

interface Props {
  destinations: Destination[];
  total?: number;
  focus: AtlasFocus | null;
  onFocus: (id: string) => void;
}

interface Place {
  id: string;
  coords: LngLat;
  destination: Destination;
}

type ProjectionMap = MapLibreMap & {
  setProjection?: (projection: { type: string }) => void;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Re-colour the base style into the section's deep-lagoon palette.
const tintStyle = (map: MapLibreMap) => {
  const layers = map.getStyle()?.layers ?? [];

  layers.forEach(({ id, type }) => {
    try {
      if (type === "background") {
        map.setPaintProperty(id, "background-color", "#0B2229");
      } else if (type === "fill") {
        map.setPaintProperty(
          id,
          "fill-color",
          /water/i.test(id) ? "#04141A" : "#0B2229"
        );
      } else if (type === "line") {
        if (/boundary|admin/i.test(id)) {
          map.setPaintProperty(id, "line-color", "#3FA7BD");
          map.setPaintProperty(id, "line-opacity", 0.35);
        } else {
          map.setPaintProperty(
            id,
            "line-color",
            /water/i.test(id) ? "#04141A" : "#12343D"
          );
        }
      } else if (type === "symbol") {
        map.setPaintProperty(id, "text-color", "#8DB9C4");
        map.setPaintProperty(id, "text-halo-color", "#04141A");
      }
    } catch {
      // A layer that rejects a property simply keeps its default look.
    }
  });
};

const el = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  text?: string
): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);
  node.className = className;
  if (text) node.textContent = text;
  return node;
};

// Price-tag pin. Built with DOM APIs (textContent), so data is never injected
// as HTML. Its look is driven by [data-active] through Tailwind variants.
const buildMarker = (destination: Destination): HTMLButtonElement => {
  const city = destination.locations?.city;
  const label =
    formatPrice(destination.packagePrice) || city || destination.title;

  const root = el("button", "group flex flex-col items-center outline-none");
  root.type = "button";
  root.dataset.active = "false";
  root.setAttribute(
    "aria-label",
    city ? `${destination.title}, ${city}` : destination.title
  );

  const pulse = el(
    "span",
    "pointer-events-none absolute -bottom-2.5 left-1/2 -translate-x-1/2"
  );
  pulse.append(
    el(
      "span",
      "block h-6 w-6 rounded-full bg-[#7FD6E8]/50 opacity-0 group-data-[active=true]:animate-ping group-data-[active=true]:opacity-100"
    )
  );

  root.append(
    pulse,
    el(
      "span",
      "relative block whitespace-nowrap rounded-full border border-white/20 bg-[#051A1F]/90 px-3 py-1.5 text-[13px] font-semibold leading-none text-[#EAF6F8] shadow-[0_12px_28px_-8px_rgba(0,0,0,0.8)] backdrop-blur transition duration-300 group-hover:-translate-y-0.5 group-hover:border-[#EBDDBB] group-focus-visible:ring-2 group-focus-visible:ring-[#7FD6E8] group-data-[active=true]:-translate-y-1 group-data-[active=true]:scale-110 group-data-[active=true]:border-[#EBDDBB] group-data-[active=true]:bg-[#EBDDBB] group-data-[active=true]:text-[#051A1F]",
      label
    ),
    el(
      "span",
      "-mt-1 block h-2 w-2 rotate-45 border-b border-r border-white/20 bg-[#051A1F] transition duration-300 group-data-[active=true]:-translate-y-1 group-data-[active=true]:border-[#EBDDBB] group-data-[active=true]:bg-[#EBDDBB]"
    )
  );

  return root;
};

const controlButton =
  "grid h-11 w-11 place-items-center text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white focus-visible:outline-none active:scale-95";

const DestinationsAtlas = ({ destinations, total, focus, onFocus }: Props) => {
  const places = useMemo<Place[]>(
    () =>
      destinations.flatMap((destination) => {
        const coords = getCoordinates(destination.locations);
        return coords ? [{ id: destination._id, coords, destination }] : [];
      }),
    [destinations]
  );

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef(new Map<string, HTMLLIElement>());
  const chipRefs = useRef(new Map<string, HTMLButtonElement>());
  const mapRef = useRef<MapLibreMap | null>(null);
  const libRef = useRef<typeof import("maplibre-gl") | null>(null);
  const markersRef = useRef(
    new Map<string, { element: HTMLButtonElement; marker: MapLibreMarker }>()
  );
  const placesRef = useRef(places);
  const introRef = useRef(false);
  const onFocusRef = useRef(onFocus); // latest handler without re-creating the map
  placesRef.current = places;
  onFocusRef.current = onFocus;

  const active = places.find((place) => place.id === focus?.id) ?? places[0];
  const activeKey = active?.id;

  const fitAll = useCallback((animate = true, duration = 1600) => {
    const map = mapRef.current;
    const lib = libRef.current;
    const container = containerRef.current;
    if (!map || !lib || !container) return;

    const bounds = new lib.LngLatBounds();
    placesRef.current.forEach((place) => bounds.extend(place.coords));

    const width = container.clientWidth;
    const padding =
      width >= 1024
        ? { top: 110, right: 100, bottom: 170, left: 420 } // clear of the floating list
        : width >= 640
        ? { top: 90, right: 70, bottom: 170, left: 70 }
        : { top: 80, right: 36, bottom: 80, left: 36 };

    map.fitBounds(bounds, {
      padding,
      maxZoom: 4.2,
      duration: animate && !prefersReducedMotion() ? duration : 0,
    });
  }, []);

  // Create the map once per data set (client only, lazy-loaded).
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !places.length) return undefined;

    let disposed = false;
    let map: MapLibreMap | null = null;

    setReady(false);
    setFailed(false);

    (async () => {
      try {
        const lib = await import("maplibre-gl");
        if (disposed) return;
        libRef.current = lib;

        map = new lib.Map({
          container,
          style: MAP_STYLE,
          center: [15, 20],
          zoom: 0.9,
          minZoom: 0.8,
          maxZoom: 12,
          attributionControl: false,
          dragRotate: false,
          pitchWithRotate: false,
          touchPitch: false,
          cooperativeGestures: true, // never hijack page scroll
        });

        mapRef.current = map;
        map.touchZoomRotate.disableRotation();
        map.addControl(
          new lib.AttributionControl({ compact: true }),
          "bottom-right"
        );

        map.once("style.load", () => {
          if (!map) return;
          tintStyle(map);
          (map as ProjectionMap).setProjection?.({ type: "globe" });
        });

        map.once("load", () => {
          if (!disposed) setReady(true);
        });

        places.forEach((place) => {
          const element = buildMarker(place.destination);
          element.addEventListener("click", () => onFocusRef.current(place.id));

          const marker = new lib.Marker({ element, anchor: "bottom" })
            .setLngLat(place.coords)
            .addTo(map!);

          markersRef.current.set(place.id, { element, marker });
        });
      } catch {
        if (!disposed) setFailed(true);
      }
    })();

    return () => {
      disposed = true;
      markersRef.current.forEach(({ marker }) => marker.remove());
      markersRef.current.clear();
      mapRef.current = null;
      introRef.current = false;
      map?.remove();
    };
  }, [places]);

  // Cinematic intro: the globe settles on your destinations when it scrolls into view.
  useEffect(() => {
    const stage = stageRef.current;
    if (!ready || !stage) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !introRef.current) {
          introRef.current = true;
          fitAll(true, 2800);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, [ready, fitAll]);

  // Fly to whatever the page (or the list) asked for.
  useEffect(() => {
    if (!ready || !focus) return;

    const map = mapRef.current;
    const place = placesRef.current.find((item) => item.id === focus.id);
    if (!map || !place) return;

    introRef.current = true;
    const wide = (containerRef.current?.clientWidth ?? 0) >= 1024;

    map.flyTo({
      center: place.coords,
      zoom: 5,
      speed: 1.05,
      curve: 1.6,
      offset: [wide ? 190 : 0, 0], // pin lands in the free area, beside the list
      essential: true,
      ...(prefersReducedMotion() ? { duration: 0 } : {}),
    });
  }, [focus, ready]);

  // Reflect the active destination on its pin.
  useEffect(() => {
    markersRef.current.forEach(({ element }, id) => {
      const isActive = id === activeKey;
      element.dataset.active = String(isActive);
      element.style.zIndex = isActive ? "2" : "1";
    });
  }, [activeKey, ready]);

  // Keep the active row / chip in view without ever scrolling the page.
  useEffect(() => {
    if (!activeKey) return;

    const list = listRef.current;
    const row = rowRefs.current.get(activeKey);
    if (list && row && list.offsetParent) {
      list.scrollTo({
        top: row.offsetTop - (list.clientHeight - row.clientHeight) / 2,
        behavior: "smooth",
      });
    }

    const chips = chipsRef.current;
    const chip = chipRefs.current.get(activeKey);
    if (chips && chip && chips.offsetParent) {
      chips.scrollTo({
        left: chip.offsetLeft - (chips.clientWidth - chip.clientWidth) / 2,
        behavior: "smooth",
      });
    }
  }, [activeKey]);

  if (!places.length || !active) return null;

  const activeDestination = active.destination;
  const count = total ?? places.length;

  return (
    <section id="atlas" aria-labelledby="atlas-title" className="scroll-mt-6">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2
          id="atlas-title"
          className="max-w-2xl font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.98] tracking-[-0.035em] text-[#EAF6F8]"
        >
          Explore by location.
        </h2>

        <p className="max-w-xs text-sm leading-7 text-[#EAF6F8]/55">
          Drag the map, choose a price tag and see where the trip goes.
        </p>
      </div>

      <div
        ref={stageRef}
        className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#051A1F] shadow-[0_60px_120px_-50px_rgba(0,0,0,0.9)] sm:rounded-[2.25rem]"
      >
        <div className="relative h-[460px] sm:h-[600px] lg:h-[720px]">
          {/* Map. The glow behind it becomes the atmosphere around the globe. */}
          <div
            ref={containerRef}
            data-ready={ready}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0E3944_0%,#051A1F_62%)] opacity-0 transition-opacity duration-1000 data-[ready=true]:opacity-100"
          />

          {!ready && (
            <div className="absolute inset-0 grid place-items-center px-8 text-center text-sm text-white/45">
              {failed
                ? "The map couldn't load in this browser. Use the list to browse destinations."
                : "Loading map…"}
            </div>
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_160px_rgba(3,12,15,0.75)]"
          />

          {/* Status */}
          <div className="pointer-events-none absolute left-4 top-4 z-10 sm:left-6 sm:top-6 lg:left-[23.5rem]">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[#051A1F]/60 py-2 pl-3 pr-4 text-xs font-medium text-white/85 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7FD6E8] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7FD6E8]" />
              </span>
              {places.length} {places.length === 1 ? "place" : "places"} on the
              map
            </div>
          </div>

          {/* Zoom controls */}
          <div className="absolute right-4 top-4 z-10 flex flex-col divide-y divide-white/10 overflow-hidden rounded-full border border-white/15 bg-[#051A1F]/60 backdrop-blur-xl sm:right-6 sm:top-6">
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => mapRef.current?.zoomIn({ duration: 300 })}
              className={controlButton}
            >
              <AddRounded sx={{ fontSize: 20 }} />
            </button>
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => mapRef.current?.zoomOut({ duration: 300 })}
              className={controlButton}
            >
              <RemoveRounded sx={{ fontSize: 20 }} />
            </button>
            <button
              type="button"
              aria-label="Show all destinations"
              title="Show all destinations"
              onClick={() => fitAll(true)}
              className={controlButton}
            >
              <CropFreeRounded sx={{ fontSize: 19 }} />
            </button>
          </div>

          {/* Floating index (desktop) */}
          <aside className="absolute bottom-5 left-5 top-5 z-10 hidden w-[20.5rem] flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#051A1F]/70 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl lg:flex">
            <div className="px-5 pb-3 pt-5">
              <h3 className="text-lg font-medium tracking-[-0.02em] text-white">
                Destinations
              </h3>
              <p className="mt-1 text-xs text-white/45">
                {places.length} on the map, {count} in total
              </p>
            </div>

            <ul
              ref={listRef}
              className="relative min-h-0 flex-1 space-y-1 overflow-y-auto px-2 pb-2 [scrollbar-color:rgba(255,255,255,0.18)_transparent] [scrollbar-width:thin]"
            >
              {places.map((place) => {
                const isActive = place.id === activeKey;
                const { destination } = place;

                return (
                  <li
                    key={place.id}
                    ref={(node) => {
                      if (node) rowRefs.current.set(place.id, node);
                      else rowRefs.current.delete(place.id);
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => onFocus(place.id)}
                      aria-pressed={isActive}
                      className={`group flex w-full items-center gap-3 rounded-2xl p-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7FD6E8] ${
                        isActive
                          ? "bg-white/[0.09] ring-1 ring-white/15"
                          : "hover:bg-white/[0.05]"
                      }`}
                    >
                      <span className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-xl bg-white/10">
                        {destination.image?.[0] && (
                          <Image
                            src={destination.image[0]}
                            alt=""
                            fill
                            sizes="52px"
                            className="object-cover"
                          />
                        )}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-sm font-medium transition-colors ${
                            isActive
                              ? "text-white"
                              : "text-white/80 group-hover:text-white"
                          }`}
                        >
                          {destination.title}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-white/45">
                          {destination.locations?.city},{" "}
                          {destination.locations?.country?.countryId}
                        </span>
                      </span>

                      <span
                        className={`pr-1 text-sm font-semibold ${
                          isActive ? "text-[#EBDDBB]" : "text-white/60"
                        }`}
                      >
                        {formatPrice(destination.packagePrice)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/all-destinations"
              className="group flex items-center justify-between border-t border-white/10 px-5 py-4 text-sm font-medium text-white transition-colors hover:text-[#EBDDBB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#7FD6E8]"
            >
              Browse all {count} destinations
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition duration-300 group-hover:border-[#EBDDBB] group-hover:bg-[#EBDDBB] group-hover:text-[#051A1F]">
                <ArrowOutwardRounded sx={{ fontSize: 16 }} />
              </span>
            </Link>
          </aside>
        </div>

        {/* Selected trip: under the map on phones, floating over it from sm up */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="z-10 border-t border-white/10 p-3 sm:absolute sm:bottom-[6.75rem] sm:left-6 sm:w-[22.5rem] sm:border-0 sm:p-0 lg:bottom-10 lg:left-auto lg:right-6"
          >
            <Link
              href={`/all-destinations/${activeDestination._id}`}
              className="group flex items-center gap-4 rounded-[1.5rem] border border-white/15 bg-[#051A1F]/80 p-3 pr-4 text-white backdrop-blur-2xl transition hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7FD6E8] sm:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]"
            >
              <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-[1.1rem] bg-white/10">
                {activeDestination.image?.[0] && (
                  <Image
                    src={activeDestination.image[0]}
                    alt=""
                    fill
                    sizes="84px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-[#7FD6E8]">
                  {activeDestination.locations?.city},{" "}
                  {activeDestination.locations?.country?.countryId}
                </p>
                <p className="mt-1 truncate font-serif text-xl leading-tight tracking-[-0.02em]">
                  {activeDestination.title}
                </p>
                <p className="mt-1 text-xs text-white/55">
                  {activeDestination.durationDays} days from{" "}
                  <span className="font-semibold text-[#EBDDBB]">
                    {formatPrice(activeDestination.packagePrice)}
                  </span>
                </p>
              </div>

              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#EBDDBB] text-[#051A1F] transition duration-300 group-hover:rotate-45">
                <ArrowOutwardRounded sx={{ fontSize: 19 }} />
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Place chips (phones and tablets) */}
        <div
          ref={chipsRef}
          className="relative flex snap-x gap-2 overflow-x-auto border-t border-white/10 p-3 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
        >
          {places.map((place) => {
            const isActive = place.id === activeKey;
            const { destination } = place;

            return (
              <button
                key={place.id}
                type="button"
                ref={(node) => {
                  if (node) chipRefs.current.set(place.id, node);
                  else chipRefs.current.delete(place.id);
                }}
                onClick={() => onFocus(place.id)}
                aria-pressed={isActive}
                className={`flex shrink-0 snap-start items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7FD6E8] ${
                  isActive
                    ? "border-[#EBDDBB] bg-[#EBDDBB]/10"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <span className="relative h-9 w-9 overflow-hidden rounded-full bg-white/10">
                  {destination.image?.[0] && (
                    <Image
                      src={destination.image[0]}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  )}
                </span>
                <span>
                  <span className="block text-sm font-medium leading-tight text-white">
                    {destination.locations?.city ?? destination.title}
                  </span>
                  <span className="block text-xs leading-tight text-[#EBDDBB]">
                    {formatPrice(destination.packagePrice)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DestinationsAtlas;