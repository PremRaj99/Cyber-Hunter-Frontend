import { useState } from "react";
import { X } from "lucide-react";
import { FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Modal component with improved animations and responsiveness
const ChangeEmailModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Modal variants for smooth animations
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: "-50%",
      x: "-50%",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: "-50%",
      x: "-50%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: "-50%",
      x: "-50%",
      transition: {
        duration: 0.2,
      },
    },
  };

  // Backdrop variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
    exit: { opacity: 0 },
  };
  
  return (
    <div>
      {/* Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Change Email
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-md"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-brandPrimary rounded-xl shadow-2xl p-6 relative">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Modal Title */}
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                  Change Email Address
                </h2>

                <div>
                  <div className="flex justify-center mb-4">
                    <FaEnvelope className="w-32 h-32 text-black  p-2 " />
                  </div>
                  {/* Modal Description */}
                  <p className="text-sm text-gray-600 text-center mb-4 ">
                    Enter your email address and we will send you an OTP to verify your identity.
                  </p>
                </div>

                {/* Email Change Form */}
                <form className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Example@gmail.com"
                      className="w-full rounded-md bg-black px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => console.log("Send OTP clicked")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-brandPrimary px-3 py-1 text-sm text-black font-bold hover:bg-black hover:text-white hover:border-2 border-brandPrimary transition-all"
                    >
                      Send OTP
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Enter OTP"
                      className="w-full rounded-md bg-black px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => console.log("Verify clicked")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-[#4CAF50] px-3 py-1 text-sm text-black hover:bg-black hover:text-white hover:border-2 border-[#4CAF50] transition-all"
                    >
                      Verify
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChangeEmailModal;
