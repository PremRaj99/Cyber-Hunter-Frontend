const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["basic", "education", "social"];

  return (
    <div className="mb-6 border-b border-gray-700">
      <div className="flex space-x-1 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-4 text-sm font-medium capitalize transition-all duration-300 ${activeTab === tab
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "text-gray-400 hover:text-white"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
