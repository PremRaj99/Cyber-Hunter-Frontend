import { motion } from "framer-motion";
import { Twitter, Linkedin } from "lucide-react";

const collaborators = [
  {
    name: "Eva Green",
    role: "Content Writer",
    image: "https://picsum.photos/200/300",
    description: "Crafting compelling narratives and engaging content.",
    social: {
      twitter: "https://twitter.com/evagreen",
      linkedin: "https://linkedin.com/in/evagreen",
    },
  },
  {
    name: "Frank White",
    role: "SEO Specialist",
    image: "https://unsplash.it/300/300",
    description: "Optimizing digital presence for maximum visibility.",
    social: {
      twitter: "https://twitter.com/frankwhite",
      linkedin: "https://linkedin.com/in/frankwhite",
    },
  },
  {
    name: "Grace Lee",
    role: "Illustrator",
    image: "https://picsum.photos/200/300",
    description: "Bringing ideas to life through vibrant illustrations.",
    social: {
      twitter: "https://twitter.com/gracelee",
      linkedin: "https://linkedin.com/in/gracelee",
    },
  },
  {
    name: "Henry Clark",
    role: "Marketing Consultant",
    image: "https://unsplash.it/200/300",
    description: "Developing strategies for brand growth and engagement.",
    social: {
      twitter: "https://twitter.com/henryclark",
      linkedin: "https://linkedin.com/in/henryclark",
    },
  },
  {
    name: "Ivy Taylor",
    role: "Data Analyst",
    image: "https://picsum.photos/200/300",
    description: "Uncovering insights from complex datasets.",
    social: {
      twitter: "https://twitter.com/ivytaylor",
      linkedin: "https://linkedin.com/in/ivytaylor",
    },
  },
  {
    name: "Jack Wilson",
    role: "DevOps Engineer",
    image: "https://unsplash.it/200/300",
    description: "Streamlining development and operations processes.",
    social: {
      twitter: "https://twitter.com/jackwilson",
      linkedin: "https://linkedin.com/in/jackwilson",
    },
  },
];

const Collaborators = () => {
  return (
    <section className="overflow-hidden">
      <h2 className="text-3xl font-bold text-white mb-8">Collaborators</h2>
      <motion.div
        className="flex overflow-x-auto no-scrollbar space-x-8 p-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {collaborators.map((collaborator, index) => (
          <motion.div
            key={collaborator.name}
            className="flex-shrink-0 w-72 border-2 border-brandPrimary rounded-lg shadow-sm overflow-hidden text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.5,
                delay: index * 0.1,
              },
            }}
            viewport={{ once: true }}
          >
            <img
              src={collaborator.image}
              alt={collaborator.name}
              className="w-24 h-24 mx-auto rounded-full mt-4"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold text-brandPrimary">
                {collaborator.name}
              </h3>
              <p className="text-xs text-white mb-2">{collaborator.role}</p>
              <p className="text-xs text-white mb-2">
                {collaborator.description}
              </p>
              <div className="flex justify-center space-x-2">
                {collaborator.social.twitter && (
                  <a
                    href={collaborator.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 border border-brandPrimary p-2 rounded-full hover:text-blue-400"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {collaborator.social.linkedin && (
                  <a
                    href={collaborator.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 border border-brandPrimary p-2 rounded-full hover:text-blue-700"
                  >
                    <Linkedin className="w-4 h-4" />
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

export default Collaborators;
