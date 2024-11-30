import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from "framer-motion";

const hackathonEvents = [
  {
    id: 1,
    title: 'Hackathon 2K24',
    date: '12 Dec 2024',
    image: 'https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D',
    status: 'UPCOMING'
  },
  {
    id: 2,
    title: 'Tech Innovation Challenge',
    date: '15 Jan 2025',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGFja2F0aG9ufGVufDB8fDB8fHww',
    status: 'ON GOING'
  },
  {
    id: 3,
    title: 'AI & Robotics Hackathon',
    date: '20 Feb 2025',
    image: 'https://images.unsplash.com/photo-1580927962941-25a36bbdef9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhY2thdGhvbnxlbnwwfDB8fDB8fHww',
    status: 'COMPLETED'
  }
];

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('UPCOMING');

  // Auto-scroll effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % hackathonEvents.length
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % hackathonEvents.length
    );
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? hackathonEvents.length - 1 : prevIndex - 1
    );
  }, []);

  // Filter events
  // const filteredEvents = hackathonEvents.filter(
  //   event => activeFilter === 'ALL' || event.status === activeFilter
  // );

  // Render current event
  const currentEvent = hackathonEvents[currentIndex];

  return (
    <div className="">
      <main className="container mx-auto px-4 md:px-8 mt-8">
        {/* Carousel Section */}
        <div className="relative">
          {/* Carousel Item */}
          <div className="rounded-xl overflow-hidden relative">
            <img
              src={currentEvent.image}
              alt={currentEvent.title}
              className="w-full h-[400px] object-cover brightness-75 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h2 className="text-brandPrimary text-xl md:text-4xl font-bold mb-2">
                {currentEvent.title}
              </h2>
              <p className=" mb-4">{currentEvent.date}</p>
              <div className="space-x-4">
                <button className="bg-brandPrimary text-sm text-black hover:text-brandPrimary hover:border-brandPrimary hover:border font-bold px-4 py-2 rounded hover:bg-black transition">
                  View details
                </button>
                <button className="bg-transparent border font-bold text-sm border-brandPrimary text-brandPrimary px-4 py-2 rounded hover:bg-brandPrimary hover:text-black transition">
                  Register
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Navigation */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-brandPrimary hover:text-white transition border-2 rounded-full bg-gray-400/20"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-brandPrimary border-2 rounded-full bg-gray-400/20 hover:text-white transition"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {hackathonEvents.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-brandPrimary" : "bg-white opacity-50"
                }`}
                onClick={() => setCurrentIndex(index)}
              ></button>
            ))}
          </div>
        </div>

        {/* Filter Buttons */}
        <motion.div
          className="flex justify-center space-x-4 mt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: -0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {["UPCOMING", "ON GOING", "COMPLETED"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                px-4 py-1 text-sm rounded-full overflow-hidden transition
                ${
                  activeFilter === filter
                    ? "bg-brandPrimary text-black"
                    : "border border-brandPrimary text-brandPrimary hover:bg-brandPrimary hover:text-black"
                }
              `}
            >
              {filter}
            </button>
          ))}
        </motion.div>
      </main>
    </div>
  );
}