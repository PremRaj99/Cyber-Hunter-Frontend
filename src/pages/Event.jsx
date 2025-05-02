import { useRef, useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Testimonial from "../components/home/Testimonial";

export default function EventManagementLanding() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Section refs
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const mainContainerRef = useRef(null);

  // Track section visibility
  const heroInView = useInView(heroRef, { once: false, amount: 0.2 });
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.2 });
  const howItWorksInView = useInView(howItWorksRef, { once: false, amount: 0.2 });
  // const testimonialsInView = useInView(testimonialsRef, { once: false, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.2 });

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / windowHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Parallax background effect
  const { scrollYProgress } = useScroll();
  // const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const rotateProgress = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // Testimonials
  const testimonials = [
    {
      quote: "EventFlow transformed how we manage our annual conference. The platform is intuitive and the analytics are game-changing.",
      name: "Sarah Johnson",
      role: "Conference Director",
      company: "TechSummit"
    },
    {
      quote: "The registration process is seamless, and our attendees love the mobile experience. It's made our events much more professional.",
      name: "Michael Chen",
      role: "Event Manager",
      company: "Global Meetups"
    },
    {
      quote: "We've increased ticket sales by 40% since switching to EventFlow. The marketing tools are powerful yet easy to use.",
      name: "Jessica Williams",
      role: "Marketing Director",
      company: "Creative Workshops"
    }
  ];

  // Mouse parallax effect for hero elements
  // FIX: Instead of using state directly, create motion values from state
  const mouseX = useTransform(() => mousePosition.x || 0);
  const mouseY = useTransform(() => mousePosition.y || 0);

  // FIX: Create motion transforms correctly
  const moveX = useTransform(
    mouseX,
    [0, window.innerWidth || 1000],
    [-15, 15]
  );

  const moveY = useTransform(
    mouseY,
    [0, window.innerHeight || 800],
    [-15, 15]
  );

  return (
    <div
      ref={mainContainerRef}
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-black">
        <motion.div
          className="h-full bg-cyan-500"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Grid pattern */}


        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-20 left-1/4 w-96 h-96 rounded-full bg-cyan-500/30 blur-[150px]"
          style={{ y: moveY, x: moveX }}
        />
        <motion.div
          className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-cyan-500/20 blur-[120px]"
          style={{ y: parallaxY1 }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full bg-cyan-500/20 blur-[180px]"
          style={{ y: parallaxY2 }}
        />

        {/* Rotating elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] border border-cyan-500/10 rounded-full opacity-20"
          style={{ rotate: rotateProgress }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] border border-cyan-500/5 rounded-full opacity-10"
          style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -180]) }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 pt-20 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Floating accent shapes */}
        <motion.div
          className="absolute top-1/4 left-10 w-12 h-12 border-2 border-cyan-500/30 rounded-lg"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            y: [0, -10, 0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-8 h-8 bg-cyan-500/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1, 0.8, 1],
            y: [0, 15, 0, -15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <motion.div
            className="order-2 lg:order-1 text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="mb-6 inline-block overflow-hidden"
              initial={{ width: 0 }}
              animate={heroInView ? { width: "auto" } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-sm font-bold py-1 px-3 rounded-full bg-cyan-500/20 text-cyan-500 tracking-wide">
                EVENT MANAGEMENT PLATFORM
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="block">Organize Events</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-500">With Confidence</span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-300 mb-10 max-w-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The all-in-one platform that makes event planning seamless,
              from registration to post-event analytics.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.button
                className="group relative px-8 py-3 rounded-lg overflow-hidden font-bold text-black bg-cyan-500 transition-all duration-300 hover:cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/organizer/login")}
              >
                <span className="relative z-10">Create Your Event</span>
              </motion.button>

              <motion.button
                className="group relative px-8 py-3 rounded-lg overflow-hidden font-medium border border-white/20 hover:border-cyan-500/50 transition-all duration-300"
                onClick={() => navigate("/event")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 group-hover:text-cyan-500 transition-colors duration-300">Explore Events</span>
                <span className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative">
              {/* Glowing outline */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/50 to-blue-500/50 opacity-75 blur-lg"></div>

              {/* Dashboard image */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black">
                <motion.div
                  className="w-full aspect-video overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="https://i.ibb.co/Dfm1NMpb/Screenshot-2025-02-21-164657.png"
                    alt="Event Management Dashboard"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </motion.div>

                {/* Floating UI elements */}
                <motion.div
                  className="absolute top-6 right-6 p-3 bg-black/80 backdrop-blur-md rounded-lg border border-white/10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs font-medium">Live Event</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-6 left-6 p-3 bg-black/80 backdrop-blur-md rounded-lg border border-white/10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    <span className="text-xs font-medium">3.5K+ Attendees</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="flex flex-col items-center">
            <span className="text-xs mb-2 tracking-widest">SCROLL</span>
            <div className="w-0.5 h-12 bg-gradient-to-b from-white to-transparent"></div>
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 overflow-hidden">
        {/* Divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Events Hosted" },
              { number: "1M+", label: "Attendees" },
              { number: "150+", label: "Countries" },
              { number: "99%", label: "Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Glowing accent */}
                <div className="absolute -inset-1 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-md"></div>
                </div>
                <div className="relative z-10 p-4 rounded-xl">
                  <p className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">
                    {stat.number}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={featuresRef}
        className="relative z-10 px-4 py-24 sm:px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-4">
              <span className="px-4 py-1 bg-cyan-500/10 rounded-full text-xs font-medium text-cyan-500 uppercase tracking-wider">Features</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features for Every Event</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to create, manage, and grow your events, all in one place.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Event Creation",
                description: "Create beautiful event pages with customizable templates and branding options.",
                icon: "🎨"
              },
              {
                title: "Registration & Ticketing",
                description: "Seamless registration process with multiple ticket types and pricing options.",
                icon: "🎟️"
              },
              {
                title: "Attendee Management",
                description: "Manage your guest list, send communications, and track attendance.",
                icon: "👥"
              },
              {
                title: "Marketing Tools",
                description: "Promote your event with email campaigns, social sharing, and SEO optimization.",
                icon: "📢"
              },
              {
                title: "Analytics & Insights",
                description: "Get real-time data on registrations, attendance, and engagement.",
                icon: "📊"
              },
              {
                title: "Mobile Experience",
                description: "Provide attendees with a seamless mobile experience for check-in and engagement.",
                icon: "📱"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                {/* Glowing background */}
                <div className="absolute -inset-1 group-hover:opacity-100 opacity-0 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-md"></div>
                </div>

                <div className="relative z-10 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 group-hover:border-cyan-500/30 p-6 h-full transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl">
                      {feature.icon}
                    </div>
                    <div className="ml-4 h-px flex-grow bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>

                  {/* Arrow indicator */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-6 h-6 rounded-full border border-cyan-500/50 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        ref={howItWorksRef}
        className="relative z-10 px-4 py-24 sm:px-6 lg:px-12"
      >
        <div className="absolute inset-0 z-0 opacity-25">
          <div className="absolute right-0 top-1/4 w-1/3 h-1/3 bg-cyan-500/10 rounded-full filter blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center "
            initial={{ opacity: 0, y: 20 }}
            animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-4">
              <span className="px-4 py-1 bg-cyan-500/10 rounded-full text-xs font-medium text-cyan-500 uppercase tracking-wider">Process</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How EventFlow Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A simple process to create and manage successful events.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-24 left-1/2 h-0.5 w-[80%] -translate-x-1/2 bg-gradient-to-r from-cyan-500/50 via-cyan-500/20 to-cyan-500/50"></div>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  step: "01",
                  title: "Create Your Event",
                  description: "Set up your event details, customize your page, and set ticket options."
                },
                {
                  step: "02",
                  title: "Promote & Sell",
                  description: "Share your event, sell tickets, and manage registrations all in one place."
                },
                {
                  step: "03",
                  title: "Host & Analyze",
                  description: "Run your event smoothly and get insights to improve future events."
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="relative z-10 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 hover:border-cyan-500/30 p-6 h-full transition-all duration-300">
                    <div className="flex flex-col items-center lg:items-start">
                      {/* Step number with dynamic border */}
                      <div className="relative mb-6">
                        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500/30 to-cyan-500/10 blur-sm"></div>
                        <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-black border border-cyan-500/50">
                          <span className="text-xl font-bold text-cyan-500">{step.step}</span>
                        </div>

                        {/* Vertical connection for mobile */}
                        {index < 2 && (
                          <div className="lg:hidden absolute top-full left-1/2 w-0.5 h-12 bg-gradient-to-b from-cyan-500/50 to-transparent -mb-2"></div>
                        )}
                      </div>

                      <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center lg:text-left hover:text-cyan-400 transition-colors duration-300">{step.title}</h3>
                      <p className="text-gray-400 text-center lg:text-left">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        className="relative z-10 px-4  sm:px-6 lg:px-12 overflow-hidden"
      >
        <Testimonial testimonials={testimonials} />
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="relative z-10 px-4 py-24 sm:px-6 lg:px-12"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Create your first event today and see the difference EventFlow can make.
            </p>
          </motion.div>

          <motion.button
            className="px-8 py-3 rounded-lg overflow-hidden font-bold text-black bg-cyan-500 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Create Your Event</span>
          </motion.button>
        </div>
      </section>
    </div>
  );
}