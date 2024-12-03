// import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

const DTeam = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="dTeam"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        TEAM
      </motion.h2>

      <motion.ul>
        {[
          {
            icon: <AddCircleRoundedIcon />,
            text: "ADD PROJECT",
            path: "/addProject",
          },
          {
            icon: <VisibilityOutlinedIcon />,
            text: "VIEW PROJECT",
            path: "/viewProject",
          },
          {
            icon: <VerifiedOutlinedIcon style={{ color: "#06db62" }} />,
            text: "VERIFY ACHIEVEMENT",
            path: "/verifyachievement",
          },
          {
            icon: <ChatBubbleIcon />,
            text: "COMMENT",
            path: "/comment",
          },
          {
            icon: <SettingsIcon />,
            text: "TEAM MANAGEMENT",
            path: "/teamManagement",
          },
        ].map((item, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={item.path}>
              {item.icon}
              {item.text}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default DTeam;
