import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Preloader from "../components/Common/Preloader";
import ProjectNotFound from "../components/Project/ProjectNotFound";
import ProjectHero from "../components/Project/ProjectHero";
import ProjectDescription from "../components/Project/ProjectDescription";
import ProjectSidebar from "../components/Project/ProjectSidebar";

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [projectUser, setProjectUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatCreatedAt = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMM yyyy, hh:mm a');
    } catch (error) {
      return dateString;
    }
  };

  useEffect(() => {
    const fetchProjectAndUser = async () => {
      try {
        const projectRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/project/${id}`
        );
        setProject(projectRes.data.project);
        setProjectUser(projectRes.data.userDetail);
        document.title = projectRes.data.project?.projectName || "Project";
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchProjectAndUser();
  }, [id]);

  if (loading) {
    return <Preloader />;
  }

  if (!project) {
    return <ProjectNotFound navigate={navigate} />;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          {/* Hero section */}
          <ProjectHero
            project={project}
            formatCreatedAt={formatCreatedAt}
          />

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Project description */}
            <ProjectDescription
              project={project}
              className="lg:col-span-2"
            />

            {/* Right column - Info cards */}
            <ProjectSidebar
              project={project}
              projectUser={projectUser}
              formatCreatedAt={formatCreatedAt}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}