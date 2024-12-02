// import React from "react";
import RankBadge from "../Input/RankBadge";
import ProfileListItem from "./ProfileListItem";

export default function TeamProfileSection() {
  return (
    <div className="w-full p-4 max-h-[560px] h-[560px] relative flex flex-col items-center justify-center space-y-4 max-w-md mx-auto">
      {/* Rank Badge positioned absolutely on large screens, relatively on smaller screens */}
      <div className="absolute top-4 left-4">
        <RankBadge />
      </div>

      {/* Profile Image with responsive sizing */}
      <img
        src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full shadow-md shadow-brandPrimary border border-gray-700"
        alt="Team Profile"
      />

      {/* Team Name with responsive text */}
      <h2 className="text-xl sm:text-2xl text-[#00D8FF] font-semibold text-center">
        Ideal Bits
      </h2>

      {/* Points with responsive sizing */}
      <div className="text-gray-300 text-xs cursor-pointer" title="3000 points">
        <span className="text-green-500 text-base sm:text-lg font-semibold">
          3000
        </span>{" "}
        Pts
      </div>

      {/* Profile List with responsive width and padding */}
      <div className="w-full max-w-md px-4 sm:px-0 py-2 rounded-md text-gray-300">
        <div className="space-y-2">
          <ProfileListItem isLeader={true} name={"Prem Raj"} rank={1} />
          <ProfileListItem name={"Ankit Kumar"} rank={5} />
          <ProfileListItem name={"Naman Kumar"} rank={3} />
          <ProfileListItem name={"Yash Rana"} rank={202} />
          <ProfileListItem name={"Himanshu Haldar"} rank={2} />
          <ProfileListItem name={"Ashu Ayush"} rank={100} />
        </div>
      </div>

      {/* Social Icons with responsive layout and sizing */}
      <div className="flex items-center justify-center gap-4 w-full px-4">
        {[
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s",
            alt: "Social Icon 1",
          },
          {
            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/800px-Instagram_logo_2022.svg.png",
            alt: "Instagram",
          },
          {
            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png",
            alt: "GitHub",
            className: "bg-gray-300 rounded-full",
          },
          {
            src: "https://freepnglogo.com/images/all_img/1691832581twitter-x-icon-png.png",
            alt: "Twitter/X",
          },
        ].map((icon, index) => (
          <img
            key={index}
            src={icon.src}
            alt={icon.alt}
            className={`w-7 h-7 sm:w-8 sm:h-8 object-cover hover:scale-105 cursor-pointer ${
              icon.className || ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
