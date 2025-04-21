import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaBars, FaHome, FaPhoneAlt } from "react-icons/fa";
import { FaAngleDown, FaXmark } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../utils/Axios";
import { toast } from "react-toastify";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../../redux/User/userSlice";
import DefaultImg from "../../assets/profile.png";
import { TbLogin, TbLogout, TbSignRight } from "react-icons/tb";
import { BsGrid3X3Gap, BsPersonCircle } from "react-icons/bs";
import { IoIosAlert } from "react-icons/io";
import { MdMiscellaneousServices } from "react-icons/md";
import { PiRankingFill } from "react-icons/pi";
import { GiTrophy } from "react-icons/gi";
import { SiFreelancer } from "react-icons/si";
import leaduserdemo from "../../assets/leaduserdemo.png";


export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const controls = useAnimation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuVariants = {
    hidden: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  // Toggle Menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle User Dropdown
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // useeffect to change document title
  useEffect(() => {
    document.title = "Login || Sign Up";
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownElement = document.getElementById("user-dropdown");
      if (dropdownElement && !dropdownElement.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        controls.start({ backgroundColor: "rgba(0, 0, 0, 1)" });
      } else {
        setIsScrolled(false);
        controls.start({ backgroundColor: "rgba(0, 0, 0, 0)" });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);
  useEffect(() => {
    const handleResize = () => {
      // Remove setIsMobileView since the state is unused
      if (window.innerWidth > 768) {
        setIsUserDropdownOpen(false); // Close dropdown on resize if it's not mobile view
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      const { data } = await axios.post("/api/v1/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (data.success) {
        dispatch(signOutUserSuccess());
        navigate("/auth/login");
        return toast.success(data.message);
      } else {
        dispatch(signOutUserFailure(data.message));
        return toast.error(data.message);
      }
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
      return toast.error(error.message);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(signOutUserSuccess());
    }
  };

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
      name: "Services",
      link: "/service",
      icon: <MdMiscellaneousServices />,
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
      className={`sticky z-40 top-0 w-full h-20 md:px-10 px-4 ${isScrolled ? "bg-black" : "bg-transparent"
        }`}
      animate={controls}
      initial={{ backgroundColor: "black" }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full h-full flex justify-between items-center border-b-2 border-[#00D8FF]">
        {/* Logo */}
        <div className="text-2xl flex items-center gap-2 font-bold relative">
          <button
            className="z-10 cursor-pointer bg-transparent border-none p-0 font-inherit"
            onClick={() => {
              navigate("/");
            }}
            aria-label="Navigate to home page"
          >
            <span className="text-[#00D8FF]">Cyber</span>{" "}
            <span className="drop-shadow-[0px_0px_5px_#00D8FF]">Hunter</span>
          </button>
          <div className="h-40 w-40 bg-[#00D8FF] overflow-hidden absolute top-0 -translate-y-1/2 right-0 translate-x-1/4 rounded-full opacity-45 blur-2xl"></div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-1">
          {currentUser ? (
            <>
              {/* Profile Link */}
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `group relative px-4 py-2 rounded-lg transition-all duration-300 ${isActive
                    ? "text-[#00D8FF]"
                    : "text-gray-400 hover:text-white"
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <BsPersonCircle size={24} />
                  <span className="relative">
                    Profile
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00D8FF] group-hover:w-full transition-all duration-300" />
                  </span>
                </div>
                <div className="absolute inset-0 bg-[#00D8FF]/0 group-hover:bg-[#00D8FF]/10 rounded-lg transition-all duration-300" />
              </NavLink>

              {/* Dashboard Link */}
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `group relative px-4 py-2 rounded-lg transition-all duration-300 ${isActive
                    ? "text-[#00D8FF]"
                    : "text-gray-400 hover:text-white"
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <BsGrid3X3Gap size={24} />
                  <span className="relative ">
                    Dashboard
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00D8FF] group-hover:w-full transition-all duration-300" />
                  </span>
                </div>
                <div className="absolute inset-0 bg-[#00D8FF]/0 group-hover:bg-[#00D8FF]/10 rounded-lg transition-all duration-300" />
              </NavLink>
              <NavLink
                to="/freelancer"
                end
                className={({ isActive }) =>
                  `group relative px-4 py-2 rounded-lg transition-all duration-300 ${isActive
                    ? "text-[#00D8FF]"
                    : "text-gray-400 hover:text-white"
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <SiFreelancer size={26} />
                  <span className="relative">
                    Freelance
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00D8FF] group-hover:w-full transition-all duration-300" />
                  </span>
                </div>
                <div className="absolute inset-0 bg-[#00D8FF]/0 group-hover:bg-[#00D8FF]/10 rounded-lg transition-all duration-300" />
              </NavLink>

              {/* Filtered nav items (Leaderboard, Event, Contact) */}
              {nav
                .filter((item) => !item.guestOnly)
                .map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.link}
                    className={({ isActive }) =>
                      `group relative px-4 py-2 rounded-lg transition-all duration-300 ${isActive
                        ? "text-[#00D8FF]"
                        : "text-gray-400 hover:text-white"
                      }`
                    }
                  >
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center justify-center">
                        {React.cloneElement(item.icon, { size: 24 })}  {/* Explicitly set icon size to 24px */}
                      </span>
                      <span className="relative">
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00D8FF] group-hover:w-full transition-all duration-300" />
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-[#00D8FF]/0 group-hover:bg-[#00D8FF]/10 rounded-lg transition-all duration-300" />
                  </NavLink>
                ))}
            </>
          ) : (
            // Guest navigation
            nav.map((item) => (
              <NavLink
                key={item.name}
                to={item.link}
                className={({ isActive }) =>
                  `group relative px-4 py-2 rounded-lg transition-all duration-300 ${isActive
                    ? "text-[#00D8FF]"
                    : "text-gray-400 hover:text-white"
                  }`
                }
              >
                <div className="flex items-center space-x-2">
                  {item.icon}
                  <span className="relative">
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00D8FF] group-hover:w-full transition-all duration-300" />
                  </span>
                </div>
                <div className="absolute inset-0 bg-[#00D8FF]/0 group-hover:bg-[#00D8FF]/5 rounded-lg transition-all duration-300" />
              </NavLink>
            ))
          )}
        </nav>

        <div className="flex items-center relative">
          {/* User Profile / Buttons */}
          {currentUser ? (
            <div id="user-dropdown" className="relative">
              <div
                onClick={toggleUserDropdown}
                className="md:flex hidden items-center gap-3 border border-[#00D8FF]/30 rounded-full p-1 pr-4 text-white cursor-pointer backdrop-blur-sm bg-black/30 hover:text-[#00D8FF] hover:border-[#00D8FF] hover:bg-[#00D8FF]/5 transform transition-all duration-300 ease-out hover:shadow-[0_0_15px_rgba(0,216,255,0.3)] group relative overflow-hidden"
                title="User Menu"
              >
                {/* Glow effect behind image */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#00D8FF]/0 via-[#00D8FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Profile Image Container */}
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-[#00D8FF] rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  />
                  <img
                    src={
                      currentUser.profilePicture || leaduserdemo
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-[#00D8FF]/50 transform transition-all duration-300 group-hover:scale-105 relative z-10"
                  />
                </div>

                {/* Username */}
                <span className="font-semibold relative"> 
                  <span className="relative z-10 group-hover:text-[#00D8FF] transition-colors duration-300">
                    {currentUser.name || " "}
                  </span>
                  <span
                    className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00D8FF] group-hover:w-full transition-all duration-300"
                  />
                </span>

                {/* Dropdown Icon with Animation */}
                <span
                  className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-y-[2px] relative z-10"
                >
                  <FaAngleDown className="text-[#00D8FF]/70 group-hover:text-[#00D8FF]" />
                </span>

                {/* Hover Animation Border */}
                <div
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00D8FF]/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
              </div>

              {/* Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-black border border-[#00D8FF] rounded-lg shadow-lg z-50">
                  <div className="px-4 py-2 font-bold text-[#00D8FF] border-b border-[#00D8FF]">
                    Log Out Account
                  </div>

                  <ul className="py-1">
                    <div className="border-t border-[#00D8FF]/20 my-1"></div>
                    <li
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-[#00D8FF]/10 cursor-pointer text-red-500 hover:text-red-400 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <motion.button
                className="group relative hidden md:flex items-center gap-2 px-6 py-2 rounded-full overflow-hidden border border-[#00D8FF]-4/30 hover:border-[#00D8FF] transition-colors duration-300"
                onClick={() => navigate("/auth/login?mode=signup")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background gradient effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00D8FF]/0 via-[#00D8FF]/10 to-[#00D8FF]/0"
                  animate={{
                    x: ["100%", "-100%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                  }}
                />

                {/* Icon and text */}
                <TbSignRight className="text-[#00D8FF] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white font-bold relative">
                  Sign Up
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00D8FF] group-hover:w-full transition-all duration-300" />
                </span>

                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-[#00D8FF]/10 blur-md" />
                </div>
              </motion.button>

              <motion.button
                className="group relative  items-center gap-2 md:px-6 md:py-2 hidden md:flex rounded-full overflow-hidden mr-4  transition-colors duration-300 border border-[#00D8FF]-4/30 hover:border-[#00D8FF]"
                onClick={() => navigate("/auth/login")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background particles */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 20%, rgba(0,216,255,0.4) 0%, transparent 10%)",
                      "radial-gradient(circle at 80% 80%, rgba(0,216,255,0.4) 0%, transparent 50%)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />

                {/* Icon and text */}
                <TbLogin className="text-brandPrimary group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-white font-bold relative">
                  Login
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brandPrimary group-hover:w-full transition-all duration-300" />
                </span>

                {/* Shine effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              </motion.button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-[#00D8FF] focus:outline-none transition-all duration-300"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Updated Mobile Menu */}
          <motion.div
            className={`fixed top-0 right-0 h-full w-full md:w-1/2 lg:w-1/3 bg-black/95 backdrop-blur-lg 
            border-l border-[#00D8FF]/20 z-50 ${isMenuOpen ? "block" : "hidden"
              }`}
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
        </div>
      </div>
    </motion.div>
  );
}
