import { motion } from 'framer-motion';
import { GitBranch, Users, GanttChart, Award } from 'lucide-react';
import { useContext } from 'react';
import { TeamContext } from '../../../context/TeamContext';

const TeamTabs = () => {
  const { activeTab, setActiveTab } = useContext(TeamContext);

  const tabs = [
    { id: 'overview', icon: Users, label: 'Overview' },
    { id: 'members', icon: GitBranch, label: 'Members' },
    { id: 'projects', icon: GanttChart, label: 'Projects' },
    { id: 'achievements', icon: Award, label: 'Achievements' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === tab.id
            ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/50'
            : 'bg-gray-700/50 text-gray-400 border border-gray-700 hover:bg-gray-700'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <tab.icon size={18} />
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
};

export default TeamTabs;
