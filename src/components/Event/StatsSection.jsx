import { motion } from "framer-motion";

export default function StatsSection({ heroInView }) {
  const stats = [
    { number: "10K+", label: "Events Hosted" },
    { number: "1M+", label: "Attendees" },
    { number: "150+", label: "Countries" },
    { number: "99%", label: "Satisfaction" }
  ];

  return (
    <section className="relative z-10 py-16 overflow-hidden">
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center relative"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Glowing accent */}
              <div className="absolute -inset-1 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-md"></div>
              </div>
              <div className="relative z-10 p-4 rounded-xl">
                <p className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">
                  {stat.number}
                </p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
    </section>
  );
}
