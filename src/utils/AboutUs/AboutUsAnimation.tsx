"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const AboutUsAnimation = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const stats = [
    { value: 20, label: "Years" },
    { value: 80, label: "Journeys" },
    { value: 850, label: "Travelers" },
    { value: 130, label: "Awards" },
  ];

  return (
    <div ref={ref}>
      <div className="grid w-full grid-cols-2 overflow-hidden rounded-b-2xl border border-[#111827]/10 bg-white/60 backdrop-blur-sm sm:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex min-w-0 items-center justify-center gap-2 px-3 py-4 sm:gap-2.5 sm:px-4 ${
              index % 2 !== 0 ? "border-l border-[#111827]/10" : ""
            } ${
              index >= 2 ? "border-t border-[#111827]/10 sm:border-t-0" : ""
            }`}
          >
            <span className="shrink-0 text-xl font-semibold tracking-[-0.05em] text-[#111827] sm:text-2xl">
              {inView && (
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={1.4}
                />
              )}
              <span className="text-[#2095AE]">+</span>
            </span>

            <span className="min-w-0 truncate text-[9px] font-medium uppercase tracking-[0.1em] text-[#111827]/40 sm:text-[10px] sm:tracking-[0.12em]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsAnimation;