// import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Eventdetails() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-10 bg-black p-2 md:p-8 flex items-center justify-center"
    >
      <div className="w-full max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, z: 50 }}
          animate={{ opacity: 1, z: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-bold text-cyan-400 text-center mb-8 md:mb-8"
        >
          <span className="border-b-2 border-cyan-400">Event Detail</span>
        </motion.h2>
        <div className="rounded-lg overflow-hidden">
          {/* Event Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[200px] sm:h-[300px] md:h-[400px] w-full"
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D?height=400&width=800"
              alt="Event banner showing a conference speaker"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Event Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 rounded-lg bg-gray-700/50 p-6 backdrop-blur"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-4">
                {/* Event Title */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="space-y-1"
                >
                  <span className="text-cyan-400">Event Name : </span>
                  <span className="text-white text-xl md:text-2xl font-semibold">
                    Code fest
                  </span>
                </motion.div>

                {/* Event Rules */}
                <ul className="space-y-2 text-white">
                  {[
                    "Upto 5 Members can Participate",
                    "2000/- cash Prize",
                    "Rules Should be followed",
                  ].map((rule, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-400"></div>
                      {rule}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                {/* Date */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-right"
                >
                  <span className="text-cyan-400">Date : </span>
                  <span className="text-white">15 Aug ,2024</span>
                </motion.div>

                {/* Register Button */}
                <Link to="/eventdetail">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="w-full md:w-auto px-4 py-2 bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors rounded"
                  >
                    Register
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
