import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();
  const navigate = useNavigate();

  // Toggle Menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#00D8FF]" : "hover:text-brandPrimary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-[#00D8FF]" : "hover:text-brandPrimary"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/service"
            className={({ isActive }) =>
              isActive ? "text-[#00D8FF]" : "hover:text-brandPrimary"
            }
          >
            Service
          </NavLink>
          <NavLink
            to="/course"
            className={({ isActive }) =>
              isActive ? "text-[#00D8FF]" : "hover:text-brandPrimary "
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/event"
            className={({ isActive }) =>
              isActive ? "text-[#00D8FF]" : "hover:text-brandPrimary "
            }
          >
            Event
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              isActive ? "text-[#00D8FF]" : "hover:text-brandPrimary "
            }
          >
            Leader Board
          </NavLink>
        </div>
        <div className="flex gap-6 items-center">
          {/* User Profile / Buttons */}
          {currentUser ? (
            <div
              className="md:flex hidden items-center gap-3 border rounded-full p-1 pr-2 text-gray-300 cursor-pointer hover:text-[#00D8FF] hover:border-[#00D8FF]"
              title="Prem Raj"
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1661757403301-ae68e1f1b827?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Profile"
                className="w-6 h-6 rounded-full"
              />
              <span className="font-semibold">
                {currentUser.name || "Anonymous"}
              </span>
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
            <motion.div variants={mobileMenuItemVariants}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-[#00D8FF]" : "hover:text-white"
                }
              >
                Home
              </NavLink>
            </motion.div>
            <motion.div variants={mobileMenuItemVariants}>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-[#00D8FF]" : "hover:text-white"
                }
              >
                Dashboard
              </NavLink>
            </motion.div>
            <motion.div variants={mobileMenuItemVariants}>
              <NavLink
                to="/service"
                className={({ isActive }) =>
                  isActive ? "text-[#00D8FF]" : "hover:text-white"
                }
              >
                Service
              </NavLink>
            </motion.div>
            <motion.div variants={mobileMenuItemVariants}>
              <NavLink
                to="/course"
                className={({ isActive }) =>
                  isActive ? "text-[#00D8FF]" : "hover:text-white"
                }
              >
                Courses
              </NavLink>
            </motion.div>
            <motion.div variants={mobileMenuItemVariants}>
              <NavLink
                to="/Event"
                className={({ isActive }) =>
                  isActive ? "text-[#00D8FF]" : "hover:text-white"
                }
              >
                Event
              </NavLink>
            </motion.div>
            <motion.div variants={mobileMenuItemVariants}>
              <NavLink
                to="/leaderboard"
                className={({ isActive }) =>
                  isActive ? "text-[#00D8FF]" : "hover:text-white"
                }
              >
                Leader Board
              </NavLink>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
