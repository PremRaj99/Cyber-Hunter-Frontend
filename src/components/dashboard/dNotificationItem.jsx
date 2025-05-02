/* eslint-disable react/prop-types */
// import React from "react";
import { motion } from "framer-motion";

const NotificationItem = ({ notification, onclick }) => {


  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };


  return (
    <motion.li
      variants={itemVariants}
      onClick={onclick}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      viewport={{ once: true }}
      className="p-4 bg-gray-800 rounded-2xl cursor-pointer py-2 px-4"
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 300,
      }}
      
    >
      <p className="text-bold text-white text-base">{notification.message.slice(0, 17)}</p>
    </motion.li>
  );
};

export default NotificationItem;
