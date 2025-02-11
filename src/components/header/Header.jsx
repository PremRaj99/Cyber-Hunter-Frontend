import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaBars, FaHome, FaPhoneAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../utils/Axios";
import { toast } from "react-toastify";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../../redux/User/userSlice";
import DefaultImg from '../../assets/profile.png'
import { TbLogin, TbLogout, TbSignRight } from "react-icons/tb";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { BsGrid3X3Gap, BsPersonCircle } from "react-icons/bs";
import { IoIosAlert } from "react-icons/io";
import { MdMiscellaneousServices } from "react-icons/md";
import { PiRankingFill } from "react-icons/pi";
import { GiTrophy } from "react-icons/gi";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
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
        when: "afterChildren"
      }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  // Toggle Menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle User Dropdown
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

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
      setIsMobileView(window.innerWidth <= 768);
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
      const { data } = await axios.post(
        "/api/v1/auth/logout");
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
    }
  };


  // Mobile menu variants
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      x: 0,
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

  // Mobile menu item variants
  const mobileMenuItemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const nav = [
    {
      name: "Home",
      link: "/",
      icon: <FaHome />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IoIosAlert />,
    },
    {
      name: "Services",
      link: "/service",
      icon: <MdMiscellaneousServices />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: <FaPhoneAlt/>,
    },
    {
      name: "Leaderboard",
      link: "/leaderboard",
      icon: <PiRankingFill />,
    },
    {
      name: "Event",
      link: "/event",
      icon: <GiTrophy />,
    }
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


  // mobile image , name , points
  const [profile, setProfile] = useState({
    name: "John Doe",
    points: 120,
    profileImg: "https://your-new-image-url.com/image.jpg",
  });

  // mobile login /logout

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };


  return (
    <motion.div
      className="sticky z-40 top-0 w-full h-20 md:px-10 px-4"
      animate={controls}
      initial={{ backgroundColor: "black" }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full h-full flex justify-between items-center border-b-2 border-[#00D8FF]">
        {/* Logo */}
        <div className="text-2xl flex items-center gap-2 font-bold relative">
          <div
            className="z-10 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <span className="text-[#00D8FF]">Cyber</span>{" "}
            <span className="drop-shadow-[0px_0px_5px_#00D8FF]">Hunter</span>
          </div>
          <div className="h-40 w-40 bg-[#00D8FF] overflow-hidden absolute top-0 -translate-y-1/2 right-0 translate-x-1/4 rounded-full opacity-45 blur-2xl"></div>
        </div>

        {/* Desktop Menu */}
        <div className="md:flex items-center hidden text-stone-400 font-bold justify-center gap-4">
          {nav.map(({ name, link }) => (
            <NavLink
              key={name}
              to={link}
              className={({ isActive }) =>
                isActive ? "text-[#00D8FF]" : "hover:text-brandPrimary"
              }
            >
              {name}
            </NavLink>
          ))}
        </div>
        <div className="flex gap-6 items-center relative">
          {/* User Profile / Buttons */}
          {currentUser ? (
            <div id="user-dropdown" className="relative">
              <div
                onClick={toggleUserDropdown}
                className="md:flex hidden items-center gap-3 border rounded-full p-1 pr-2 text-gray-300 cursor-pointer hover:text-[#00D8FF] hover:border-[#00D8FF]"
                title="User Menu"
              >
                <img
                  src={
                    currentUser.profilePicture ||
                    "https://plus.unsplash.com/premium_photo-1661757403301-ae68e1f1b827?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt="Profile"
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-semibold">
                  {currentUser.name || "Anonymous"}
                </span>
              </div>

              {/* Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-black border border-[#00D8FF] rounded-lg shadow-lg z-50">
                  <div className="px-4 py-2 font-bold text-[#00D8FF] border-b border-[#00D8FF]">
                    My Account
                  </div>

                  <ul className="py-1">
                    <li
                      onClick={() => {
                        navigate("/dashboard/profile");
                        setIsUserDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-[#00D8FF]/10 cursor-pointer text-gray-300 hover:text-[#00D8FF] flex items-center"
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Profile
                    </li>
                    <li
                      onClick={() => {
                        navigate("/dashboard");
                        setIsUserDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-[#00D8FF]/10 cursor-pointer text-gray-300 hover:text-[#00D8FF] flex items-center"
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
                          d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                        />
                      </svg>
                      Dashboard
                    </li>
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

              <button
                className="px-4 py-1 hidden md:block font-semibold rounded-full text-[#00D8FF] border border-[#00D8FF] bg-transparent hover:bg-[#00D8FF] hover:text-black transition-all duration-300"
                onClick={() => navigate("/auth/login")}
              >
                <span className="flex">Signup</span>
              </button>
              <button
                className="px-4 py-1 font-semibold rounded-full  text-[#00D8FF] border border-[#00D8FF] bg-transparent hover:bg-[#00D8FF] hover:text-black"
                onClick={() => navigate("/auth/login")}
              >
                <span className="flex">Login</span>
              </button>
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
            border-l border-[#00D8FF]/20 z-50 ${isMenuOpen ? 'block' : 'hidden'}`}
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
                  <h2 className="text-xl font-bold text-white">
                    {currentUser ? currentUser.name : 'Guest'}
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
                  <motion.div
                    className="space-y-4"
                    variants={itemVariants}
                  >
                    {newNav.map(({ name2, link2, icon }) => (
                      <motion.div
                        key={name2}
                        variants={itemVariants}
                        whileHover={{ x: 10 }}
                        className=""
                      >
                        <NavLink
                          to={link2}
                          end={link2 === '/dashboard'} // Add end prop for exact matching
                          className={({ isActive }) =>
                            `block py-2 px-4 rounded-lg transition-colors duration-200 ${isActive
                              ? 'bg-[#00D8FF]/20 text-[#00D8FF]'
                              : 'text-gray-400 hover:text-[#00D8FF] hover:bg-[#00D8FF]/10'
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

                <motion.div
                  className="space-y-4"
                  variants={itemVariants}
                >
                  {nav.map(({ name, link,icon }) => (
                    <motion.div
                      key={name}
                      variants={itemVariants}
                      whileHover={{ x: 10 }}
                    >
                      <NavLink
                        to={link}
                        className={({ isActive }) =>
                          `block py-2 px-4 rounded-lg transition-colors duration-200 ${isActive
                            ? 'bg-[#00D8FF]/20 text-[#00D8FF]'
                            : 'text-gray-400 hover:text-[#00D8FF] hover:bg-[#00D8FF]/10'
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
                      navigate('/auth/login');
                      toggleMenu();
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg
                    bg-[#00D8FF]/10 text-[#00D8FF] hover:bg-[#00D8FF]/20 transition-colors duration-200"
                  >
                    <TbLogin className="w-5 h-5" />
                    <span>Login</span>
                  </button>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div >
    </motion.div>
  );
}