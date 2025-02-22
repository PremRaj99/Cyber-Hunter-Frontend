import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Sparkles, ArrowLeft, X } from "lucide-react";
import { FaRocket } from "react-icons/fa";
import { IoIosPlanet } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SpaceForgotPassword = () => {
  const [isLaunched, setIsLaunched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stars, setStars] = useState([]);
  const [formdata, setFormdata] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
    }));
    setStars(newStars);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsLaunched(true);
  };

  return (
    <div className="bg-gradient-to-b  text-white relative overflow-hidden max-h-[calc(100vh-10rem)]">
      {/* Stars Background */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Nebula Effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1) 25%, transparent 50%)",
        }}
      />

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-md"
        >
          {!isLaunched ? (
            <div className="relative">
              {/* Floating Planet */}
              <motion.div
                animate={{
                  y: [-10, 10],
                  rotate: [0, 360],
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                className="absolute -top-20 -right-20 text-brandPrimary opacity-30"
              >
                <IoIosPlanet size={120} />
              </motion.div>

              <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="flex flex-col items-start">
                  <motion.button
                    onClick={() => navigate(-1)}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </motion.button>
                </div>
                <div className="text-center mb-8">
                  <motion.div
                    className="relative w-24 h-24 mx-auto mb-4"
                    animate={{
                      y: [-5, 5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <div className="absolute inset-0 bg-brandPrimary rounded-full blur-2xl opacity-20" />
                    <div className="relative h-full flex items-center justify-center">
                      <FaRocket className="w-12 h-12 text-cyan-400" />
                    </div>
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">Change Password</h2>
                  <p className="text-gray-400">
                    Enter the details to Change Your Password
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative group">
                    <motion.div className="absolute inset-0  rounded-2xl " />
                    <div className="relative flex items-center">
                      <input
                        type="password"
                        value={formdata.currentPassword}
                        onChange={(e) => setFormdata(e.target.value)}
                        placeholder="Current password"
                        className="w-full px-4 py-4 bg-white/5 text-white border border-white/10 rounded-2xl focus:outline-none focus:border-brandPrimary transition-all pl-12"
                        required
                      />
                      <Mail className="absolute left-4 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="relative group">
                    <motion.div className="absolute inset-0  rounded-2xl " />
                    <div className="relative flex items-center">
                      <input
                        type="password"
                        value={formdata.password}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="New password"
                        className="w-full px-4 py-4 bg-white/5 text-white border border-white/10 rounded-2xl focus:outline-none focus:border-brandPrimary transition-all pl-12"
                        required
                      />
                      <Mail className="absolute left-4 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="relative group">
                    <motion.div className="absolute inset-0 bg-transparent rounded-2xl " />
                    <div className="relative flex items-center">
                      <input
                        type="password"
                        value={formdata.confirmPassword}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Confirm Passowrd"
                        className="w-full px-4 py-4 bg-white/5 text-white border border-white/10 rounded-2xl focus:outline-none focus:border-brandPrimary transition-all pl-12"
                        required
                      />
                      <Mail className="absolute left-4 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-brandPrimary to-black rounded-2xl font-semibold relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-black/50 translate-y-full group-hover:translate-y-0 transition-transform" />
                    <span className="relative flex items-center justify-center gap-2">
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <AiOutlineLoading3Quarters className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <>
                          Update Password
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center backdrop-blur-xl bg-white/5 p-8 rounded-3xl border border-white/10"
            >
              {/* Success Animation */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <motion.div
                  animate={{
                    y: [-100, 0],
                    scale: [0.5, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <FaRocket className="w-12 h-12 text-cyan-400 mx-auto" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute inset-0 bg-brandPrimary rounded-full blur-2xl opacity-20"
                />
              </div>

              <h3 className="text-2xl font-bold mb-4">Password Updated</h3>
              <p className="text-gray-400 mb-6">
                Use Your New Password for login
                <br />
              </p>
              <motion.button
                onClick={() => (window.location.href = "/auth/login")}
                className="bg-brandPrimary text-gray-900 font-semibold py-3 px-6 rounded-lg  hover:bg-black hover:text-brandPrimary transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Back to Login
              </motion.button>

              {/* Particle Effects */}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                    y: [-20, 20],
                    x: [-20, 20],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                  className="absolute"
                  style={{
                    left: `${50 + (Math.random() - 0.5) * 40}%`,
                    top: `${50 + (Math.random() - 0.5) * 40}%`,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SpaceForgotPassword;
