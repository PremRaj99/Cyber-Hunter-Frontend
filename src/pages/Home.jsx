// File Imports
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// file imports
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Service from "../components/home/Service";
import Team from "../components/home/Team";
import Contact from "../components/home/Contact";
import Preloader from "../components/Common/Preloader";


const Home = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust this value to control how long the preloader is shown

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  // main home section
  return (
    <>
      <div className="bg-black m-0 p-0 w-dvw">
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }} // Trigger when 20% of the section is visible
          transition={{ duration: 0.5 }}
        >
          <Hero />
        </motion.section>
        <hr className="mt-11" />
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }} // Trigger on every scroll
          transition={{ duration: 0.5 }}
        >
          <About />
        </motion.section>
        <hr className="mt-11" />
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <Service />
        </motion.section>
        <hr className="mt-11" />
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <Team />
        </motion.section>
        <hr className="mt-11" />
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <Contact />
        </motion.section>
      </div>{" "}
    </>
  );
};

export default Home;
