import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

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

export default DomainsSection;
