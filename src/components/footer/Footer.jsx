/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import {
  motion,
  useInView,
  useAnimation,
} from "framer-motion";
import FooterBackground from "./FooterBackground";
import FooterBranding from "./FooterBranding";
import FooterNavigation from "./FooterNavigation";
import NewsletterSection from "./NewsletterSection";
import FooterCopyright from "./FooterCopyright";

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { amount: 0.1 });
  const [hoverPoint, setHoverPoint] = useState({ x: 0.5, y: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    setHoverPoint({ x, y });
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden bg-black text-white border-t border-cyan-900/30"
      onMouseMove={handleMouseMove}
    >
      <FooterBackground hoverPoint={hoverPoint} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 relative">
          {/* Logo & Branding Section */}
          <FooterBranding itemVariants={itemVariants} />

          {/* Navigation Section */}
          <FooterNavigation itemVariants={itemVariants} />

          {/* Newsletter Section */}
          <NewsletterSection itemVariants={itemVariants} />
        </div>
      </motion.div>

      {/* Copyright Section */}
      <FooterCopyright isInView={isInView} />
    </footer>
  );
};

export default Footer;
