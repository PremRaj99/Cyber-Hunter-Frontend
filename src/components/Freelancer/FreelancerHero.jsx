// import React from "react";
import PropTypes from "prop-types";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import freelancerhero from "../../assets/freelance/freelancerhero.png";
import { Link } from "react-router-dom";

export default function FreelancerHero() {
  const { scrollYProgress } = useScroll();

  // Enhanced variants with more dynamic and smooth transitions
  const imageVariants = {
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
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        delay: 0.2,
        duration: 0.8,
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
        delay: 0.4,
        duration: 0.6,
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
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  // Improved parallax effect with smoother transformation
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -50], {
    clamp: false,
  });

  return (
    <div className=" lg:min-h-screen flex flex-col p-6">
      <AnimatePresence>
        <main className="">
          <section className="">
            <div className="container flex flex-col md:flex-row items-center justify-end">
              <motion.div
                className="md:w-[90%] w-[90%] md:mr-4 flex items-center md:mt-10 mt-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={imageVariants}
                style={{ y: yOffset }}
              >
                <motion.img
                  src={freelancerhero}
                  alt="Freelancer Hero"
                  className="mx-auto"
                  whileHover={{
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 },
                  }}
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={textVariants}
              >
                <motion.h1
                  className="text-4xl md:text-5xl md:leading-normal text-white font-bold mb-4 z-10"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: 0.5,
                    },
                  }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  Welcome to <span className="text-cyan-400">Cyber Hunter</span>{" "}
                  FreelanceHub
                </motion.h1>
                <motion.p
                  className="text-lg text-white mb-8"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: 0.6,
                    },
                  }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  Connect, collaborate, and complete projects with top
                  freelancers
                </motion.p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <motion.div
                    className="rounded-md shadow"
                    initial="hidden"
                    whileInView="visible"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      to="/freelancer/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-brandPrimary hover:bg-black hover:text-white hover:border-brandPrimary hover:border md:py-4 md:text-lg md:px-10 hover:transition-all hover:duration-500"
                    >
                      Get started
                    </Link>
                  </motion.div>
                  <motion.div
                    className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3"
                    initial="hidden"
                    whileInView="visible"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      to="/freelancer"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-black hover:border hover:border-white hover:text-white md:py-4 md:text-lg md:px-10"
                    >
                      Learn more
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </AnimatePresence>
    </div>
  );
}

// PropTypes and WorkStep component remain unchanged
WorkStep.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

function WorkStep({ title, description }) {
  return (
    <div className="text-center">
      <h3 className="text-xl text-stone-100 font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
