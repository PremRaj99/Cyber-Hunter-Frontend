import React from "react";
import RankBadge from "../RankBadge";

export default function ProfileSection() {
  return (
    <div className="w-full p-4 h-full relative flex flex-col gap-2 items-center">
      <div className="absolute left-2 ">
        <RankBadge />
      </div>
      <div className="absolute right-2 top-4">
        <div
          className="text-gray-300 text-xs cursor-pointer"
          title="3000 points"
        >
          <span className="text-green-500 text-lg font-semibold">3000</span> Pts
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-28 h-28 object-cover rounded-full shadow-md shadow-gray-600 border border-gray-700"
        alt=""
      />
      <h2 className="text-2xl text-[#00D8FF] font-semibold">Prem Raj</h2>
      <div className="flex justify-between gap-8 text-gray-300">
        <div className="">
            <p>Username</p>
            <p>Course</p>
            <p>Branch</p>
            <p>Session</p>
            <p>Q-Id</p>
            <p>Gender</p>
        </div>
        <div className="text-white">
            <p>PremRaj_2004</p>
            <p>B.Tech</p>
            <p>CSE</p>
            <p>2022-26</p>
            <p>22030404</p>
            <p>Male</p>
        </div>
      </div>
      <div className="flex mt-4 items-center gap-4">
        <img className="w-8 h-8 object-cover hover:scale-105 cursor-pointer rounded-md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s" alt="" />
        <img className="w-8 h-8 object-cover hover:scale-105 cursor-pointer" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/800px-Instagram_logo_2022.svg.png" alt="" />
        <img className="w-8 h-8 object-cover hover:scale-105 cursor-pointer bg-gray-300 rounded-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png" alt="" />
        <img className="w-8 h-8 object-cover hover:scale-105 cursor-pointer" src="https://freepnglogo.com/images/all_img/1691832581twitter-x-icon-png.png" alt="" />
      </div>
    </div>
  );
}
