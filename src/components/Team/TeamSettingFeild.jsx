


export default function TeamSettingFeild() {
  const frontendSkills = Array(9).fill("#frontend");

  return (
    <div className=" bg-gradient-to-b p-4 md:p-2">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Field of Excellence Section */}
        <div className="relative rounded-lg bg-gray-800/50 p-6">
          <h3 className="mb-4 text-lg font-medium text-cyan-400">
            Field of Excellence
          </h3>
          <p className="text-white">
            TeamSync is designed to adapt to your workflow, making it easier to
            manage projects and collaborate with your team, no matter where they
            are. With a user-friendly interface and powerful features, TeamSync
            helps you stay organized, meet deadlines, and achieve your goals.
          </p>
          <button className="absolute right-4 top-4 text-cyan-400 hover:text-cyan-300">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>

        {/* Skills Section */}
        <div className="relative rounded-lg bg-gray-800/50 p-6">
          <h3 className="mb-4 text-lg font-medium text-cyan-400">Skills</h3>
          <div className="grid grid-cols-3 gap-3">
            {frontendSkills.map((skill, index) => (
              <span
                key={index}
                className="rounded bg-gray-700/50 px-3 py-1 text-sm text-white"
              >
                {skill}
              </span>
            ))}
          </div>
          <button className="absolute right-4 top-4 text-cyan-400 hover:text-cyan-300">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>

        {/* Technology Stack */}
        <div className="relative rounded-lg bg-gray-800/50 p-6">
          <div className="grid grid-cols-4 gap-8 md:grid-cols-6 lg:grid-cols-10">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Java"
              className="h-10 w-10"
            />
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="HTML5"
              className="h-10 w-10"
            />
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="JavaScript"
              className="h-10 w-10"
            />
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Docker"
              className="h-10 w-10"
            />
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="React"
              className="h-10 w-10"
            />
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Node.js"
              className="h-10 w-10"
            />
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="MongoDB"
              className="h-10 w-10"
            />
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Next.js"
              className="h-10 w-10"
            />
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Git"
              className="h-10 w-10"
            />
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="CSS"
              className="h-10 w-10"
            />
          </div>
          <button className="absolute right-4 top-4 text-cyan-400 hover:text-cyan-300">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
