"use client";

import { motion } from "framer-motion";
import {
  ContactSupportOutlined,
  FamilyRestroomOutlined,
  ShapeLineOutlined,
  VerifiedOutlined,
  ArrowOutwardRounded,
} from "@mui/icons-material";

const services = [
  {
    number: "01",
    icon: ShapeLineOutlined,
    title: "Personalized Itineraries",
    description:
      "Tailored travel plans shaped around your interests, pace, preferences, and the way you want to experience a destination.",
    label: "Tailored planning",
  },
  {
    number: "02",
    icon: FamilyRestroomOutlined,
    title: "Family-Friendly Packages",
    description:
      "Thoughtfully planned journeys that make traveling with family comfortable, engaging, and effortless.",
    label: "Made for everyone",
  },
  {
    number: "03",
    icon: ContactSupportOutlined,
    title: "24/7 Customer Support",
    description:
      "From planning to arrival and everything in between, our team remains available whenever you need us.",
    label: "Always available",
  },
  {
    number: "04",
    icon: VerifiedOutlined,
    title: "100% Trusted Tour Agency",
    description:
      "Reliable planning, transparent service, and carefully selected experiences designed to give you complete peace of mind.",
    label: "Travel with confidence",
  },
];

const ServicesPage = () => {
  return (
    <section className="relative overflow-hidden bg-[#F7F8F5] py-24 sm:py-28 lg:py-32">
      {/* Subtle background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#2095AE]/[0.035] blur-[120px]" />

        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#2095AE]/[0.025] blur-[120px]" />
      </div>

      <div className="custom-container relative z-10">
        {/* ================= HEADER ================= */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="mb-5 block font-serif text-lg italic text-[#2095AE]">
            Designed around you.
          </span>

          <h2 className="text-[clamp(2.8rem,5.5vw,6rem)] font-medium leading-[0.9] tracking-[-0.06em] text-[#111827]">
            More than a trip.
            <br />

            <span className="text-[#111827]/25">
              A better way to{" "}
            </span>

            <span className="font-serif italic text-[#2095AE]">
              travel.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-[#111827]/50 sm:text-base">
            From the first conversation to the moment you return home,
            every detail is designed around comfort, confidence and the
            freedom to experience more.
          </p>
        </motion.div>

        {/* ================= SERVICES ================= */}

        <div className="mx-auto mt-20 max-w-6xl lg:mt-24">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.number}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group"
              >
                <div className="flex flex-col gap-7 py-10 sm:py-12 lg:grid lg:grid-cols-[70px_70px_1fr_40px] lg:items-center lg:gap-8">
                  {/* Small number */}

                  <span className="text-[10px] font-medium tracking-[0.2em] text-[#111827]/25 transition-colors duration-300 group-hover:text-[#2095AE]">
                    {service.number}
                  </span>

                  {/* Icon */}

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2095AE]/[0.07] transition-all duration-500 group-hover:bg-[#2095AE]">
                    <Icon
                      sx={{ fontSize: 23 }}
                      className="text-[#2095AE] transition-colors duration-500 group-hover:text-white"
                    />
                  </div>

                  {/* Content */}

                  <div className="grid gap-5 md:grid-cols-[0.85fr_1fr] md:items-center md:gap-10">
                    <div>
                      <span className="mb-2 block text-[8px] font-semibold uppercase tracking-[0.22em] text-[#2095AE]">
                        {service.label}
                      </span>

                      <h3 className="text-2xl font-medium tracking-[-0.035em] text-[#111827] transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl">
                        {service.title}
                      </h3>
                    </div>

                    <p className="max-w-lg text-sm leading-7 text-[#111827]/45 transition-colors duration-500 group-hover:text-[#111827]/65">
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow */}

                  <div className="hidden lg:flex">
                    <ArrowOutwardRounded
                      sx={{ fontSize: 19 }}
                      className="text-[#111827]/25 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#2095AE]"
                    />
                  </div>
                </div>

                {/* Very subtle divider */}

                {index !== services.length - 1 && (
                  <div className="h-px bg-[#111827]/[0.07]" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ================= BOTTOM ================= */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-16 flex max-w-6xl items-center justify-between"
        >
          <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-[#111827]/30">
            Go-Venture
          </span>

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2095AE]" />

            <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#2095AE]">
              Travel with confidence
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPage;