import React from "react";

export default function ProfileListItem({ isLeader, name, rank }) {
  const getColor = (rank) => {
    if (rank === 1) return "gold";
    if (rank === 2) return "silver";
    if (rank === 3) return "#CD7F32";
    if (rank >= 4 && rank <= 30) return "#00D8FF";
    return "#152278";
  };

  const color = getColor(rank);
  return (
    <div className="flex -skew-x-12">
      <div className="h-6 w-[80%] border-b flex gap-4 px-2 text-sm bg-black bg-opacity-50" style={{ borderColor: color }}>
        <h4 className={`text-sm font-mono text-center ${isLeader && "text-[#00d9ffc4]"}`}>{name}</h4>
      </div>
      <div className={`w-[20%] text-xs text-black`} style={{ backgroundColor: color }}>
        <p className="text-center">
          <span className="font-bold text-red-700 text-sm">{rank} </span>rank
        </p>
      </div>
    </div>
  );
}
