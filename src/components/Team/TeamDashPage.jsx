// import React from "react";


import TeamProfileSection from "./TeamProfileSection";

export default function TeamDashPage() {
  const technologies = [
    "Java",
    "HTML",
    "JS",
    "React",
    "Node.js",
    "MongoDB",
    "CSS",
    "Next.js",
    "Solidity",
    "Python",
    "Django",
    "Flask",
    "C++",
    "C#",
    "Unity",
    "AI",
    "ML",
    "Firebase",
    "AWS",
    "Azure",
    "GCP",
    "DevOps",
    "Blockchain",
    "Cyber Security",
  ];

  return (
    <div className="min-h-screen text-white p-4">
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Project Cards */}
          <div className="h-[450px] md:h-[480px] p-2 rounded-2xl overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-cyan-400">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-gray-800 rounded-xl p-4 shadow-lg mb-4 last:mb-0"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-35 bg-navy-900 rounded-lg flex items-center justify-center text-sm">
                    <img
                      src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Project"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-cyan-400 text-lg font-semibold">
                      TeamSync
                    </h3>
                    <p className="text-gray-400 text-sm">
                      points : {item === 1 ? "50" : "60"}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        GitHub
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        Live
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">
                      TeamSync is an all-in-one project management and team
                      collaboration platform designed to streamline workflows.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Field of Excellence */}
          <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
            <h3 className="text-cyan-400 text-lg font-semibold mb-3">
              Field of Excellence
            </h3>
            <p className="text-sm text-gray-300">
              TeamSync is designed to adapt to your workflow, making it easier
              to manage projects and collaborate with your team, no matter where
              they are. With a user-friendly interface and powerful features,
              TeamSync helps you stay organized, meet deadlines, and achieve
              your goals.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Badges */}
          <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
            <div className="flex flex-wrap justify-center gap-4">
              {["gold", "green", "purple", "silver", "orange", "cyan"].map(
                (color, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 rounded-full border-2 ${
                      color === "gold"
                        ? "border-yellow-400 bg-yellow-400/20"
                        : color === "green"
                        ? "border-green-400 bg-green-400/20"
                        : color === "purple"
                        ? "border-purple-400 bg-purple-400/20"
                        : color === "silver"
                        ? "border-gray-400 bg-gray-400/20"
                        : color === "orange"
                        ? "border-orange-400 bg-orange-400/20"
                        : "border-cyan-400 bg-cyan-400/20"
                    } flex items-center justify-center`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-700/50"></div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Code Builder and Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/*team profile section */}
            <div className="flex-[5] rounded-md bg-gray-800 ">
              <TeamProfileSection />
            </div>

            {/* Tech Stack */}
            <div className="max-h-[560px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-cyan-400">
              <div className="grid grid-cols-4 gap-2">
                {technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gray-700 rounded-xl flex items-center justify-center text-xs"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
        {["Frontend", "Backend", "DBMS", "AI / ML", "Security", "DevOps"].map(
          (category) => (
            <button
              key={category}
              className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg py-2 px-4 transition-colors"
            >
              {category}
            </button>
          )
        )}
      </div>
    </div>
  );
}
