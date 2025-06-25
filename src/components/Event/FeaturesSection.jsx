import { motion } from "framer-motion";

export default function FeaturesSection({ featuresRef, featuresInView }) {
  const features = [
    {
      title: "Event Creation",
      description: "Create beautiful event pages with customizable templates and branding options.",
      icon: "🎨"
    },
    {
      title: "Registration & Ticketing",
      description: "Seamless registration process with multiple ticket types and pricing options.",
      icon: "🎟️"
    },
    {
      title: "Attendee Management",
      description: "Manage your guest list, send communications, and track attendance.",
      icon: "👥"
    },
    {
      title: "Marketing Tools",
      description: "Promote your event with email campaigns, social sharing, and SEO optimization.",
      icon: "📢"
    },
    {
      title: "Analytics & Insights",
      description: "Get real-time data on registrations, attendance, and engagement.",
      icon: "📊"
    },
    {
      title: "Mobile Experience",
      description: "Provide attendees with a seamless mobile experience for check-in and engagement.",
      icon: "📱"
    }
  ];

  return (
    <section
      id="features"
      ref={featuresRef}
      className="relative z-10 px-4 py-24 sm:px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-4">
            <span className="px-4 py-1 bg-cyan-500/10 rounded-full text-xs font-medium text-cyan-500 uppercase tracking-wider">Features</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features for Every Event</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to create, manage, and grow your events, all in one place.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Glowing background */}
              <div className="absolute -inset-1 group-hover:opacity-100 opacity-0 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-md"></div>
              </div>

              <div className="relative z-10 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 group-hover:border-cyan-500/30 p-6 h-full transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl">
                    {feature.icon}
                  </div>
                  <div className="ml-4 h-px flex-grow bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>

                {/* Arrow indicator */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-6 h-6 rounded-full border border-cyan-500/50 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
