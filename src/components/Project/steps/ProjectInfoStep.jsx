import { useContext } from "react";
import { ProjectContext } from "../../../pages/Addproject";

const ProjectInfoStep = () => {
  const { project, setProject } = useContext(ProjectContext);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">Project Name</label>
        <input
          type="text"
          value={project.projectName}
          onChange={(e) => setProject({ ...project, projectName: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:ring-2 focus:ring-brandPrimary text-white"
          placeholder="Enter project name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
        <textarea
          value={project.projectDescription}
          onChange={(e) => setProject({ ...project, projectDescription: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:ring-2 focus:ring-brandPrimary text-white h-52 no-scrollbar"
          placeholder="Describe your project"
        />
      </div>
    </div>
  );
};

export default ProjectInfoStep;
