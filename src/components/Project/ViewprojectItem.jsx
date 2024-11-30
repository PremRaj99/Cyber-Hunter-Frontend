import { useRef } from "react";
import { FaEye, FaGithub } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ViewprojectItem() {
  const projects = [
    {
      id: 1,
      name: "TeamSync",
      image:
        "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
      points: 60,
      createdOn: "12 Aug 2024",
    },
    {
      id: 2,
      name: "teamcode",
      image:
        "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
      points: 60,
      createdOn: "12 Aug 2024",
    },
    {
      id: 3,
      name: "Toppers",
      image:
        "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
      points: 60,
      createdOn: "12 Aug 2024",
    },
    {
      id: 4,
      name: "Bugfixers",
      image:
        "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
      points: 60,
      createdOn: "12 Aug 2024",
    },
    {
      id: 5,
      name: "Toppers",
      image:
        "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
      points: 60,
      createdOn: "12 Aug 2024",
    },
    {
      id: 6,
      name: "Bugfixers",
      image:
        "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
      points: 60,
      createdOn: "12 Aug 2024",
    },
    {
      id: 7,
      name: "Toppers",
      image:
        "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
      points: 60,
      createdOn: "12 Aug 2024",
    },
    {
      id: 8,
      name: "Bugfixers",
      image:
        "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
      points: 60,
      createdOn: "12 Aug 2024",
    },
    {
      id: 9,
      name: "Toppers",
      image:
        "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
      points: 60,
      createdOn: "12 Aug 2024",
    },
    {
      id: 10,
      name: "Bugfixers",
      image:
        "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
      points: 60,
      createdOn: "12 Aug 2024",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-3xl font-bold text-center"
      >
        <span className="text-cyan-400">View</span>
        <span className="text-white"> Project</span>
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            variants={itemVariants}
          />
        ))}
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, variants }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, 0]);

  return (
    <div className="">
      <motion.div
        ref={ref}
        style={{ opacity, y }}
        variants={variants}
        whileHover={{ scale: 1.005 }}
        className="relative flex flex-col gap-4 rounded-lg border-2 border-brandPrimary p-4 shadow-lg transition-transform md:flex-row md:items-center"
      >
        <div className="h-30 w-30 md:h-30 md:w-40 shrink-0 overflow-hidden rounded-lg">
          <motion.img
            src={project.image}
            alt={project.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-xl font-semibold text-cyan-400">
            {project.name}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-sm font-light text-gray-400">
            <div className="flex items-center gap-2 hover:underline cursor-pointer">
              <FaGithub className="h-4 w-4 rounded-full" />
              GitHub
            </div>
            <div className="flex items-center gap-2 hover:underline cursor-pointer">
              <FaEye className="h-4 w-4 rounded-full " />
              Live
            </div>
            <div>created on : {project.createdOn}</div>
          </div>
        </div>
        <div className="text-l font-semibold text-green-400">
          <span className="text-gray-400 font-light">Points : </span>
          {project.points}
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
            >
              Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Delete
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
