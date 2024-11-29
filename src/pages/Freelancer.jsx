// import React from "react";
import { motion } from "framer-motion";
import FreelanceFeature from "../components/Freelancer/FreelanceFeature";
import FreelanceHow from "../components/Freelancer/FreelanceHow";
import FreelancerHero from "../components/Freelancer/FreelancerHero";
import FreelanceTestimonial from "../components/Freelancer/FreelanceTestimonial";
import FreelanceGetStart from "../components/Freelancer/FreelanceGetStart";

export default function Freelancer() {
  // Scroll-triggered animation variants
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Parallax scroll effect
 

  return (
    <motion.div>
      {/* Hero Section with Scroll-Triggered Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2,
        }}
      >
        <FreelancerHero />
      </motion.div>

      {/* Features Section with Scroll Trigger */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.1,
        }}
        variants={sectionVariants}
      >
        <FreelanceFeature />
      </motion.div>

      {/* Animated Divider */}
      <motion.hr
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{
          scaleX: 1,
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        viewport={{ once: false }}
        className="mx-5 m-8 border-t-2"
      />

      {/* How It Works Section with Scroll Trigger */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.1,
        }}
        variants={{
          ...sectionVariants,
          visible: {
            ...sectionVariants.visible,
            transition: {
              ...sectionVariants.visible.transition,
              delay: 0.2, // Slight delay for staggered effect
            },
          },
        }}
      >
        <FreelanceHow />
      </motion.div>

      {/* Another Animated Divider */}
      <motion.hr
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{
          scaleX: 1,
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        viewport={{ once: false }}
        className="mx-5 m-8 md:hidden border-t-0"
      />

      {/* Testimonials Section with Scroll Trigger */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.1,
        }}
        variants={{
          ...sectionVariants,
          visible: {
            ...sectionVariants.visible,
            transition: {
              ...sectionVariants.visible.transition,
              delay: 0.4, // Larger delay for more staggered effect
            },
          },
        }}
      >
        <FreelanceTestimonial />
      </motion.div>
      {/* Another Animated Divider */}
      <motion.hr
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{
          scaleX: 1,
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        viewport={{ once: false }}
        className="mx-5 m-8"
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.1,
        }}
        variants={{
          ...sectionVariants,
          visible: {
            ...sectionVariants.visible,
            transition: {
              ...sectionVariants.visible.transition,
              delay: 0.4, // Larger delay for more staggered effect
            },
          },
        }}
      >
        <FreelanceGetStart />
      </motion.div>
    </motion.div>
  );
}
