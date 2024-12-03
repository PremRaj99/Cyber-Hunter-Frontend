// import React from "react";
import { motion } from "framer-motion";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Sidebar = ({ activeSection, onSectionChange }) => {

  const sidebarItems = [
    { icon: <GroupsIcon />, text: "TEAM", section: "team" },
    { icon: <PersonIcon />, text: "PERSONAL", section: "personal" },
    {
      icon: <LeaderboardOutlinedIcon />,
      text: "LEADERBOARD",
      section: "leaderboard",
    },
    {
      icon: <CampaignOutlinedIcon />,
      text: "NOTIFICATION",
      section: "notification",
    },
    { icon: <ContactsOutlinedIcon />, text: "CONTACT", section: "contact" },
    { icon: <SettingsOutlinedIcon />, text: "SETTINGS", section: "settings" },
  ];

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
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.ul>
        {sidebarItems.map((item) => (
          <motion.li
            key={item.section}
            onClick={() => onSectionChange(item.section)}
            className={activeSection === item.section ? "dActive" : ""}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            {item.icon}
            {item.text}
          </motion.li>
        ))}
      </motion.ul>
    </motion.aside>
  );
};

export default Sidebar;
