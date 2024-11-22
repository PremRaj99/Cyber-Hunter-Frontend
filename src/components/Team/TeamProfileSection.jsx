// import React from "react";
import RankBadge from "../RankBadge";
import ProfileListItem from "./ProfileListItem";

export default function TeamProfileSection() {
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
      <h2 className="text-2xl text-[#00D8FF] font-semibold">Ideal Bits</h2>
      <div className="flex flex-col justify-between gap-2 w-96 text-gray-300">
        <ProfileListItem isLeader={true} name={"Prem Raj"} rank={1} />
        <ProfileListItem name={"Woh jiska naam nhi le shakte"} rank={5} />
        <ProfileListItem name={"Naman Kumar"} rank={3} />
        <ProfileListItem name={"Yash Rana"} rank={202} />
        <ProfileListItem name={"Himanshu Haldar"} rank={2} />
        <ProfileListItem name={"Ashu Ayush"} rank={100} />
      </div>
      <div className="flex mt-2 items-center gap-4">
        <img
          className="w-8 h-8 object-cover hover:scale-105 cursor-pointer rounded-md"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s"
          alt=""
        />
        <img
          className="w-8 h-8 object-cover hover:scale-105 cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/800px-Instagram_logo_2022.svg.png"
          alt=""
        />
        <img
          className="w-8 h-8 object-cover hover:scale-105 cursor-pointer bg-gray-300 rounded-full"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png"
          alt=""
        />
        <img
          className="w-8 h-8 object-cover hover:scale-105 cursor-pointer"
          src="https://freepnglogo.com/images/all_img/1691832581twitter-x-icon-png.png"
          alt=""
        />
      </div>
    </div>
  );
}
