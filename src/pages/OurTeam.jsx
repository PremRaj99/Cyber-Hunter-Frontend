import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGlobe } from 'react-icons/fa';
import namanPic from "../assets/team/namanKumar.png";
import yashPic from "../assets/team/yashRana.png";
import premPic from "../assets/team/premrajpic.png";
import manikPic from "../assets/team/manikdutt.png";

const memberData = [
  {
    id: 1,
    name: "Yash Rana",
    role: "Founder & CTO",
    description: "EMPOWERING STUDENTS TO TURN IDEAS INTO IMPACTFUL SOLUTIONS.",
    photo: yashPic,
    portfolio: "https://yashranaportfolio.netlify.app/",
    socialMedia: {
      github: "https://github.com/yash-rana0101",
      instagram: "https://www.instagram.com/yashrana.ai",
      linkedin: "https://www.linkedin.com/in/devop-yash-rana",
      twitter: "https://twitter.com/YashRana0101",
    },
  },
  {
    id: 2,
    name: "Naman Kumar",
    role: "Founder & CEO",
    description: "BLOCKCHAIN ISN'T JUST TECH, IT'S A REVOLUTION WAITING TO BE BUILT",
    photo: namanPic,
    portfolio: "https://www.namankumar.live/",
    socialMedia: {
      github: "https://github.com/6829nkhpas",
      instagram: "https://www.instagram.com/naman_amrit_arjun",
      linkedin: "https://www.linkedin.com/in/namankh",
      twitter: "https://twitter.com/naman_kumar",
    },
  },
  {
    id: 3,
    name: "Prem Raj",
    role: "Co-Founder",
    description: "SECURE, TRANSPARENT, AND DECENTRALIZED SOLUTIONS",
    photo: premPic,
    portfolio: "https://www.premraj.tech/",
    socialMedia: {
      github: "https://github.com/PremRaj99",
      instagram: "https://www.instagram.com/prem_raj_0009",
      linkedin: "https://www.linkedin.com/in/prem-raj99/",
      twitter: "https://twitter.com/prem_raj99",
    },
  },
  {
    id: 4,
    name: "Manik Dutt",
    role: "Co-Founder",
    description: "EMBRACE THE FUTURE WITH BLOCKCHAIN TECHNOLOGY",
    photo: manikPic,
    portfolio: "https://www.premraj.tech/",
    socialMedia: {
      github: "https://github.com/manikdutt157",
      instagram: "https://www.instagram.com/genius_157",
      linkedin: "https://www.linkedin.com/in/manik-dutt-92b9ab250/",
      twitter: "https://twitter.com/manikdutt157",
    },
  },
];

const TeamMemberCard = ({ member }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 rounded-2xl p-6 border border-[#00D8FF]/20 hover:border-[#00D8FF] transition-all duration-300 group"
    >
      <div className="relative w-full aspect-square">
        <div className="absolute inset-0 bg-[#00D8FF]/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover rounded-xl relative z-10 group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="mt-6">
        <h3 className="text-2xl font-bold text-[#00D8FF]">{member.name}</h3>
        <p className="text-gray-400 mt-1">{member.role}</p>
        <p className="text-gray-300 mt-3">{member.description}</p>
        
        <div className="mt-6 flex space-x-4">
          <a
            href={member.socialMedia.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#00D8FF] transition-colors"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={member.socialMedia.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#00D8FF] transition-colors"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href={member.socialMedia.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#00D8FF] transition-colors"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href={member.socialMedia.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#00D8FF] transition-colors"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href={member.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#00D8FF] transition-colors"
          >
            <FaGlobe size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function OurTeam() {
  return (
    <div className="min-h-screen bg-gray-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-[#00D8FF] mb-4"
          >
            Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Meet the passionate individuals behind CyberHunter who are dedicated to
            delivering exceptional results and driving innovation in the blockchain space.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {memberData.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
