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
      className="dContact"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        CONTACT US
      </motion.h2>
      <motion.form variants={formVariants} action="" method="post">
        <motion.input
          variants={inputVariants}
          whileHover="hover"
          type="text"
          name="fullName"
          id="fullName"
          required
          placeholder="Full Name"
        />
        <motion.input
          variants={inputVariants}
          whileHover="hover"
          type="email"
          name="email"
          id="email"
          required
          placeholder="Email-Id"
        />
        <motion.input
          variants={inputVariants}
          whileHover="hover"
          type="text"
          name="subject"
          id="subject"
          required
          placeholder="Subject"
        />
        <motion.textarea
          variants={inputVariants}
          whileHover="hover"
          name="query"
          id="query"
          cols="30"
          rows="7"
          placeholder="Describe Your Query"
        ></motion.textarea>
        <motion.button
          variants={inputVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
        >
          Send
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default DContact;
