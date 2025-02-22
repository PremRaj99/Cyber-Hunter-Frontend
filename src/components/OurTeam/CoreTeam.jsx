// import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import namanPic from "../../assets/team/namanKumar.png";
import yashPic from "../../assets/team/yashRana.png";
import premPic from "../../assets/team/premrajpic.png";
import manikPic from "../../assets/team/manikdutt.png";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const coreTeamMembers = [
  {
    name: "Naman Kumar",
    role: "Founder & CEO",
    image: namanPic,
    description:
      "Tech guru specializing in scalable architecture and emerging technologies.",
    social: {
      twitter: "https://twitter.com/naman_kumar",
      linkedin: "https://www.linkedin.com/in/namankh",
      github: "https://github.com/6829nkhpas",
    },
  },
  {
    name: "Yash Rana",
    role: "Founder & CTO",
    image: yashPic,
    description:
      "Visionary leader with 2+ years of experience in tech innovation next gen.",
    social: {
      twitter: "https://twitter.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
      github: "https://github.com/janesmith",
    },
  },
  {
    name: "Prem Raj",
    role: "Co-Founder & Backend Dev.",
    image: premPic,
    description:
      "Backend expert with a knack for building robust and scalable APIs.",
    social: {
      twitter: "https://twitter.com/premraj99",
      linkedin: "https://linkedin.com/in/prem-raj99/",
      github: "https://facebook.com/PremRaj99",
    },
  },
  {
    name: "Manik Dutt",
    role: "Co-Founder & Frontend Dev.",
    image: manikPic,
    description:
      "Creative mind with a passion for user-centric design and branding.",
    social: {
      twitter: "https://twitter.com/manikdutt157",
      linkedin: "https://www.linkedin.com/in/manik-dutt-92b9ab250/",
      github: "https://github.com/manikdutt157",
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
            <div className="flex items-center justify-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-72 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-brandPrimary ">
                {member.name}
              </h3>
              <p className="text-white mb-4">{member.role}</p>
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
