/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

export default function CyberhunterAbout () {
  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      <HeroSection />
      <AboutSection />
      <MissionVisionSection />
      <LeadershipSection />
      <DomainsSection />
      <ProjectsSection />
      <CommunitySection />
      {/* <RoadmapSection />
      <FooterSection /> */}
    </div>
  );
}

// Reusable animation component
const AnimatedSection = ({ children, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Section components
const HeroSection = () => {

  const navigate = useNavigate();
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-cyan-400 opacity-10 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
            <span className="text-cyan-400">CYBER&nbsp;</span>
            <span className="text-cyan-400">HUNTER</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-300 font-light">
            Igniting Minds in Cybersecurity, Blockchain, and Future Tech
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-300 mt-8"
        >
          We are a student-driven community at Quantum University, building the next generation of cyber defenders and tech innovators.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10"
        >
          <button className="bg-black hover:bg-cyan-400 border-2 border-cyan-400 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 mx-2 hover:text-gray-800"
            onClick={() => navigate('/auth/login')}>
            Join Us
          </button>
          <button className="bg-transparent border-2 border-cyan-400 text-white font-bold py-3 px-8 rounded-full transition duration-300 hover:bg-blue-800/20 mx-2 mt-4 md:mt-0"
            onClick={()=> navigate('/auth/login')}>
            Explore Projects
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <AnimatedSection className="flex flex-col md:flex-row items-center gap-10">
        {/* Animated graphic */}
        <motion.div
          className="w-full md:w-1/2 mb-10 md:mb-0"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <motion.div
              className="w-full h-64 md:h-96 bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ rotate: -2 }}
              whileHover={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 p-4 flex items-start justify-start">
                <div className="font-mono text-xs text-gray-300 opacity-70">
                  <div>{'> '} cyberhunter init</div>
                  <div>{'> '} loading security modules...</div>
                  <div>{'> '} blockchain integration: complete</div>
                  <div>{'> '} hack the planet</div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-24 h-24 bg-white bg-opacity-10 rounded-full flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.5)",
                      "0 0 0 20px rgba(59, 130, 246, 0)",
                      "0 0 0 0 rgba(59, 130, 246, 0)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <div className="text-4xl">🛡️</div>
                </motion.div>
              </div>

              {/* Binary pattern background */}
              <div className="absolute inset-0 opacity-10 overflow-hidden">
                {[...Array(40)].map((_, i) => (
                  <div key={i} className="text-xs md:text-sm font-mono text-white absolute"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 90 - 45}deg)`
                    }}>
                    {Math.random() > 0.5 ? '0' : '2'}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-5 -left-5 w-16 h-16 bg-cyan-500 rounded-xl shadow-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-3 -right-3 w-12 h-12 bg-cyan-400 rounded-lg shadow-lg"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Text content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-6">
            The Origin Story
          </h2>
          <motion.p
            className="text-gray-300 text-lg leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Cyberhunter was born from a simple idea: "What if students could lead each other into the world of ethical hacking, security research, and decentralized technology without waiting for formal instruction?"
          </motion.p>
          <motion.p
            className="text-gray-300 text-lg leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            With the rise of malware attacks, data breaches, and global cyber threats, a group of students including Yash Rana decided to create a club where skills could be learned, tested, and shared. They believed in learning by doing, and that ethos has since driven every initiative of Cyberhunter.
          </motion.p>
          <motion.p
            className="text-gray-300 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            What began in a classroom as a casual coding discussion quickly evolved into regular meetups, structured sessions, real-world projects, and now a full-fledged digital presence.
          </motion.p>
        </div>
      </AnimatedSection>
    </section>
  );
};

const MissionVisionSection = () => {
  return (
    <section className="py-20 px-6 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-16">
            Mission & Vision
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimatedSection>
            <motion.div
              className="bg-gray-800/80 p-8 rounded-2xl border border-cyan-400/20 h-full"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-black p-4 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-blue-300">Our Mission</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                To create a student-driven platform that nurtures skills in cybersecurity, blockchain, and emerging technologies through real-world projects, collaborative learning, and industry-relevant exposure.
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection>
            <motion.div
              className="bg-gray-800/80 p-8 rounded-2xl border border-cyan-500/20 h-full"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(34, 211, 238, 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-cyan-600 p-4 rounded-lg mr-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-cyan-300">Our Vision</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                To become a nationally recognized student club that produces elite developers, ethical hackers, and tech leaders ready to take on real-world challenges in the digital domain.
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

const LeadershipSection = () => {
  const leaders = [
    {
      role: "President",
      description: "Oversees strategic direction, partnerships, and internal governance."
    },
    {
      role: "Vice-President (Yash Rana)",
      description: "Leads technical initiatives, mentors juniors, and manages the tech roadmap."
    },
    {
      role: "Core Team Members",
      description: "Responsible for key departments: Content, Research, Development, Design, and Outreach."
    },
    {
      role: "Project Leads",
      description: "Each major initiative has a lead responsible for delivery, mentorship, and innovation."
    }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-6">
          Leadership Structure
        </h2>
        <p className="text-center text-gray-300 text-lg max-w-3xl mx-auto mb-16">
          Cyberhunter is not just a club; it operates like a startup within the university. Our structure enables a culture of mentorship, accountability, and peer learning.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {leaders.map((leader, index) => (
          <AnimatedSection key={index} className="h-full">
            <motion.div
              className="bg-gray-800/30 border border-gray-700/50 p-6 rounded-xl h-full flex flex-col"
              whileHover={{
                y: -5,
                backgroundColor: "rgba(30, 41, 59, 0.6)",
                borderColor: "rgba(59, 130, 246, 0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-blue-300 mb-3">{leader.role}</h3>
              <p className="text-gray-300">{leader.description}</p>
              {leader.role === "Vice-President (Yash Rana)" && (
                <motion.div
                  className="mt-4 p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-blue-200 text-sm italic">
                    `As the Vice-President, Yash Rana exemplifies the spirit of Cyberhunter: passionate, proactive, and deeply involved in mentoring, building, and shaping the future of tech education on campus.`
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
};

const DomainsSection = () => {
  const domains = [
    {
      title: "Cybersecurity",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: "from-red-500 to-pink-500",
      skills: ["Ethical Hacking", "Network Security", "Web Application Security", "Penetration Testing", "Bug Bounty Hunting", "CTF Challenges"]
    },
    {
      title: "Web3 & Blockchain",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      color: "from-purple-500 to-indigo-500",
      skills: ["Smart Contract Development", "Token Standards", "DApp Architecture", "Blockchain Testnet Deployments", "NFT Ecosystems", "Wallet Security"]
    },
    {
      title: "MERN Stack Development",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      color: "from-green-500 to-teal-500",
      skills: ["MongoDB", "Express.js", "React.js", "Node.js", "UI for Cybersecurity Tools", "API Integration"]
    },
    {
      title: "Open Source & Freelancing",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      color: "from-yellow-500 to-orange-500",
      skills: ["GitHub Contributions", "Hacktoberfest", "Portfolio Building", "Freelance Projects", "Open-source Issues", "Earning Through Skill"]
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-6">
            Domains of Focus
          </h2>
          <p className="text-center text-gray-300 text-lg max-w-3xl mx-auto mb-16">
            We explore and excel in various cutting-edge technologies, preparing our members for the future of tech.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {domains.map((domain, index) => (
            <AnimatedSection key={index}>
              <motion.div
                className="bg-gray-800/30 border border-gray-700/50 p-6 rounded-xl overflow-hidden relative"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
                  borderColor: "rgba(59, 130, 246, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Background gradient blob */}
                <motion.div
                  className={`absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-gradient-to-br ${domain.color} opacity-10 blur-3xl`}
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />

                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center p-3 rounded-lg bg-gradient-to-br ${domain.color} text-white mb-4`}>
                    {domain.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4">{domain.title}</h3>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {domain.skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        className="text-sm px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * idx }}
                        whileHover={{
                          backgroundColor: "rgba(59, 130, 246, 0.2)",
                          borderColor: "rgba(59, 130, 246, 0.3)",
                          color: "rgba(219, 234, 254, 1)"
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  const projects = [
    {
      title: "Bug Tracker App",
      description: "Identifying and reporting vulnerabilities in web applications.",
      icon: "🐛"
    },
    {
      title: "Token Wallet on ICP",
      description: "A Rust-based smart contract app for handling IRCRC2 token transactions.",
      icon: "💼"
    },
    {
      title: "Vulnerability Scanner",
      description: "A tool that scans websites for common web vulnerabilities.",
      icon: "🔍"
    },
    {
      title: "Decentralized Voting",
      description: "Built on Ethereum to simulate tamper-proof elections.",
      icon: "🗳️"
    },
    {
      title: "Cyber Quiz",
      description: "A gamified learning tool to assess cybersecurity knowledge.",
      icon: "❓"
    }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-6">
          Projects & Innovations
        </h2>
        <p className="text-center text-gray-300 text-lg max-w-3xl mx-auto mb-16">
          Cyberhunter has developed multiple hands-on projects that are deployed, peer-reviewed, and in some cases, open-sourced.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <AnimatedSection key={index}>
            <motion.div
              className="bg-gray-800/30 border border-gray-700/50 p-6 rounded-xl h-full"
              whileHover={{
                y: -5,
                backgroundColor: "rgba(30, 41, 59, 0.6)",
                borderColor: "rgba(59, 130, 246, 0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4 text-4xl">{project.icon}</div>
              <h3 className="text-xl font-bold text-blue-300 mb-2">{project.title}</h3>
              <p className="text-gray-300">{project.description}</p>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
};

const CommunitySection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 px-6 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-6">
            Community & Culture
          </h2>
        </AnimatedSection>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          <AnimatedSection className="w-full md:w-1/2">
            <div className="relative">
              <motion.div
                className="bg-gray-800 p-6 rounded-2xl border border-gray-700"
                initial={{ rotate: -2 }}
                whileHover={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/30"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h4 className="text-blue-300 font-semibold text-center">Peer Mentorship</h4>
                  </motion.div>

                  <motion.div
                    className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-800/30"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <h4 className="text-cyan-300 font-semibold text-center">Accountability</h4>
                  </motion.div>

                  <motion.div
                    className="bg-purple-900/30 p-4 rounded-lg border border-purple-800/30"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                      </svg>
                    </div>
                    <h4 className="text-purple-300 font-semibold text-center">Problem Solving</h4>
                  </motion.div>

                  <motion.div
                    className="bg-green-900/30 p-4 rounded-lg border border-green-800/30"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-green-300 font-semibold text-center">Celebrating Wins</h4>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
          <AnimatedSection className="w-full md:w-1/2">
            <motion.div
              className="bg-gray-800 p-6 rounded-2xl border border-gray-700"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-blue-300 mb-4">Join the Cyberhunter Community</h3>
              <p className="text-gray-300 mb-4">
                Our community thrives on collaboration, innovation, and a shared passion for technology. We believe in learning together, growing together, and making a difference in the tech world.
              </p>
              <motion.button
                className="bg-black border border-cyan-400 hover:bg-cyan-400 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 hover:text-gray-900"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate('/auth/login')}
              >
                Join Us Now
              </motion.button>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}