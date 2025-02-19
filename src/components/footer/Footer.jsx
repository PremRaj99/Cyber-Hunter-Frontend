import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import logo2 from "../../assets/logo2.png";
import googleIcon from "../../assets/google_icon.png";
import githubIcon from "../../assets/github_icon.png";
import xIcon from "../../assets/x_icon.png";
import linkIcon from "../../assets/linkedin_icon.png";
import emailLogo from "../../assets/email.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer ref={ref} className="flex flex-col h-auto w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col lg:flex-row justify-evenly bg-brandPrimary shadow-md box-border w-full text-left md:px-20"
      >
        <div className="flex-[2] w-full lg:w-2/3 p-4  flex lg:flex-row  md:justify-evenly">
          <motion.div
            variants={itemVariants}
            className="flex-1 flex w-full lg:w-1/2 flex-col lg:pr-0 pr-8 justify-center items-center border-black lg:border-r "
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={logo2}
              alt="logo"
              className="w-40 h-40"
            />
            <p className="text-sm my-4 text-center">Let&apos;s Hack Together</p>
            <p className="flex lg:space-x-5 space-x-2 justify-center items-center">
              {[
                { icon: googleIcon, alt: "Google" },
                { icon: githubIcon, alt: "GitHub" },
                { icon: xIcon, alt: "X" },
                { icon: linkIcon, alt: "LinkedIn" },
              ].map((social) => (
                <motion.a
                  key={social.alt}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  target="_blank"
                  className="lg:h-10 h-8 lg:w-10 w-8 p-1 border border-black hover:scale-110 duration-300 rounded-full"
                >
                  <img
                    src={social.icon}
                    alt={social.alt}
                    title={social.alt}
                    className="h-full w-full"
                  />
                </motion.a>
              ))}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex-1 flex flex-col mt-8 lg:mt-0 lg:px-20 justify-center items-center lg:items-start"
          >
            <h3 className="font-semibold uppercase text-center lg:text-left">
              Quick Links
            </h3>
            <ul className="list-['\00BB'] flex flex-col items-start gap-2 my-2">
              {[
                { to: "/", label: "Home" },
                { to: "/leaderboard", label: "Leaderboard" },
                { to: "/event", label: "Events" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <motion.li key={link.to} whileHover={{ x: 5 }}>
                  <Link
                    to={link.to}
                    className="px-2 hover:text-gray-700 hover:underline"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="flex-1 w-full lg:w-1/2 flex flex-col justify-center "
        >
          <div className="flex-col flex justify-center items-center w-11/12 text-center  mx-auto lg:mb-0 mb-4">
            <motion.img
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              src={emailLogo}
              alt=""
              className="h-10 w-auto"
            />
            <h3 className="font-medium text-2xl ">Contact Mail</h3>
            <p className="font-light text-sm py-4 text-gray-700">
              Get in touch to discover more about us! <br /> Contact us to know
              more about us...
            </p>
            <label htmlFor="email" className="flex px-16 py-2 ">
              Email Address
            </label>
            <div className="flex justify-center w-full">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="example@gmail.com"
                required
                className="w-full outline-none max-w-96 lg:w-10/12 px-2 rounded-l-lg "
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 px-4 rounded-r-lg hover:bg-green-600 text-white"
              >
                Submit
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="h-auto w-full bg-black p-4 "
      >
        <div className="flex justify-center gap-8  text-gray-300 md:text-base text-xs">
          <p>
            <span className="text-brandPrimary ">&#169;</span> Copyrights 2024 |{" "}
            <span className="text-brandPrimary hover:underline cursor-pointer">
              Cyber Hunter
            </span>
          </p>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="hover:text-white"
          >
            Terms & Conditions
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="/policy"
            className="hover:text-white"
          >
            Policies
          </motion.a>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
