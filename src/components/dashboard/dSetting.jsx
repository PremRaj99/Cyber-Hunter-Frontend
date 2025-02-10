// import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";

const DSetting = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="dSetting"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-cyan-400 mb-8 text-center"
      >
        SETTINGS
      </motion.h2>
      <motion.ul variants={containerVariants} className="w-full max-w-md flex flex-col items-center gap-14 m-auto mt-16">
        {[
          {
            to: "/dashboard/profile/setting",
            icon: <BsPersonCircle />,
            text: "Profile Settings",
          },
          {
            to: "/dashboard/team/teamsetting",
            icon: <MdGroups />,
            text: "Team Settings",
          },
          {
            to: "/accountSetting",
            icon: <FiSettings />,
            text: "Account Settings",
          },
        ].map((item, index) => (
          <motion.li key={index} variants={itemVariants} whileHover="hover" className="w-full py-3 px-10 border-4 border-dashed border-black rounded-2xl  text-white">
            <Link to={item.to} className="flex items-center text-xl font-medium capitalize text-white gap-0">
              {item.icon}
              {item.text}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default DSetting;
