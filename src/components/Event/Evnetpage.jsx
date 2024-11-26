// import React from 'react';
// import Demoproject from "../../assets/DemoProject.png"
import EventCarousel from "./EventCarousel";
import EventList from "./Listevent";
import { motion } from "framer-motion";

export default function Evnetpage() {
  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-black via-black to-cyan-950">
      {/* Main Content */}

      <main className="">
        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <EventCarousel />
        </motion.div>
        <hr className="m-10 mx-16" />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <EventList />
        </motion.div>
      </main>
    </div>
  );
}
