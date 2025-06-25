import { useRef, useState, useEffect } from "react";
import { useTransform, useInView } from "framer-motion";
import ProgressBar from "../components/Event/ProgressBar";
import AnimatedBackground from "../components/Event/AnimatedBackground";
import HeroSection from "../components/Event/HeroSection";
import StatsSection from "../components/Event/StatsSection";
import FeaturesSection from "../components/Event/FeaturesSection";
import HowItWorksSection from "../components/Event/HowItWorksSection";
import CTASection from "../components/Event/CTASection";
import Testimonial from "../components/home/Testimonial";

export default function EventManagementLanding() {
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

  // Mouse parallax effect for hero elements
  const mouseX = useTransform(() => mousePosition.x || 0);
  const mouseY = useTransform(() => mousePosition.y || 0);

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

  // Testimonials data
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

  return (
    <div
      ref={mainContainerRef}
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      {/* Progress bar */}
      <ProgressBar scrollProgress={scrollProgress} />

      {/* Animated background */}
      <AnimatedBackground moveX={moveX} moveY={moveY} />

      {/* Hero Section */}
      <HeroSection heroRef={heroRef} heroInView={heroInView} />

      {/* Stats Section */}
      <StatsSection heroInView={heroInView} />

      {/* Features Section */}
      <FeaturesSection featuresRef={featuresRef} featuresInView={featuresInView} />

      {/* How It Works Section */}
      <HowItWorksSection howItWorksRef={howItWorksRef} howItWorksInView={howItWorksInView} />

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        className="relative z-10 px-4 sm:px-6 lg:px-12 overflow-hidden"
      >
        <Testimonial testimonials={testimonials} />
      </section>

      {/* CTA Section */}
      <CTASection ctaRef={ctaRef} ctaInView={ctaInView} />
    </div>
  );
}