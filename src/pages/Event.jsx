import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendar, FaUsers, FaTrophy, FaArrowRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import EventCarousel from "../components/Event/EventCarousel";


const hackathonEvents = [
  {
    id: 1,
    title: "Hackathon 2K24",
    date: "12 Dec 2024",
    description: "Join us for an exciting 24-hour coding challenge",
    participants: "500+",
    prize: "$5000",
    image:
      "https://www.shutterstock.com/shutterstock/photos/1662606928/display_1500/stock-vector-hackathon-banner-illustration-abstract-futuristic-background-with-glitch-effect-in-neon-colors-1662606928.jpg",
    status: "UPCOMING",
  },
  {
    id: 2,
    title: "Tech Innovation Challenge",
    date: "15 Jan 2025",
    description: "Build the next big thing in technology",
    participants: "300+",
    prize: "$3000",
    image:
      "https://www.shutterstock.com/shutterstock/photos/1662606928/display_1500/stock-vector-hackathon-banner-illustration-abstract-futuristic-background-with-glitch-effect-in-neon-colors-1662606928.jpg",
    status: "ON GOING",
  },
  {
    id: 3,
    title: "AI & Robotics Hackathon",
    date: "20 Feb 2025",
    description: "Push the boundaries of AI and robotics",
    participants: "400+",
    prize: "$4000",
    image:
      "https://www.shutterstock.com/shutterstock/photos/1662606928/display_1500/stock-vector-hackathon-banner-illustration-abstract-futuristic-background-with-glitch-effect-in-neon-colors-1662606928.jpg",
    status: "COMPLETED",
  },
];

export default function EventPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    document.title = "Cyber Hunter | Events";
  }, []);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const EventCard = ({ event }) => (
    <motion.div
      variants={itemVariants}
      className="group relative bg-gray-800/60 rounded-xl overflow-hidden border border-gray-700/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="aspect-video relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${event.status === "UPCOMING"
              ? "bg-cyan-400/20 text-cyan-400"
              : event.status === "ON GOING"
                ? "bg-green-400/20 text-green-400"
                : "bg-gray-400/20 text-gray-400"
              }`}
          >
            {event.status}
          </span>
          <span className="text-gray-400 text-sm">{event.date}</span>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
          {event.title}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-2">
          {event.description}
        </p>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <FaUsers className="w-4 h-4" />
            <span>{event.participants}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FaTrophy className="w-4 h-4" />
            <span>{event.prize}</span>
          </div>
        </div>

        <button
          onClick={() => setSelectedEvent(event)}
          className="w-full px-4 py-2 mt-4 bg-transparent border border-cyan-400 text-cyan-400 rounded-lg font-medium hover:bg-cyan-400 hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <span>View Details</span>
          <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="min-h-screen bg-black bg-gradient-to-br from-black via-black to-cyan-950 text-stone-300 p-4 md:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="container mx-auto max-w-7xl"
        variants={itemVariants}
      >
        <div className="flex justify-center items-center my-2">
          <span className=" border-b-2 border-white">
            <h1 className=" text-2xl md:text-3xl font-bold text-brandPrimary">
              {" "}
              Events
            </h1>
          </span>
        </div>

        <motion.div className=" my-8 " variants={containerVariants}>
          <EventCarousel />
        </motion.div>

        <div className="mb-10 border-b border-gray-700">
          <div className="flex space-x-1 justify-center items-center overflow-x-auto hide-scrollbar">
            {["upcoming", "ongoing", "completed", "all"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-4 text-sm font-medium capitalize transition-all duration-300 ${activeTab === tab
                  ? "text-cyan-400 border-b-2 border-cyan-400"
                  : "text-gray-400 hover:text-brandPrimary"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {hackathonEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </motion.div>
      </motion.div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800/90 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                {selectedEvent.title}
              </h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors"
              >
                <IoMdClose className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-48 object-cover rounded-lg"
              />

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-700/30 p-4 rounded-lg text-center">
                  <FaCalendar className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
                  <span className="text-sm text-white">
                    {selectedEvent.date}
                  </span>
                </div>
                <div className="bg-gray-700/30 p-4 rounded-lg text-center">
                  <FaUsers className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
                  <span className="text-sm text-white">
                    {selectedEvent.participants}
                  </span>
                </div>
                <div className="bg-gray-700/30 p-4 rounded-lg text-center">
                  <FaTrophy className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
                  <span className="text-sm text-white">
                    {selectedEvent.prize}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Description
                </h3>
                <p className="text-gray-400">{selectedEvent.description}</p>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-brandPrimary to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                Register Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
