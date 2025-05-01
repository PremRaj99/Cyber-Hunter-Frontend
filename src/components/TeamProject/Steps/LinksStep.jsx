import { useContext } from "react";
import { Github, Globe } from "lucide-react";
import { TeamProjectContext } from "../../../pages/AddTeamProject";

const LinksStep = () => {
  const { project, setProject } = useContext(TeamProjectContext);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">GitHub Repository</label>
        <div className="relative">
          <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="url"
            value={project.gitHubLink}
            onChange={(e) => setProject({ ...project, gitHubLink: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:ring-2 focus:ring-brandPrimary text-white"
            placeholder="https://github.com/username/repo"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">Live Demo</label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="url"
            value={project.liveLink}
            onChange={(e) => setProject({ ...project, liveLink: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:ring-2 focus:ring-brandPrimary text-white"
            placeholder="https://your-project.com"
          />
        </div>
      </div>
    </div>
  );
};

export default LinksStep;
