// import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Twitter, Linkedin, Github } from "lucide-react";

const teamMembers = [
  {
    name: "Alice Williams",
    role: "Frontend Developer",
    image: "https://picsum.photos/200/300",
    description: "Crafting beautiful and responsive user interfaces.",
    social: {
      twitter: "https://twitter.com/alicewilliams",
      linkedin: "https://linkedin.com/in/alicewilliams",
      github: "https://github.com/alicewilliams",
    },
  },
  {
    name: "Bob Brown",
    role: "Backend Developer",
    image: "https://picsum.photos/200/300",
    description: "Building robust and scalable server-side solutions.",
    social: {
      twitter: "https://twitter.com/bobbrown",
      linkedin: "https://linkedin.com/in/bobbrown",
      github: "https://github.com/bobbrown",
    },
  },
  {
    name: "Charlie Davis",
    role: "UI/UX Designer",
    image: "https://picsum.photos/200/300",
    description: "Creating intuitive and delightful user experiences.",
    social: {
      twitter: "https://twitter.com/charliedavis",
      linkedin: "https://linkedin.com/in/charliedavis",
      github: "https://github.com/charliedavis",
    },
  },
  {
    name: "Diana Evans",
    role: "Project Manager",
    image: "https://picsum.photos/200/300",
    description: "Ensuring smooth project execution and client satisfaction.",
    social: {
      twitter: "https://twitter.com/dianaevans",
      linkedin: "https://linkedin.com/in/dianaevans",
    },
  },
  {
    name: "Diana Evans",
    role: "Project Manager",
    image: "https://picsum.photos/200/300",
    description: "Ensuring smooth project execution and client satisfaction.",
    social: {
      twitter: "https://twitter.com/dianaevans",
      linkedin: "https://linkedin.com/in/dianaevans",
    },
  },
  {
    name: "Diana Evans",
    role: "Project Manager",
    image: "https://picsum.photos/200/300",
    description: "Ensuring smooth project execution and client satisfaction.",
    social: {
      twitter: "https://twitter.com/dianaevans",
      linkedin: "https://linkedin.com/in/dianaevans",
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
              <p className="text-sm text-stone-400 mb-2">{member.role}</p>
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
