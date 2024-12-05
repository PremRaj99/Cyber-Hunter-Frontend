// import React from "react";
import { motion } from "framer-motion";

const NotificationItem = ({ notification, onclick }) => {
  return (
    <motion.li
      onClick={onclick}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 300,
      }}
      
    >
      <p className="text-bold text-black-400 text-base">{notification.message.slice(0, 17)}</p>
    </motion.li>
  );
};

export default NotificationItem;
