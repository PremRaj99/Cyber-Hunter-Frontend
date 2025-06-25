import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

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

export default LeadershipSection;
