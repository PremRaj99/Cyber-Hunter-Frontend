import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export default function ProjectCard() {
  return (
    <div className="bg-gray-800 p-2 m-2 rounded-md">
      <div className="flex gap-2">
        <img
          src="https://plus.unsplash.com/premium_photo-1683288662019-c92caea8276d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-56 aspect-[16/9] object-cover rounded-md"
          alt="Thumbnail"
        />
        <div className="flex-1 text-sm">
          <h3 className="text-lg font-semibold text-[#00D8FF]">Project Name</h3>
          <p className="text-sm">
            Points: <span className="text-green-500">69</span>
          </p>
          <div className="flex hover:text-white cursor-pointer items-center mt-4 mb-2 gap-2">
            <FaGithub className="text-black text-lg" />
            <p>GitHub</p>
          </div>
          <div className="flex hover:text-white cursor-pointer items-center gap-2">
            <FaExternalLinkAlt className="text-red-600" />
            <p>Live</p>
          </div>
        </div>
      </div>
      <p className="text-sm mt-2">
        TeamSync is an all-in-one project management and team collabora platform
        designed to streamline workflows, TeamSync is an all-in-one project
        management...
        <span className="text-blue-500 hover:underline cursor-pointer">see more</span>
      </p>
    </div>
  );
}
