import { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const Testimonial = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const containerRef = useRef(null);

  // Sample testimonials data
  const testimonials = [
    {
      quote: "EventFlow transformed how we manage our tech conferences. The platform's real-time analytics helped us make crucial decisions during the event.",
      name: "Alexandra Chen",
      role: "Event Director",
      company: "TechSummit Global"
    },
    {
      quote: "The attendee engagement features are outstanding. We saw a 45% increase in participation and overwhelmingly positive feedback.",
      name: "Marcus Johnson",
      role: "Head of Operations",
      company: "Innovate Conferences"
    },
    {
      quote: "From ticketing to post-event surveys, EventFlow streamlined everything. What used to take my team weeks now happens seamlessly.",
      name: "Sophia Rodriguez",
      role: "Events Manager",
      company: "Enterprise Solutions"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, testimonials.length]);

  // Previous/next indices calculation
  const prevIndex = activeTestimonial === 0 ? testimonials.length - 1 : activeTestimonial - 1;
  const nextIndex = (activeTestimonial + 1) % testimonials.length;

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">

      <div className="container max-w-6xl mx-auto relative z-10" ref={containerRef}>
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-1 text-xs font-bold tracking-wider text-cyan-400 uppercase bg-cyan-900/30 rounded-full border border-cyan-500/20">
              TESTIMONIALS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
              What Event Organizers Say
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-0.5 w-24 bg-cyan-500/50 mx-auto mb-8"
          />
        </div>

        {/* Testimonial carousel */}
        <div
          className="relative mx-auto"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          {/* Main testimonial container */}
          <motion.div
            className="relative w-full overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{
              boxShadow: "0 0 30px rgba(8, 145, 178, 0.3)"
            }}
          >
            {/* Background panel */}
            <div className="relative bg-gray-900/70 backdrop-blur-lg border border-cyan-500/20 rounded-2xl overflow-hidden shadow-lg">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8">
                <div className="absolute top-0 left-0 w-0.5 h-8 bg-cyan-500/60" />
                <div className="absolute top-0 left-0 w-8 h-0.5 bg-cyan-500/60" />
              </div>
              <div className="absolute top-0 right-0 w-8 h-8">
                <div className="absolute top-0 right-0 w-0.5 h-8 bg-cyan-500/60" />
                <div className="absolute top-0 right-0 w-8 h-0.5 bg-cyan-500/60" />
              </div>
              <div className="absolute bottom-0 left-0 w-8 h-8">
                <div className="absolute bottom-0 left-0 w-0.5 h-8 bg-cyan-500/60" />
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-cyan-500/60" />
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8">
                <div className="absolute bottom-0 right-0 w-0.5 h-8 bg-cyan-500/60" />
                <div className="absolute bottom-0 right-0 w-8 h-0.5 bg-cyan-500/60" />
              </div>

              {/* Progress bar */}
              {autoPlay && (
                <motion.div
                  className="absolute top-0 left-0 h-0.5 bg-cyan-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                  key={`progress-${activeTestimonial}`}
                />
              )}

              {/* Testimonial content */}
              <div className="p-6 sm:p-10 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`testimonial-${activeTestimonial}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-center gap-8"
                  >
                    {/* Left: Avatar */}
                    <div className="shrink-0">
                      <motion.div
                        className="relative"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <motion.div
                          className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-2xl font-bold text-black relative z-10"
                          style={{
                            background: "linear-gradient(135deg, #22d3ee, #0891b2)"
                          }}
                          animate={{
                            boxShadow: [
                              "0 0 10px rgba(8, 145, 178, 0.4)",
                              "0 0 20px rgba(8, 145, 178, 0.6)",
                              "0 0 10px rgba(8, 145, 178, 0.4)"
                            ]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          {testimonials[activeTestimonial].name.charAt(0)}
                        </motion.div>

                        {/* Ring animation */}
                        <motion.div
                          className="absolute inset-0 -m-1 border border-cyan-500/30 rounded-full"
                          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.8, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </motion.div>

                      {/* Mobile name and role */}
                      <div className="mt-4 text-center md:hidden">
                        <motion.h3
                          className="font-semibold text-lg text-white"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {testimonials[activeTestimonial].name}
                        </motion.h3>

                        <motion.p
                          className="text-sm text-gray-400 mt-1"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <span>{testimonials[activeTestimonial].role}</span>
                          <span className="mx-2 text-cyan-500">·</span>
                          <span className="text-cyan-400">{testimonials[activeTestimonial].company}</span>
                        </motion.p>
                      </div>
                    </div>

                    {/* Right: Quote */}
                    <div className="flex-1">
                      {/* Quote icon */}
                      <svg
                        className="h-8 w-8 text-cyan-500/30 mb-4 hidden md:block"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>

                      <motion.p
                        className="text-lg sm:text-xl md:text-2xl text-white font-light leading-relaxed md:text-left text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        &quot;{testimonials[activeTestimonial].quote}&quot;
                      </motion.p>

                      {/* Desktop name and role */}
                      <div className="hidden md:block mt-6">
                        <motion.h3
                          className="font-medium text-xl text-white"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          {testimonials[activeTestimonial].name}
                        </motion.h3>

                        <motion.p
                          className="text-sm text-gray-400 mt-1"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          {testimonials[activeTestimonial].role}
                          <span className="mx-2 text-cyan-500">·</span>
                          <span className="text-cyan-400">{testimonials[activeTestimonial].company}</span>
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center mt-8 gap-4">
            {/* Dots navigation */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={`dot-${index}`}
                  className={`w-2.5 h-2.5 rounded-full ${index === activeTestimonial ? 'bg-cyan-500' : 'bg-gray-700'
                    }`}
                  onClick={() => setActiveTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={index === activeTestimonial ?
                    { scale: [1, 1.2, 1], boxShadow: ["0 0 0px rgba(8, 145, 178, 0)", "0 0 10px rgba(8, 145, 178, 0.5)", "0 0 0px rgba(8, 145, 178, 0)"] } :
                    {}
                  }
                  transition={index === activeTestimonial ?
                    { duration: 2, repeat: Infinity } :
                    { duration: 0.2 }
                  }
                />
              ))}
            </div>

            {/* Prev/Next buttons */}
            <div className="flex gap-3 ml-4">
              <motion.button
                className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-800 border border-cyan-500/30 text-cyan-400"
                onClick={() => setActiveTestimonial(prevIndex)}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(8, 145, 178, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              <motion.button
                className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-800 border border-cyan-500/30 text-cyan-400"
                onClick={() => setActiveTestimonial(nextIndex)}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(8, 145, 178, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;