import { useRef, useEffect, useState } from "react"; // Add useState
import { FaEye, FaGithub } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import axios from 'axios'; // Add axios import
import { format } from 'date-fns';
import { Link, useNavigate } from "react-router-dom";

const formatCreatedAt = (dateString) => {
  try {
    const date = new Date(dateString);
    return format(date, 'dd MMM yyyy, hh:mm a');
  } catch (error) {
    return dateString;
  }
};

export default function ViewprojectItem() {
  const [projects, setProjects] = useState([]); // Add state for projects
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/project`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);



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
            key={project._id}
            project={project}
            variants={itemVariants}
          />
        ))}
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, variants }) {
  console.log('project:', project);
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
        <div className="h-36 w-full md:h-28 md:w-44 shrink-0 overflow-hidden rounded-lg">
          <motion.img
            src={project.projectThumbnail}
            alt={project.projectImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-xl  font-semibold text-cyan-400">
            {project.projectName.toUpperCase()}
          </h2>

          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-4 text-sm font-light text-gray-400">
              {project.gitHubLink && (
                <a
                  href={project.gitHubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline cursor-pointer"
                >
                  <FaGithub className="h-4 w-4 rounded-full" />
                  GitHub
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline cursor-pointer"
                >
                  <FaEye className="h-4 w-4 rounded-full" />
                  Live
                </a>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500 font-bold">Created on:</span>
              <span className="text-gray-400">{formatCreatedAt(project.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500 font-bold">Updated on:</span>
              <span className="text-gray-400">{formatCreatedAt(project.updatedAt)}</span>
            </div>
          </div>
        </div>
        <div className="text-l font-semibold text-green-400">
          <span className="text-gray-400 font-light">Points : {project.points || 0}</span>
          {project.points}
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded bg-green-400 px-4 py-2 text-sm font-medium text-black hover:bg-green-500"
            // onClick={() => navigate(`/project/${project._id}`)}
            >
              <Link to={`/dashboard/project/${project._id}`}>View</Link>
            </motion.button>
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
