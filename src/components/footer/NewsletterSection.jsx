import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import emailLogo from "../../assets/email.png";
import { NewsletterService } from "../../services/NewsletterService";
import { toast } from "react-toastify";

const NewsletterSection = ({ itemVariants }) => {
  const [emailValue, setEmailValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic email validation
    if (!emailValue || !emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      await NewsletterService.subscribe(emailValue);
      setIsSubmitted(true);
      toast.success("Thank you for subscribing!");
      setEmailValue("");
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error(
        error.response?.data?.message ||
        "Failed to subscribe. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div variants={itemVariants} className="lg:col-span-5">
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/70 backdrop-blur-sm p-6 lg:p-8"
        whileHover={{ boxShadow: "0 0 30px rgba(8,145,178,0.15)" }}
      >
        {/* Animated Corner Accent */}
        <motion.div
          className="absolute top-0 right-0 h-16 w-16 overflow-hidden opacity-80"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0L100 0L100 100Z" fill="rgba(8,145,178,0.3)" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-cyan-800/20 to-cyan-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <div className="relative">
          <motion.div
            className="flex items-center justify-center lg:justify-start mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="relative mr-4 bg-cyan-500/10 p-3 rounded-full overflow-hidden"
              whileHover={{ scale: 1.1 }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(6,182,212,0.5)",
                  "0 0 20px rgba(6,182,212,0.5)",
                  "0 0 0px rgba(6,182,212,0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Pulse Effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-cyan-500/30"
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <motion.img
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                src={emailLogo}
                alt="Email"
                className="h-6 w-auto relative z-10"
              />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300">
                Stay Connected
              </h3>
              <p className="text-gray-400 text-sm">
                Get exclusive access to the latest updates
              </p>
            </div>
          </motion.div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full backdrop-blur-sm bg-black/40 p-8 rounded-3xl border border-cyan-400/20 shadow-xl shadow-cyan-900/20"
          >
            <div className="relative group">
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full opacity-30 group-hover:opacity-100 blur transition duration-300"
                animate={{
                  background: [
                    "linear-gradient(to right, #0891b2, #22d3ee)",
                    "linear-gradient(to right, #22d3ee, #0891b2)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <div className="relative flex">
                <input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-full p-4 outline-none text-gray-200 placeholder-gray-500 focus:border-cyan-500 transition-all duration-300"
                  required
                />
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.button
                      key="subscribe"
                      type="submit"
                      disabled={isSubmitting}
                      className="absolute m-2 right-1 top-1 bottom-1 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-full px-6 font-medium hover:from-cyan-500 hover:to-cyan-400 transition-colors duration-300 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                      whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Subscribing...</span>
                        </div>
                      ) : (
                        <span className="relative z-10">Subscribe</span>
                      )}
                      <motion.span
                        className="absolute inset-0 bg-cyan-400 opacity-0 hover:opacity-20 transition-opacity"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: 20 }}
                      className="absolute m-2 right-1 top-1 bottom-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full px-6 font-medium flex items-center justify-center"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mr-2"
                      >
                        ✓
                      </motion.span>
                      Subscribed
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.p
              className="mt-6 text-sm text-gray-400 italic"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
            >
              Join 5,000+ cyber security enthusiasts who receive our
              weekly newsletter with insider tips, tools, and exclusive
              content.
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap gap-2"
              variants={itemVariants}
            >
              {["Tutorials", "Challenges", "News", "Community"].map(
                (tag, i) => (
                  <motion.span
                    key={tag}
                    className="px-3 py-1 bg-gray-800 text-xs text-gray-300 rounded-full border border-gray-700"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#164e63",
                      color: "#ffffff",
                      borderColor: "#0e7490",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {tag}
                  </motion.span>
                )
              )}
            </motion.div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

NewsletterSection.propTypes = {
  itemVariants: PropTypes.object.isRequired,
};

export default NewsletterSection;
