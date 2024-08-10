import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="w-full h-16 px-10 bg-black">
      <div className="w-full h-full flex justify-between items-center border-b-2 border-[#00D8FF]">
        <div className="text-2xl flex items-center gap-2 font-bold relative">
          <div className="z-10">
            <span className="text-[#00D8FF]">Cyber</span> Hunter
          </div>
          <div className="h-40 w-40 bg-[#00D8FF] absolute top-0 -translate-y-1/2 right-0 translate-x-1/4 rounded-full opacity-45 blur-md"></div>
        </div>
        <div className="flex items-center text-gray-300 justify-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#00D8FF]" : "hover:text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-[#00D8FF]" : "hover:text-white"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/service"
            className={({ isActive }) =>
              isActive ? "text-[#00D8FF]" : "hover:text-white"
            }
          >
            Service
          </NavLink>
          <NavLink
            to="/course"
            className={({ isActive }) =>
              isActive ? "text-[#00D8FF]" : "hover:text-white"
            }
          >
            Courses
          </NavLink>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button className="px-4 py-1 font-semibold rounded-full text-[#00D8FF] border border-[#00D8FF] bg-transparent hover:bg-[#00D8FF] hover:text-black">
            Signup
          </button>
          <button className="px-4 py-1 font-semibold rounded-full text-[#00D8FF] border border-[#00D8FF] bg-transparent hover:bg-[#00D8FF] hover:text-black">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
