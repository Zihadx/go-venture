"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";

interface Props {
  children: ReactNode;
  label: string;
  autoPlayMs?: number;
}

interface RailState {
  index: number;
  canPrev: boolean;
  canNext: boolean;
  scrollable: boolean;
}

const EDGE = 4;

const arrow =
  "grid h-10 w-10 place-items-center rounded-full border border-[#111827]/10 bg-white text-[#111827]/70 shadow-[0_8px_30px_rgba(17,24,39,0.08)] transition-all duration-300 hover:border-[#2095AE]/40 hover:bg-[#2095AE] hover:text-white hover:shadow-[0_12px_35px_rgba(32,149,174,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2095AE]/30 active:scale-90 disabled:pointer-events-none disabled:opacity-30 sm:h-11 sm:w-11";

const getItems = (el: HTMLElement) => Array.from(el.children) as HTMLElement[];

const snapOffset = (el: HTMLElement) =>
  parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;

const DestinationsRail = ({ children, label, autoPlayMs = 0 }: Props) => {
  const scroller = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);

  const indexRef = useRef(0);

  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    startLeft: 0,
  });

  const hovering = useRef(false);
  const focused = useRef(false);
  const pausedUntil = useRef(0);

  const count = Children.count(children);

  const [dragging, setDragging] = useState(false);

  const [state, setState] = useState<RailState>({
    index: 0,
    canPrev: false,
    canNext: false,
    scrollable: false,
  });

  const pauseFor = useCallback((ms: number) => {
    pausedUntil.current = Date.now() + ms;
  }, []);

  /*
   * Keep everything synced to the REAL scroll position.
   * This makes the rail feel natural even when the user
   * swipes, drags or uses a trackpad.
   */
  const sync = useCallback(() => {
    const el = scroller.current;

    if (!el) return;

    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const left = el.scrollLeft;

    const scrollable = max > EDGE;
    const canPrev = scrollable && left > EDGE;
    const canNext = scrollable && left < max - EDGE;

    const items = getItems(el);

    let index = 0;

    if (items.length) {
      let closestDistance = Infinity;

      items.forEach((item, i) => {
        const target = item.offsetLeft - snapOffset(el);
        const distance = Math.abs(target - left);

        if (distance < closestDistance) {
          closestDistance = distance;
          index = i;
        }
      });
    }

    indexRef.current = index;

    /*
     * Smooth progress indicator.
     */
    const bar = thumb.current;

    if (bar) {
      const ratio =
        el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1;

      const progress = max > 0 ? left / max : 0;

      bar.style.width = `${ratio * 100}%`;

      bar.style.transform = `translateX(${progress * (1 / ratio - 1) * 100}%)`;
    }

    setState((previous) => {
      if (
        previous.index === index &&
        previous.canPrev === canPrev &&
        previous.canNext === canNext &&
        previous.scrollable === scrollable
      ) {
        return previous;
      }

      return {
        index,
        canPrev,
        canNext,
        scrollable,
      };
    });
  }, []);

  /*
   * Scroll directly to a card.
   * Uses the rail itself instead of scrollIntoView so
   * the page never jumps vertically.
   */
  const goTo = useCallback((target: number) => {
    const el = scroller.current;

    if (!el) return;

    const items = getItems(el);

    if (!items.length) return;

    const next = Math.min(items.length - 1, Math.max(0, target));

    const item = items[next];

    if (!item) return;

    const left = item.offsetLeft - snapOffset(el);

    el.scrollTo({
      left,
      behavior: "smooth",
    });
  }, []);

  const step = useCallback(
    (direction: 1 | -1) => {
      pauseFor(6000);

      const next = indexRef.current + direction;

      /*
       * Loop autoplay, but arrows still respect
       * their disabled state.
       */
      if (direction === 1 && next >= count) {
        goTo(0);
        return;
      }

      if (direction === -1 && next < 0) {
        goTo(count - 1);
        return;
      }

      goTo(next);
    },
    [count, goTo, pauseFor],
  );

  /*
   * Scroll listener.
   */
  useEffect(() => {
    const el = scroller.current;

    if (!el) return undefined;

    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(sync);
    };

    sync();

    el.addEventListener("scroll", onScroll, { passive: true });

    const resizeObserver = new ResizeObserver(sync);

    resizeObserver.observe(el);

    return () => {
      cancelAnimationFrame(frame);

      el.removeEventListener("scroll", onScroll);

      resizeObserver.disconnect();
    };
  }, [sync, count]);

  /*
   * Re-sync after layout changes.
   */
  useEffect(() => {
    sync();
  }, [sync, state.scrollable]);

  /*
   * FREE MOUSE DRAG
   *
   * Instead of forcing the rail into a snap position
   * while dragging, the user can freely move it.
   */
  useEffect(() => {
    const move = (event: PointerEvent) => {
      const el = scroller.current;
      const d = drag.current;

      if (!d.active || !el) return;

      const dx = event.clientX - d.startX;

      if (!d.moved && Math.abs(dx) > 5) {
        d.moved = true;
        setDragging(true);
      }

      if (d.moved) {
        event.preventDefault();

        /*
         * Direct movement gives the track a much
         * more natural physical feeling.
         */
        el.scrollLeft = d.startLeft - dx;
      }
    };

    const up = () => {
      const d = drag.current;

      if (!d.active) return;

      d.active = false;

      if (d.moved) {
        setDragging(false);

        /*
         * Give the browser a frame to finish the
         * final pointer movement before settling.
         */
        requestAnimationFrame(() => {
          goTo(indexRef.current);
        });

        /*
         * Prevent the click generated by mouseup
         * from opening the card.
         */
        window.setTimeout(() => {
          d.moved = false;
        }, 50);
      }
    };

    window.addEventListener("pointermove", move, { passive: false });

    window.addEventListener("pointerup", up);

    window.addEventListener("pointercancel", up);

    return () => {
      window.removeEventListener("pointermove", move);

      window.removeEventListener("pointerup", up);

      window.removeEventListener("pointercancel", up);
    };
  }, [goTo]);

  /*
   * Autoplay.
   *
   * It stops when:
   * - rail isn't visible
   * - user is hovering
   * - user focuses it
   * - user is dragging
   * - user recently interacted
   * - browser tab is hidden
   */
  useEffect(() => {
    const el = scroller.current;

    if (!autoPlayMs || !el) {
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let visible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(el);

    const timer = window.setInterval(() => {
      const busy =
        hovering.current ||
        focused.current ||
        drag.current.active ||
        Date.now() < pausedUntil.current;

      if (!visible || busy || document.hidden) {
        return;
      }

      const max = el.scrollWidth - el.clientWidth;

      if (max <= EDGE) return;

      const current = indexRef.current;

      /*
       * Soft continuous progression.
       */
      if (current >= count - 1) {
        goTo(0);
      } else {
        goTo(current + 1);
      }
    }, autoPlayMs);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [autoPlayMs, count, goTo]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pauseFor(6000);

    if (event.pointerType !== "mouse" || event.button !== 0) {
      return;
    }

    const el = scroller.current;

    if (!el || !state.scrollable) {
      return;
    }

    drag.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      startLeft: el.scrollLeft,
    };
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => {
        hovering.current = true;
      }}
      onMouseLeave={() => {
        hovering.current = false;
      }}
      onFocus={() => {
        focused.current = true;
      }}
      onBlur={() => {
        focused.current = false;
      }}
    >
      {/* =========================== RAIL =========================== */}

      <div
        ref={scroller}
        onPointerDown={onPointerDown}
        onWheel={() => pauseFor(4000)}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (drag.current.moved) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        className={`
          relative
          -mx-5
          flex
          gap-4
          overflow-x-auto
          px-5
          pb-3
          scroll-pl-5
          overscroll-x-contain
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden

          sm:-mx-8
          sm:gap-5
          sm:px-8
          sm:scroll-pl-8

          lg:-mx-12
          lg:gap-6
          lg:px-12
          lg:scroll-pl-12

          ${
            dragging
              ? "cursor-grabbing select-none"
              : state.scrollable
                ? "cursor-grab"
                : ""
          }
        `}
      >
        {Children.map(children, (child, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className="
  w-full
  shrink-0
  sm:w-full
  lg:w-[calc((100%-1.5rem)/2)]
  xl:w-[calc((100%-4.5rem)/4)]
"
          >
            {child}
          </div>
        ))}
      </div>

      {/* ========================= CONTROLS ========================= */}

      {state.scrollable && (
        <div
          className="
            mt-6
            flex
            items-center
            gap-4

            sm:mt-7
            sm:gap-6
          "
        >
          {/* Progress */}

          <div
            aria-hidden="true"
            className="
              relative
              h-[3px]
              flex-1
              overflow-hidden
              rounded-full
              bg-[#111827]/[0.07]
            "
          >
            <span
              ref={thumb}
              className="
                absolute
                inset-y-0
                left-0
                w-1/3
                rounded-full
                bg-[#2095AE]
                transition-[transform,width]
                duration-200
                ease-out
              "
            />
          </div>

          {/* Counter */}

          <span
            aria-live="polite"
            className="
              hidden
              text-xs
              tabular-nums
              text-[#111827]/40
              sm:block
            "
          >
            {String(state.index + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </span>

          {/* Mobile hint */}

          <span
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-[#111827]/30
              sm:hidden
            "
          >
            Swipe
          </span>

          {/* Arrows */}

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous destinations"
              disabled={!state.canPrev}
              onClick={() => step(-1)}
              className={arrow}
            >
              <ArrowBackRounded
                sx={{
                  fontSize: 20,
                }}
              />
            </button>

            <button
              type="button"
              aria-label="Next destinations"
              disabled={!state.canNext}
              onClick={() => step(1)}
              className={arrow}
            >
              <ArrowForwardRounded
                sx={{
                  fontSize: 20,
                }}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationsRail;
