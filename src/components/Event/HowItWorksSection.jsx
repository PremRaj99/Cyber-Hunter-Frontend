import { motion } from "framer-motion";

export default function HowItWorksSection({ howItWorksRef, howItWorksInView }) {
  const steps = [
    {
      step: "01",
      title: "Create Your Event",
      description: "Set up your event details, customize your page, and set ticket options."
    },
    {
      step: "02",
      title: "Promote & Sell",
      description: "Share your event, sell tickets, and manage registrations all in one place."
    },
    {
      step: "03",
      title: "Host & Analyze",
      description: "Run your event smoothly and get insights to improve future events."
    }
  ];

  return (
    <section
      id="how-it-works"
      ref={howItWorksRef}
      className="relative z-10 px-4 py-24 sm:px-6 lg:px-12"
    >
      <div className="absolute inset-0 z-0 opacity-25">
        <div className="absolute right-0 top-1/4 w-1/3 h-1/3 bg-cyan-500/10 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center "
          initial={{ opacity: 0, y: 20 }}
          animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-4">
            <span className="px-4 py-1 bg-cyan-500/10 rounded-full text-xs font-medium text-cyan-500 uppercase tracking-wider">Process</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How EventFlow Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A simple process to create and manage successful events.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-1/2 h-0.5 w-[80%] -translate-x-1/2 bg-gradient-to-r from-cyan-500/50 via-cyan-500/20 to-cyan-500/50"></div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative z-10 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 hover:border-cyan-500/30 p-6 h-full transition-all duration-300">
                  <div className="flex flex-col items-center lg:items-start">
                    {/* Step number with dynamic border */}
                    <div className="relative mb-6">
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500/30 to-cyan-500/10 blur-sm"></div>
                      <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-black border border-cyan-500/50">
                        <span className="text-xl font-bold text-cyan-500">{step.step}</span>
                      </div>

                      {/* Vertical connection for mobile */}
                      {index < 2 && (
                        <div className="lg:hidden absolute top-full left-1/2 w-0.5 h-12 bg-gradient-to-b from-cyan-500/50 to-transparent -mb-2"></div>
                      )}
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center lg:text-left hover:text-cyan-400 transition-colors duration-300">{step.title}</h3>
                    <p className="text-gray-400 text-center lg:text-left">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
