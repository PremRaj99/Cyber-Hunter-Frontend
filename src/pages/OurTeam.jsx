import { motion } from "framer-motion";
import CoreTeam from "../components/OurTeam/CoreTeam";
import OurMembers from "../components/OurTeam/OurMembers";
import Collaborators from "../components/OurTeam/Collaborators";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const OurTeam = () => {

  return (
    <>

      <motion.div
        initial="hidden"
        animate="visible"
        className="min-h-screen bg-gradient-to-br py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h1
            variants={sectionVariants}
            className="text-4xl font-extrabold text-brandPrimary text-center mb-12"
          >
            <span className="border-b-2 border-cyan-400">Our Amazing Team</span>
          </motion.h1>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <CoreTeam />
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <OurMembers />
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Collaborators />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default OurTeam;
