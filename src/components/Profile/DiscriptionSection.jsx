import React from "react";

export default function DiscriptionSection() {
    const skill = ["Frontend", "Backend", "DBMS", "Security", "DevOps"]
  return (
    <div className="w-full h-full flex justify-between gap-10 p-2">
      <p className="w-[100ch] text-gray-400">
        TeamSync is designed to adapt to your workflow, making it easier to
        manage projects and collaborate with your team, no matter where they
        are. With a user-friendly interface and powerful features, TeamSync
        helps you stay and achieve your goals... <span className="text-blue-500 hover:underline cursor-pointer">see more</span>
      </p>
      <div className="w-96 flex-wrap flex justify-center gap-4 items-start text-[#00D8FF]">
        {skill && skill.map((skill, index) => (
            <div key={index} className="p-1 cursor-pointer ">#{skill}</div>
        ))}
            <div className="p-1 rounded-md border-2 border-gray-800 cursor-pointer hover:bg-gray-700">+5 more</div>
      </div>
    </div>
  );
}
