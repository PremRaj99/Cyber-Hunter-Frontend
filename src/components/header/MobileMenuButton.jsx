import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function MobileMenuButton({ isMenuOpen, toggleMenu }) {
  return (
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
  );
}
