"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const FAQsection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How does it work?",
      answer:
        "Discover and book your dream travel experiences effortlessly on Go-Venture's user-friendly platform.",
    },
    {
      question: "Do I need a designer to use Go-Venture's?",
      answer:
        "No, design skills required! Go-Venture's website is designed for easy navigation by everyone.",
    },
    {
      question: "What do I need to do to start selling?",
      answer:
        "Create an account, list your travel offerings, and start selling to our global community of travelers.",
    },
    {
      question: "What happens when I receive an order?",
      answer:
        "Receive instant email notifications upon order placement, and manage your orders seamlessly through your dashboard.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="mt-20 pt-16">
     
      {/* FAQ LIST */}
      <div className="border-t border-[#111827]/10">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              className="border-b border-[#111827]/10"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
              >
                <div className="flex items-start gap-5">
                  {/* Small index */}
                  <span
                    className={`mt-1 text-[10px] font-semibold tracking-[0.2em] transition-colors duration-300 ${
                      isOpen
                        ? "text-[#2095AE]"
                        : "text-[#111827]/25"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Question */}
                  <span
                    className={`text-base font-medium transition-colors duration-300 md:text-lg ${
                      isOpen
                        ? "text-[#2095AE]"
                        : "text-[#111827] group-hover:text-[#2095AE]"
                    }`}
                  >
                    {faq.question}
                  </span>
                </div>

                {/* Icon */}
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? "rotate-45 border-[#2095AE] bg-[#2095AE] text-white"
                      : "border-[#111827]/15 text-[#111827]/50 group-hover:border-[#2095AE] group-hover:text-[#2095AE]"
                  }`}
                >
                  <AddRoundedIcon sx={{ fontSize: 19 }} />
                </span>
              </button>

              {/* ANSWER */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      height: {
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: {
                        duration: 0.2,
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pb-7 pl-[3.25rem] pr-12 md:pl-[3.5rem] md:pr-16">
                      <p className="max-w-2xl text-sm leading-7 text-[#111827]/55 md:text-[15px]">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQsection;