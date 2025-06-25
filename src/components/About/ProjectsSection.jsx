import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

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

export default ProjectsSection;
