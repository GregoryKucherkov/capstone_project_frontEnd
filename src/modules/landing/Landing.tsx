import { Exercises } from "@/modules/landing/components/exercises/Exercises";

import { Hero } from "@/modules/landing/components/hero/Hero";
import { Testimonials } from "@/modules/landing/components/testimonials/Testimonials";
import testimonialsData from "./api/testimonials.json";
import css from "./Landing.module.css";
import { Planning } from "@/modules/landing/components/features/planning/Planning";
import { Tracking } from "@/modules/landing/components/features/tracking/Tracking";
import { Social } from "@/modules/landing/components/features/social/Social";

export const Landing = () => {
  return (
    <>
      <Hero />

      <div className={css.gridLanding}>
        <Exercises />
        <Planning />
        <Tracking />
        <Social />
        <Testimonials data={testimonialsData} />
      </div>
    </>
  );
};
