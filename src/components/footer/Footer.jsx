import { useRef, useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView, AnimatePresence, useAnimation } from "framer-motion";
import logo2 from "../../assets/logo2.png";
import googleIcon from "../../assets/google_icon.png";
import githubIcon from "../../assets/github_icon.png";
import xIcon from "../../assets/x_icon.png";
import linkIcon from "../../assets/linkedin_icon.png";
import emailLogo from "../../assets/email.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { amount: 0.1 });
  const [emailValue, setEmailValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoverPoint, setHoverPoint] = useState({ x: 0.5, y: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    setHoverPoint({ x, y });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailValue) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setEmailValue("");
    }
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const socialIcons = [
    { icon: googleIcon, alt: "Google", url: "#", color: "#DB4437" },
    { icon: githubIcon, alt: "GitHub", url: "#", color: "#333" },
    { icon: xIcon, alt: "X", url: "#", color: "#ffffff" },
    { icon: linkIcon, alt: "LinkedIn", url: "#", color: "#0077B5" },
  ];

  const quickLinks = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/leaderboard", label: "Leaderboard", icon: "🏆" },
    { to: "/event", label: "Events", icon: "📅" },
    { to: "/about", label: "About", icon: "ℹ️" },
    { to: "/contact", label: "Contact", icon: "📞" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden bg-black text-white border-t border-cyan-900/30"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${hoverPoint.x * 100}% ${hoverPoint.y * 100}%, rgba(8,145,178,0.2) 0%, rgba(0,0,0,0) 70%)`,
          transition: "background 0.3s ease-out"
        }}
      />

      {/* Animated Mesh Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>



      {/* Gradient Edge */}
      <div className="relative">
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 relative">
          {/* Logo & Branding Section */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-6"
          >
            <div className="relative group">
              <motion.div
                className="absolute -inset-1 rounded-full opacity-70 blur-lg group-hover:opacity-100 transition duration-700"
                style={{
                  background: `conic-gradient(from ${Date.now() / 50}deg, #0891b2, #22d3ee, #0891b2)`
                }}
                animate={{
                  filter: ["blur(10px)", "blur(15px)", "blur(10px)"]
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
              />
              <motion.div
                className="relative p-2 z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <motion.div
                  className="rounded-full overflow-hidden p-2"
                  whileHover={{ rotate: 10 }}
                >
                  <img
                    src={logo2}
                    alt="Cyber Hunter Logo"
                    className="w-36 h-36 object-contain"
                  />
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              className="text-center lg:text-left"
              variants={itemVariants}
            >
              <motion.h2
                className="text-2xl sm:text-3xl font-extrabold mb-2"
                style={{
                  WebkitTextStroke: "1px rgba(8,145,178,0.3)",
                }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-600">
                  CYBER HUNTER
                </span>
              </motion.h2>
              <motion.p
                className="text-gray-400 max-w-xs"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                Join the elite squad of digital defenders. Where hacking meets innovation.
              </motion.p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              {socialIcons.map((social, index) => (
                <motion.a
                  key={social.alt}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="absolute -inset-2 rounded-lg blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                    style={{ backgroundColor: social.color }}
                  />
                  <motion.div
                    className="relative flex items-center justify-center w-12 h-12 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden z-10"
                  >
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-b from-white via-transparent to-transparent"
                      initial={{ y: "100%" }}
                      whileHover={{ y: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <img
                      src={social.icon}
                      alt={social.alt}
                      title={social.alt}
                      className="h-6 w-6 object-contain filter drop-shadow"
                    />
                  </motion.div>
                  <motion.span
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: social.color }}
                  >
                    {social.alt}
                  </motion.span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Navigation Section - Reimagined */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 flex flex-col items-center lg:items-start"
          >
            <div className="relative mb-8">
              <motion.h3
                className="text-xl font-bold relative"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span className="relative z-10 font-mono tracking-widest text-cyan-400">
                  NAVIGATION
                </motion.span>
              </motion.h3>
              <motion.div
                className="absolute -bottom-2 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                animate={{ opacity: [0.4, 1, 0.4], width: ["30%", "100%", "30%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>

            <ul className="space-y-3 w-full">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.to}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ x: 5 }}
                  className="relative"
                >
                  <Link to={link.to} className="group block">
                    <motion.div
                      className="relative overflow-hidden  rounded-lg p-3 flex items-center  transition-all duration-300"
                    >
                      <span className="text-lg mr-3 text-cyan-500 transition-colors group-hover:text-cyan-400">
                        {link.icon}
                      </span>
                      <span className="text-gray-400 font-medium group-hover:text-cyan-300 transition-colors">
                        {link.label}
                      </span>
                      <motion.span
                        className="absolute right-3 opacity-0 group-hover:opacity-100 text-cyan-500"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Section - Futuristic */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5"
          >
            <motion.div
              className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/70 backdrop-blur-sm p-6 lg:p-8"
              whileHover={{ boxShadow: "0 0 30px rgba(8,145,178,0.15)" }}
            >
              {/* Animated Corner Accent */}
              <motion.div
                className="absolute top-0 right-0 h-16 w-16 overflow-hidden opacity-80"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                      boxShadow: ["0 0 0px rgba(6,182,212,0.5)", "0 0 20px rgba(6,182,212,0.5)", "0 0 0px rgba(6,182,212,0.5)"],
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
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      src={emailLogo}
                      alt="Email"
                      className="h-6 w-auto relative z-10"
                    />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300">Stay Connected</h3>
                    <p className="text-gray-400 text-sm">Get exclusive access to the latest updates</p>
                  </div>
                </motion.div>

                <form onSubmit={handleSubmit} className="relative z-10">
                  <div className="relative group">
                    <motion.div
                      className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full opacity-30 group-hover:opacity-100 blur transition duration-300"
                      animate={{
                        background: ["linear-gradient(to right, #0891b2, #22d3ee)", "linear-gradient(to right, #22d3ee, #0891b2)"]
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <div className="relative flex">
                      <input
                        type="email"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full  bg-gray-800 border border-gray-700 rounded-full p-4 outline-none text-gray-200 placeholder-gray-500 focus:border-cyan-500 transition-all duration-300"
                        required
                      />
                      <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                          <motion.button
                            key="subscribe"
                            type="submit"
                            className="absolute m-2 right-1 top-1 bottom-1 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-full px-6 font-medium hover:from-cyan-500 hover:to-cyan-400 transition-colors duration-300 overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            exit={{ opacity: 0, x: 20 }}
                          >
                            <span className="relative z-10">Subscribe</span>
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
                    Join 5,000+ cyber security enthusiasts who receive our weekly newsletter with insider tips, tools, and exclusive content.
                  </motion.p>

                  <motion.div
                    className="mt-6 flex flex-wrap gap-2"
                    variants={itemVariants}
                  >
                    {["Tutorials", "Challenges", "News", "Community"].map((tag, i) => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1 bg-gray-800 text-xs text-gray-300 rounded-full border border-gray-700"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "#164e63",
                          color: "#ffffff",
                          borderColor: "#0e7490"
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Copyright Section - Refined */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative border-t border-gray-800/50 py-8"
      >
        {/* Animated Light Bar */}
        <motion.div
          className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          animate={{
            backgroundPosition: ["200% 0", "-200% 0"],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <motion.p
            className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left"
            whileHover={{ color: "#22d3ee" }}
          >
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-cyan-500 font-bold">©</span>
            </motion.span>{" "}
            Copyrights 2024 |{" "}
            <motion.span
              className="relative text-cyan-500 hover:underline cursor-pointer font-medium"
              whileHover={{ color: "#fff" }}
            >
              Cyber Hunter
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-px bg-cyan-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.span>{" "}
            | All Rights Reserved
          </motion.p>

          <div className="flex space-x-8">
            {["Terms & Conditions", "Privacy Policy", "Support"].map((item, index) => (
              <motion.a
                key={item}
                whileHover={{ scale: 1.05, color: "#22d3ee" }}
                href={item === "Privacy Policy" ? "/policy" : "#"}
                className="relative text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 h-px w-full bg-cyan-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Interactive Corner Decorations */}
      <motion.div
        className="absolute bottom-0 right-0 w-32 h-32"
        initial={{ opacity: 0.3 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 100L100 0V100H0Z"
            fill="url(#cornerGradient)"
          />
          <defs>
            <linearGradient id="cornerGradient" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0891b2" stopOpacity="0.3" />
              <stop offset="1" stopColor="#0e7490" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 w-32 h-32"
        initial={{ opacity: 0.3 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", delay: 2.5 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 0H100L0 100V0Z"
            fill="url(#cornerGradient2)"
          />
          <defs>
            <linearGradient id="cornerGradient2" x1="100" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0891b2" stopOpacity="0.3" />
              <stop offset="1" stopColor="#0e7490" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </footer>
  );
};

export default Footer;