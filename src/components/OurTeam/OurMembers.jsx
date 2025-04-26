// import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Twitter, Linkedin, Github } from "lucide-react";

const teamMembers = [
  {
    name: "Kanika Tiwari",
    role: "Frontend Developer",
    image: "https://i.ibb.co/F43KjNM9/IMG-20250426-004309.png",
    description: "Crafting beautiful and responsive user interfaces.",
    social: {
      twitter: "https://twitter.com/alicewilliams",
      linkedin: "https://www.linkedin.com/in/kanika-tiwari-04730a291/",
      github: "https://github.com/kanikatiwari06",
    },
  },
  {
    name: "Rahul Gupta",
    role: "MERN Developer",
    image: "https://i.ibb.co/C3VW51wF/1000084343-removebg.png",
    description: "Creating Tech That Impacpts Masses",
    social: {
      twitter: "https://x.com/Rahul0470?t=ir1doj910zZFGwnH9QpJbQ&s=09",
      linkedin: "https://www.linkedin.com/in/rahul-gupta-0407t?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "http://github.com/rahul-0407",
    },
  },
 
];

const Members = () => {
  // Intersection Observer setup for scroll-based animation
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Animation variants for section
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for individual member cards
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="mb-16" ref={ref}>
      <h2 className="text-3xl font-bold text-white mb-8">Team Members</h2>
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="flex overflow-x-auto no-scrollbar space-x-6"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {teamMembers.map((member) => (
          <motion.div
            key={member.name}
            variants={cardVariants}
            className="flex-shrink-0 w-64 border-2 border-brandPrimary rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-brandPrimary">
                {member.name}
              </h3>
              <p className="text-sm text-white mb-2">{member.role}</p>
              <p className="text-sm text-white mb-4">{member.description}</p>
              <div className="flex space-x-3">
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-700"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-900"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Members;
