"use client";

import React from "react";
import { motion } from "framer-motion";
import SpecialOfferCard from "../ui/SpecialOfferCard/SpecialOfferCard";

const SpecialOffer = ({ specialOfferData, destinations }) => {
  const ease = [0.22, 1, 0.36, 1];

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease,
      },
    },
  };

  const cardsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 45,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease,
      },
    },
  };

  return (
    <section className="custom-container mt-20 md:mt-28">
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.35,
        }}
        className="mx-auto w-full text-center md:w-1/2"
      >
        <motion.div variants={headerVariants}>
          <h2 className="text-4xl font-semibold tracking-tight text-[#10213a] md:text-5xl">
            Epic Special Offer
          </h2>
        </motion.div>

        <motion.p
          variants={headerVariants}
          className="mt-4 text-sm leading-7 text-gray-500 md:text-base"
        >
          Unlock incredible discounts on your favorite products. Don&apos;t
          miss out on these limited-time deals!
        </motion.p>
      </motion.div>

      {/* Offers */}
      <motion.div
        variants={cardsContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2"
      >
        {specialOfferData.map((specialOffer) => {
          const destination = destinations.data.find(
            (dest) => dest._id === specialOffer.destinationId
          );

          return (
            <motion.div
              key={specialOffer._id}
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              }}
              className="will-change-transform"
            >
              <SpecialOfferCard
                specialOffer={specialOffer}
                destination={destination}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default SpecialOffer;