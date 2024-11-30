// import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiDollarSign, FiStar, FiUsers } from "react-icons/fi";

export default function FreelanceFeature() {
  // Variants for section header animations
  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.7,
      },
    },
  };

  // Variants for feature items
  const featureVariants = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        duration: 0.7,
      },
    },
  };

  // Variants for icons
  const iconVariants = {
    hidden: {
      scale: 0.8,
      rotate: -20,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  return (
    <>
      {/* Features Section */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="lg:text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.h2
              className="text-base text-stone-300 font-semibold tracking-wide uppercase"
              variants={headerVariants}
            >
              Features
            </motion.h2>
            <motion.p
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-brandPrimary sm:text-4xl"
              variants={headerVariants}
            >
              A better way to hire freelancers
            </motion.p>
            <motion.p
              className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto"
              variants={headerVariants}
            >
              Our platform offers a seamless experience for both clients and
              freelancers.
            </motion.p>
          </motion.div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  icon: FiSearch,
                  title: "Easy to find talent",
                  description:
                    "Our advanced search and matching algorithms help you find the perfect freelancer for your project quickly.",
                },
                {
                  icon: FiDollarSign,
                  title: "Competitive pricing",
                  description:
                    "Get high-quality work done at competitive prices. Our platform ensures fair pricing for both clients and freelancers.",
                },
                {
                  icon: FiStar,
                  title: "Quality assurance",
                  description:
                    "Our rating system and quality checks ensure you always get top-notch work from skilled professionals.",
                },
                {
                  icon: FiUsers,
                  title: "Large talent pool",
                  description:
                    "Access a diverse range of skilled freelancers from around the world, covering various industries and expertise.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={featureVariants}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="flex-shrink-0">
                    <motion.div
                      className="flex items-center justify-center h-12 w-12 rounded-md bg-brandPrimary text-black"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <feature.icon className="h-6 w-6" />
                    </motion.div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-stone-300">
                      {feature.title}
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </dd>
                  </div>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
