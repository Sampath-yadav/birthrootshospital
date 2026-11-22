"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { STAGES } from "~/config/stages";

/** Six stages of care: just the icons and names, no cards or arrows. */
export function CareStages() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="stages-title"
      className="site-container pt-14 sm:pt-20"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="stages-title"
          className="font-display text-ink text-2xl font-extrabold text-balance sm:text-4xl"
        >
          Care for every stage of your journey
        </h2>
        <p className="text-charcoal mt-3 text-[15px] text-balance sm:text-lg">
          From the first hope of a baby to the first feed, one team walks beside
          you.
        </p>
      </div>

      <ol className="mx-auto mt-10 grid max-w-5xl grid-cols-3 gap-x-4 gap-y-8 sm:mt-12 lg:grid-cols-6">
        {STAGES.map((stage, i) => (
          <motion.li
            key={stage.id}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group flex flex-col items-center text-center"
          >
            <Image
              src={stage.icon}
              alt=""
              width={224}
              height={224}
              sizes="96px"
              className="size-20 object-contain transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 sm:size-24"
            />
            <span className="font-display text-ink mt-3 text-sm font-bold sm:text-base">
              {stage.label}
            </span>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
