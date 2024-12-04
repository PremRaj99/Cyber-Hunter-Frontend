import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import {
//   signOutUserStart,
//   signOutUserSuccess,
//   signOutUserFailure,
// } from "../../redux/User/userSlice"; // Adjust import path as needed

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const controls = useAnimation();
  const navigate = useNavigate();
  // const dispatch = useDispatch();

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

  // Logout handler
  const handleLogout = async () => {
    try {
      // dispatch(signOutUserStart());
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/logout`,
        {
          method: "POST",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        // dispatch(signOutUserFailure(data.message));
        return;
      }
      // dispatch(signOutUserSuccess());
      navigate("/login");
    } catch (error) {
      // dispatch(signOutUserFailure(error.message));
    }
  };

  // Mobile menu variants
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

  // Mobile menu item variants
  const mobileMenuItemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
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
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "leaderboard",
      link: "/leaderboard",
    },
  ];

  return (
    <motion.div
      className="sticky z-50 top-0 w-full h-20 md:px-10 px-4"
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
                    currentUser.avatar ||
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
                        navigate("/profile");
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
                onClick={() => navigate("/login")}
              >
                Signup
              </button>
              <button
                className="px-4 py-1 font-semibold rounded-full  text-[#00D8FF] border border-[#00D8FF] bg-transparent hover:bg-[#00D8FF] hover:text-black"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-brandPrimary focus:outline-none focus:text-brandPrimary transition-all duration-700"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <motion.div
          className={`space-y-8 px-4 mt-16 py-7 text-center list-none ${
            isMenuOpen
              ? "block fixed top-0 right-0 backdrop-blur-lg left-0 z-10 border bg-black backdrop:opacity-50"
              : "hidden"
          }`}
          variants={mobileMenuVariants}
          initial="hidden"
          animate={isMenuOpen ? "visible" : "hidden"}
        >
          <motion.div
            className="flex flex-col items-center text-gray-400 font-bold justify-center gap-4"
            variants={mobileMenuVariants}
          >
            {nav.map(({ name, link }) => (
              <motion.div key={name} variants={mobileMenuItemVariants}>
                <NavLink
                  to={link}
                  className={({ isActive }) =>
                    isActive ? "text-[#00D8FF]" : "hover:text-brandPrimary"
                  }
                >
                  {name}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
