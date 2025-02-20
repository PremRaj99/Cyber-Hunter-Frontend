import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../../redux/User/userSlice";
import axios from "../../utils/Axios";
import { toast } from "react-toastify";
import {
  Home,
  Info,
  Phone,
  Trophy,
  Award,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Settings
} from "lucide-react";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = [
    { name: "Home", icon: <Home className="group-hover:stroke-[#00D8FF]" size={18} />, path: "/" },
    { name: "About", icon: <Info className="group-hover:stroke-[#00D8FF]" size={18} />, path: "/about" },
    { name: "Contact", icon: <Phone className="group-hover:stroke-[#00D8FF]" size={18} />, path: "/contact" },
    { name: "Events", icon: <Trophy className="group-hover:stroke-[#00D8FF]" size={18} />, path: "/event" },
    { name: "Leaderboard", icon: <Award className="group-hover:stroke-[#00D8FF]" size={18} />, path: "/leaderboard" }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      const { data } = await axios.post("/api/v1/auth/logout", null, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      });
      if (data.success) {
        dispatch(signOutUserSuccess());
        navigate("/auth/login");
        toast.success(data.message);
      }
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
      toast.error(error.message);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(signOutUserSuccess());
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
          ? "bg-black/40 backdrop-blur-xl border-b border-[#00D8FF]/20"
          : "bg-transparent"
        }`}
    >
      <div className="mx-auto px-4 sm:px-6 border-b border-[#00D8FF]/50">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="text-3xl font-bold relative z-10 flex items-center">
              <span className="text-[#00D8FF] mr-2">Cyber</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00D8FF] to-white">
                Hunter
              </span>
              <div className="absolute -inset-1 bg-[#00D8FF]/20 blur-lg group-hover:bg-[#00D8FF]/30 transition-all duration-500 rounded-lg" />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
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
                {/* Hover effect */}
                <div className="absolute inset-0 bg-[#00D8FF]/0 group-hover:bg-[#00D8FF]/5 rounded-lg transition-all duration-300" />
              </NavLink>
            ))}
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                <motion.button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-3 bg-[#00D8FF]/5 rounded-xl px-3 py-2 group hover:bg-[#00D8FF]/10 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={currentUser.profilePicture || "/default-avatar.png"}
                      alt="Profile"
                      className="w-8 h-8 rounded-lg object-cover border-2 border-[#00D8FF]/50 group-hover:border-[#00D8FF] transition-all duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                  </div>
                  <span className="text-gray-300 text-sm hidden sm:block group-hover:text-[#00D8FF] transition-all duration-300">
                    {currentUser.name}
                  </span>
                  <ChevronDown
                    size={16}
                    className="text-gray-400 group-hover:text-[#00D8FF] transition-all duration-300"
                  />
                </motion.button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-black/80 backdrop-blur-xl border border-[#00D8FF]/20 rounded-xl shadow-lg shadow-[#00D8FF]/10 overflow-hidden"
                    >
                      <div className="p-2 space-y-1">
                        <button
                          onClick={() => {
                            navigate("/dashboard/profile");
                            setDropdownOpen(false);
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-300 rounded-lg hover:text-[#00D8FF] hover:bg-[#00D8FF]/10 transition-all duration-200"
                        >
                          <User size={16} className="mr-2" />
                          Profile
                        </button>
                        <button
                          onClick={() => {
                            navigate("/dashboard");
                            setDropdownOpen(false);
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-300 rounded-lg hover:text-[#00D8FF] hover:bg-[#00D8FF]/10 transition-all duration-200"
                        >
                          <Settings size={16} className="mr-2" />
                          Dashboard
                        </button>
                        <div className="h-px bg-gradient-to-r from-transparent via-[#00D8FF]/20 to-transparent my-1" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-3 py-2 text-sm text-red-400 rounded-lg hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                        >
                          <LogOut size={16} className="mr-2" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/auth/login")}
                  className="px-4 py-2 text-sm font-medium text-[#00D8FF] border border-[#00D8FF]/50 rounded-xl hover:border-[#00D8FF] hover:bg-[#00D8FF]/10 transition-all duration-300"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/auth/register")}
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-black bg-[#00D8FF] rounded-xl hover:bg-[#00D8FF]/90 transition-all duration-300"
                >
                  Sign Up
                </motion.button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative p-2 text-[#00D8FF] hover:text-[#00D8FF]/80 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
              <div className="absolute inset-0 bg-[#00D8FF]/10 blur-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-[#00D8FF]/20"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="px-4 py-6 space-y-2"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${isActive
                        ? "text-[#00D8FF] bg-[#00D8FF]/10"
                        : "text-gray-400 hover:text-[#00D8FF] hover:bg-[#00D8FF]/5"
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;