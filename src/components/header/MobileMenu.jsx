import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaPhoneAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { TbLogin, TbLogout } from "react-icons/tb";
import { BsGrid3X3Gap, BsPersonCircle } from "react-icons/bs";
import { IoIosAlert } from "react-icons/io";
import { PiRankingFill } from "react-icons/pi";
import { GiTrophy } from "react-icons/gi";
import { SiFreelancer } from "react-icons/si";
import DefaultImg from "../../assets/profile.png";

export default function MobileMenu({
  isMenuOpen,
  toggleMenu,
  currentUser,
  handleLogout,
  menuVariants,
  itemVariants
}) {
  const navigate = useNavigate();

  const nav = [
    {
      name: "Home",
      link: "/",
      icon: <FaHome />,
      guestOnly: true,
    },
    {
      name: "About",
      link: "/about",
      icon: <IoIosAlert />,
      guestOnly: true,
    },
    {
      name: "Leaderboard",
      link: "/leaderboard",
      icon: <PiRankingFill />,
      guestOnly: false,
    },
    {
      name: "Event",
      link: "/event",
      icon: <GiTrophy />,
      guestOnly: false,
    },
    {
      name: "Freelance",
      link: "/freelancer",
      icon: <SiFreelancer />,
      guestOnly: false,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: <FaPhoneAlt />,
      guestOnly: false,
    },
  ];

  const newNav = [
    {
      name2: "Profile",
      link2: "/dashboard/profile",
      icon: <BsPersonCircle />,
    },
    {
      name2: "Dashboard",
      link2: "/dashboard",
      icon: <BsGrid3X3Gap />,
    },
  ];

  return (
    <motion.div
      className={`fixed top-0 right-0 h-full w-full md:w-1/2 lg:w-1/3 bg-black/95 backdrop-blur-lg 
      border-l border-[#00D8FF]/20 z-50 ${isMenuOpen ? "block" : "hidden"}`}
      variants={menuVariants}
      initial="hidden"
      animate={isMenuOpen ? "visible" : "hidden"}
    >
      {/* Close Button */}
      <motion.button
        className="absolute top-4 right-4 p-2 rounded-full bg-[#00D8FF]/10 text-[#00D8FF]
        hover:bg-[#00D8FF]/20 transition-colors duration-200 z-50"
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ rotate: 0 }}
        animate={{ rotate: isMenuOpen ? 180 : 0 }}
      >
        <FaXmark className="w-6 h-6" />
      </motion.button>

      <div className="h-full flex flex-col p-6 overflow-y-auto">
        {/* Profile Section */}
        <motion.div
          className="flex flex-col items-center space-y-4 py-8"
          variants={itemVariants}
        >
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-[#00D8FF] ring-offset-2 ring-offset-black">
              {currentUser ? (
                <img
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  src={currentUser.profilePicture || DefaultImg}
                  alt={`${currentUser.name}'s profile`}
                  draggable="false"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl text-[#00D8FF]">G</span>
                </div>
              )}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-bold text-white mb-4">
              {currentUser ? currentUser.name : "Guest"}
            </h2>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#00D8FF]/10 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#00D8FF] animate-pulse" />
              <span className="text-[#00D8FF]">
                {currentUser ? currentUser.points || 0 : 0} Points
              </span>
            </div>
          </div>
        </motion.div>

        {/* Navigation Links */}
        <div className="flex-1 space-y-6">
          {currentUser && (
            <motion.div className="space-y-4" variants={itemVariants}>
              {newNav.map(({ name2, link2, icon }) => (
                <motion.div
                  key={name2}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className=""
                >
                  <NavLink
                    to={link2}
                    end={link2 === "/dashboard"} // Add end prop for exact matching
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded-lg transition-colors duration-200 ${isActive
                        ? "bg-[#00D8FF]/20 text-[#00D8FF]"
                        : "text-gray-400 hover:text-[#00D8FF] hover:bg-[#00D8FF]/10"
                      }`
                    }
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center gap-4 space-x-2">
                      {icon}
                      {name2}
                    </div>
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="h-px bg-gradient-to-r from-transparent via-[#00D8FF]/20 to-transparent" />

          <motion.div className="space-y-4" variants={itemVariants}>
            {nav.map(({ name, link, icon }) => (
              <motion.div
                key={name}
                variants={itemVariants}
                whileHover={{ x: 10 }}
              >
                <NavLink
                  to={link}
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded-lg transition-colors duration-200 ${isActive
                      ? "bg-[#00D8FF]/20 text-[#00D8FF]"
                      : "text-gray-400 hover:text-[#00D8FF] hover:bg-[#00D8FF]/10"
                    }`
                  }
                  onClick={toggleMenu}
                >
                  <div className="flex items-center gap-4 space-x-2">
                    {icon}
                    {name}
                  </div>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Login/Logout Button */}
        <motion.div
          className="pt-6 border-t border-[#00D8FF]/20"
          variants={itemVariants}
        >
          {currentUser ? (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg
              bg-red-500/10 text-red-500 hover:bg-red-500/50 hover:text-black transition-colors duration-200"
            >
              <TbLogout className="w-5 h-5" />
              <span>Logout</span>
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/auth/login?mode=signup");
                toggleMenu();
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg
              bg-[#00D8FF]/10 text-[#00D8FF] hover:bg-[#00D8FF]/20 transition-colors duration-200"
            >
              <TbLogin className="w-5 h-5" />
              <span>Sign Up</span>
            </button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
