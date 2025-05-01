import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ProjectEditContext } from '../../pages/EditProject';
import { TeamProjectEditContext } from '../../pages/EditTeamProject';

export default function ProjectSidebar() {
  // Try both contexts
  const projectContext = useContext(ProjectEditContext);
  const teamContext = useContext(TeamProjectEditContext);

  // Use whichever context is available
  const context = projectContext || teamContext;

  if (!context) {
    return (
      <div className="col-span-3 bg-gray-900/50 rounded-xl p-6 border border-gray-700">
        <p className="text-red-400">Error: Context not available</p>
      </div>
    );
  }

  const { activeSection, setActiveSection, saving, handleSave } = context;

  const sections = [
    { id: "main", label: "Main Info" },
    { id: "details", label: "Details" },
    { id: "images", label: "Images" },
    { id: "links", label: "Links" },
  ];

  return (
    <div className="col-span-12 md:col-span-3">
      <div className="bg-gray-900/50 rounded-xl p-4 md:p-6 border border-gray-700 sticky top-24">
        <h3 className="text-xl font-semibold text-white mb-6">Project Sections</h3>

        <nav className="mb-8">
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${activeSection === section.id
                      ? "bg-cyan-500/20 text-cyan-400 border-l-4 border-cyan-400"
                      : "hover:bg-gray-800 text-gray-300"
                    }`}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <motion.button
          onClick={handleSave}
          disabled={saving}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-medium transition-all ${saving ? "opacity-70 cursor-wait" : ""
            }`}
          whileHover={{ scale: saving ? 1 : 1.02 }}
          whileTap={{ scale: saving ? 1 : 0.98 }}
        >
          {saving ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></span>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </motion.button>
      </div>
    </div>
  );
}
