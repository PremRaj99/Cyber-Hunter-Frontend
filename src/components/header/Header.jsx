import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../utils/Axios";
import { toast } from "react-toastify";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../../redux/User/userSlice";
import Logo from "./Logo";
import DesktopNavigation from "./DesktopNavigation";
import UserDropdown from "./UserDropdown";
import AuthButtons from "./AuthButtons";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";


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
        <Logo />

        {/* Desktop Menu */}
        <DesktopNavigation currentUser={currentUser} />

        <div className="flex items-center relative">
          {/* User Profile / Buttons */}
          {currentUser ? (
            <UserDropdown
              currentUser={currentUser}
              isUserDropdownOpen={isUserDropdownOpen}
              toggleUserDropdown={toggleUserDropdown}
              handleLogout={handleLogout}
            />
          ) : (
            <AuthButtons />
          )}

          {/* Mobile Menu Button */}
          <MobileMenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

          {/* Mobile Menu */}
          <MobileMenu
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            currentUser={currentUser}
            handleLogout={handleLogout}
            menuVariants={menuVariants}
            itemVariants={itemVariants}
          />
        </div>
      </div>
    </motion.div>
  );
}
