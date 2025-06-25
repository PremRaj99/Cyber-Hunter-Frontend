import React from "react";
import { NavLink } from "react-router-dom";
import { BsGrid3X3Gap, BsPersonCircle } from "react-icons/bs";
import { FaHome, FaPhoneAlt } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";
import { PiRankingFill } from "react-icons/pi";
import { GiTrophy } from "react-icons/gi";
import { SiFreelancer } from "react-icons/si";

export default function DesktopNavigation({ currentUser }) {
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

  return (
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

          {/* Filtered nav items (Leaderboard, Event, Contact, Freelance) */}
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
                    {React.cloneElement(item.icon, { size: 24 })}
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
  );
}
