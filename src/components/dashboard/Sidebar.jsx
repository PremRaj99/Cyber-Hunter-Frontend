import {useState} from "react";
import { motion } from "framer-motion";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const Sidebar = ({ activeSection, onSectionChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const sidebarItems = [
    { icon: <GroupsIcon  />, text: "TEAM", section: "team" },
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


  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };




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

      <div className="md:hidden ">
        <button
          className="text-cyan-400 transition-all duration-300 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "" : <FaBars className="h-6 w-6" />}
        </button>
      </div>





      {/* Mobile Menu */}
      <motion.div
        className={`space-y-8 px-4 py-12 text-center list-none fixed inset-0 z-20 bg-black bg-opacity-80 md:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
        variants={mobileMenuVariants}
        initial="hidden"
        animate={isMenuOpen ? "visible" : "hidden"}
      >
        {/* Close Button */}
        <button
          className="absolute top-24 left-8 text-gray-400 hover:text-white transition-all"
          onClick={toggleMenu}
        >
          <FaXmark className="h-6 w-6" />
        </button>




        

        {/* Menu Items */}
        {sidebarItems.map((item) => (
          <motion.div
            key={item.section}
            className={`flex items-center justify-center text-gray-400 font-bold cursor-pointer p-2 rounded-lg transition-all ${activeSection === item.section ? "dActive" : ""}`}
            onClick={() => {
              onSectionChange(item.section);
              toggleMenu();
            }}
          >
            {item.icon}
            {/* <Icon className="mr-2" /> */}
            {item.text}
          </motion.div>
        ))}
      </motion.div>







      {/* Desktop Menu */}
      <motion.ul className="hidden md:flex flex-col space-y-7">
        {sidebarItems.map((item) => (
          <motion.li
            key={item.section}
            onClick={() => onSectionChange(item.section)}
            className={`flex items-center cursor-pointer p-2 rounded-2xl border-2 border-cyan-400 text-cyan-400 font-semibold transition-all text-[1.2rem] ${activeSection === item.section ? "dActive" : ""}`}
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
