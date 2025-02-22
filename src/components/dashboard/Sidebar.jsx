import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Users, User, LineChart, Bell, BookUser, Settings } from "lucide-react";
import { FaBars } from "react-icons/fa6";
import { GiCrossMark } from "react-icons/gi";

const Sidebar = ({ activeSection, onSectionChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const sidebarItems = [
    { icon: <Users className="w-6 h-6" />, text: "TEAM", section: "team" },
    { icon: <User className="w-6 h-6" />, text: "PERSONAL", section: "personal" },
    { icon: <LineChart className="w-6 h-6" />, text: "LEADERBOARD", section: "leaderboard" },
    { icon: <Bell className="w-6 h-6" />, text: "NOTIFICATION", section: "notification" },
    { icon: <BookUser className="w-6 h-6" />, text: "CONTACT", section: "contact" },
    { icon: <Settings className="w-6 h-6" />, text: "SETTINGS", section: "settings" }
  ];

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.3 }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4"
    >
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          className="text-white/30 bg-white/10 p-3 rounded-xl transition-all duration-300 hover:text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaBars className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 z-50 bg-black md:hidden ${isMenuOpen ? "block" : "hidden"
          }`}
        variants={mobileMenuVariants}
        initial="hidden"
        animate={isMenuOpen ? "visible" : "hidden"}
      >
        <div className="flex flex-col items-center pt-20 px-6 space-y-6">
          <button
            className="absolute top-8 right-8 text-brandPrimary hover:text-white transition-all"
            onClick={toggleMenu}
          >
            <GiCrossMark className="h-8 w-8" />
          </button>

          {sidebarItems.map((item) => (
            <motion.div
              key={item.section}
              className={`w-full flex items-center justify-center space-x-4 text-lg font-bold p-4 rounded-xl
                ${activeSection === item.section
                  ? "bg-brandPrimary text-black"
                  : "text-brandPrimary hover:bg-brandPrimary/20"
                }
                transition-all duration-300 cursor-pointer`}
              onClick={() => {
                onSectionChange(item.section);
                toggleMenu();
              }}
            >
              {item.icon}
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>


      {/* Desktop Menu */}
      <motion.ul className="hidden md:flex flex-col space-y-4">
        {sidebarItems.map((item) => (
          <motion.li
            key={item.section}
            onClick={() => onSectionChange(item.section)}
            className={`
              flex items-center space-x-4 cursor-pointer p-4 rounded-xl
              text-lg font-bold transition-all duration-300
              ${activeSection === item.section
                ? "bg-brandPrimary text-black"
                : "bg-black text-brandPrimary hover:bg-brandPrimary/20"
              }
              border-2 border-brandPrimary
            `}
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{item.icon}</span>
            <span>{item.text}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.aside>
  );
};

export default Sidebar;