import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function ProfileListItem({ isLeader, name, rank }) {
  const getColor = (rank) => {
    if (rank === 1) return "gold";
    if (rank === 2) return "silver";
    if (rank === 3) return "#CD7F32";
    if (rank >= 4 && rank <= 30) return "#00D8FF";
    return "#99a6ff";
  };

  const color = getColor(rank);

  // Intersection Observer setup for scroll-based animation
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of the component is visible
    triggerOnce: false, // Allow repeated animations if scrolling up and down
  });

  // Animation controls
  const controls = useAnimation();

  // Animation variants
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -50, // Slide from left
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Animate on view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={itemVariants}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="flex -skew-x-12"
    >
      <motion.div
        className="h-6 w-[80%] border-b flex gap-4 px-2 text-sm bg-black bg-opacity-50"
        style={{ borderColor: color }}
        initial={{ borderWidth: 0 }}
        animate={{
          borderWidth: 1,
          transition: {
            delay: 0.3,
            duration: 0.5,
          },
        }}
      >
        <h4
          className={`text-sm font-mono text-center ${
            isLeader && "text-[#00d9ffc4]"
          }`}
        >
          {name}
        </h4>
      </motion.div>
      <motion.div
        className={`w-[20%] text-xs text-black`}
        style={{ backgroundColor: color }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 0.5,
            duration: 0.5,
          },
        }}
      >
        <p className="text-center">
          <span className="font-bold text-red-700 text-sm">{rank} </span>rank
        </p>
      </motion.div>
    </motion.div>
  );
}
