// import React from "react";
import { motion } from "framer-motion";
import freelancehow from "../../assets/freelance/freelancehow.png";

export default function FreelanceHow() {
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

  // Variants for step items
  const stepVariants = {
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

  // Variants for image
  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      rotate: -5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 md:mx-18">
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
                Process
              </motion.h2>
              <motion.p
                className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-brandPrimary sm:text-4xl"
                variants={headerVariants}
              >
                How FreelanceHub Works
              </motion.p>
              <motion.p
                className="mt-4 max-w-2xl text-xl text-stone-300 lg:mx-auto"
                variants={headerVariants}
              >
                Get your project done in four simple steps
              </motion.p>
            </motion.div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {[
                  {
                    step: "1",
                    title: "Post Your Project",
                    description:
                      "Describe your project in detail, including your budget and timeline.",
                  },
                  {
                    step: "2",
                    title: "Receive Proposals",
                    description:
                      "Get proposals from skilled freelancers eager to work on your project.",
                  },
                  {
                    step: "3",
                    title: "Choose a Freelancer",
                    description:
                      "Review proposals, portfolios, and ratings to select the best fit for your project.",
                  },
                  {
                    step: "4",
                    title: "Get Work Done",
                    description:
                      "Collaborate with your chosen freelancer and get your project completed.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="relative"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={stepVariants}
                    transition={{ delay: index * 0.2 }}
                  >
                    <motion.div
                      className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-white shadow text-black"
                      initial={{
                        scale: 0.8,
                        opacity: 0,
                        rotate: -20,
                      }}
                      whileInView={{
                        scale: 1,
                        opacity: 1,
                        rotate: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        },
                      }}
                      viewport={{ once: true }}
                    >
                      <span className="text-lg font-bold">{item.step}</span>
                    </motion.div>
                    <p className="ml-16 text-lg leading-6 font-medium text-brandPrimary">
                      {item.title}
                    </p>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      {item.description}
                    </dd>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <motion.div
          className="md:w-[45%] w-[90%] md:mr-4 items-center md:mt-10 mt-6 md:flex hidden"
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true, amount: 0.1 }}
          variants={imageVariants}
        >
          <img src={freelancehow} alt="Freelancer How" className="mx-auto" />
        </motion.div>
      </div>
    </div>
  );
}
