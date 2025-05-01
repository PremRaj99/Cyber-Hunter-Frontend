/* eslint-disable react/prop-types */
// Collection of UI state components used in TeamManageSettings

export const TeamLoadingState = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
  </div>
);

export const TeamErrorState = ({ error, navigate }) => (
  <div className="flex flex-col justify-center items-center h-screen text-center p-4">
    <h3 className="text-xl text-red-500 mb-4">{error}</h3>
    <button
      className="px-6 py-3 rounded-xl bg-gradient-to-r bg-cyan-400 text-black font-medium transition-colors cursor-pointer flex items-center space-x-2 hover:bg-black hover:text-cyan-400 hover:border hover:border-cyan-400"
      onClick={() => navigate('/dashboard/team/create')}
    >
      Create or Join a Team
    </button>
  </div>
);

export const TeamNoTeamState = ({ navigate }) => (
  <div className="flex flex-col justify-center items-center h-screen text-center p-4">
    <h3 className="text-xl text-yellow-500 mb-4">You don&apos;t belong to any team</h3>
    <button
      className="px-6 py-3 rounded-xl bg-gradient-to-r bg-cyan-400 text-black font-medium transition-colors cursor-pointer flex items-center space-x-2 hover:bg-black hover:text-cyan-400 hover:border hover:border-cyan-400"
      onClick={() => navigate('/dashboard/team/create')}
    >
      Create or Join a Team
    </button>
  </div>
);

export const TeamNoPermissionState = ({ userStatus, navigate }) => (
  <div className="flex flex-col justify-center items-center h-screen text-center p-4">
    <h3 className="text-xl text-red-500 mb-4">
      {userStatus === 'noPermission'
        ? "You don't have permission to view this team's settings"
        : "Team not found"}
    </h3>
    <div className="flex gap-4">
      <button
        className="px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500"
        onClick={() => navigate('/dashboard/team')}
      >
        My Team Dashboard
      </button>
      <button
        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
        onClick={() => navigate('/dashboard/team/create')}
      >
        Browse Teams
      </button>
    </div>
  </div>
);
