import { FaAngleDown } from "react-icons/fa6";
import leaduserdemo from "../../assets/leaduserdemo.png";

export default function UserDropdown({
  currentUser,
  isUserDropdownOpen,
  toggleUserDropdown,
  handleLogout
}) {
  return (
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
            src={currentUser.profilePicture || leaduserdemo}
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
  );
}
