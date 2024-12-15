// import React from "react";
import { motion } from "framer-motion";

const DContact = () => {
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={formVariants}
      className="dContact h-full"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-cyan-400 mb-6 text-center"
      >
        CONTACT US
      </motion.h2>
      <motion.form variants={formVariants} action="" method="post" className="flex flex-col items-center gap-8 w-full">
        <motion.input
          variants={inputVariants}
          whileHover="hover"
          type="text"
          name="fullName"
          id="fullName"
          required
          placeholder="Full Name"
          className="w-full border-2 border-cyan-400 rounded-2xl pl-8 bg-black text-white placeholder-gray-400"
        />
        <motion.input
          variants={inputVariants}
          whileHover="hover"
          type="email"
          name="email"
          id="email"
          required
          placeholder="Email-Id"
          className="w-full border-2 border-cyan-400 rounded-2xl pl-8 bg-black text-white placeholder-gray-400"
        />
        <motion.input
          variants={inputVariants}
          whileHover="hover"
          type="text"
          name="subject"
          id="subject"
          required
          placeholder="Subject"
          className="w-full border-2 border-cyan-400 rounded-2xl pl-8 bg-black text-white placeholder-gray-400"
        />
        <motion.textarea
          variants={inputVariants}
          whileHover="hover"
          name="query"
          id="query"
          cols="30"
          rows="7"
          placeholder="Describe Your Query"
          className="w-full border-2 border-cyan-400 rounded-2xl pl-8 bg-black text-white placeholder-gray-400"
        ></motion.textarea>
        <motion.button
          variants={inputVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-black text-cyan-400 font-semibold border-2 border-cyan-400 rounded-full px-10 py-2  text-lg uppercase"
        >
          Send
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default DContact;
