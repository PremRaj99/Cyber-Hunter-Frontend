// import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const coreTeamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: "https://picsum.photos/200/300",
    description:
      "Visionary leader with 10+ years of experience in tech innovation next gen.",
    social: {
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
  },
  {
    name: "Jane Smith",
    role: "CTO",
    image: "https://picsum.photos/200/300",
    description:
      "Tech guru specializing in scalable architecture and emerging technologies.",
    social: {
      twitter: "https://twitter.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
      github: "https://github.com/janesmith",
    },
  },
  {
    name: "Mike Johnson",
    role: "Lead Designer",
    image: "https://unsplash.it/300/300",
    description:
      "Creative mind with a passion for user-centric design and branding.",
    social: {
      twitter: "https://twitter.com/mikejohnson",
      linkedin: "https://linkedin.com/in/mikejohnson",
      facebook: "https://facebook.com/mikejohnson",
    },
  },
  {
    name: "Mike Johnson",
    role: "Lead Designer",
    image: "https://unsplash.it/300/300",
    description:
      "Creative mind with a passion for user-centric design and branding.",
    social: {
      twitter: "https://twitter.com/mikejohnson",
      linkedin: "https://linkedin.com/in/mikejohnson",
      facebook: "https://facebook.com/mikejohnson",
    },
  },
];

const CoreTeam = () => {
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

  // Animation variants for individual team member cards
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
      <h2 className="text-3xl font-bold text-white mb-8">Core Team</h2>
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="flex overflow-x-auto no-scrollbar space-x-8 p-4"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {coreTeamMembers.map((member, index) => (
          <motion.div
            key={`${member.name}-${index}`}
            variants={cardVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            className="flex-shrink-0 w-80 border-2 border-brandPrimary rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-brandPrimary ">
                {member.name}
              </h3>
              <p className="text-stone-400 mb-4">{member.role}</p>
              <p className="text-white mb-4">{member.description}</p>
              <div className="flex space-x-4">
                {member.social.facebook && (
                  <a
                    href={member.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-700"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-900"
                  >
                    <Github className="w-5 h-5" />
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

export default CoreTeam;
