// import React from "react";

export default function RankBadge() {
  return (
    <div>
      <div className="flex flex-col items-center text-gray-400 text-xs cursor-pointer" title="Rank">
        <div className="relative">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/015/153/253/small_2x/ranking-badges-png.png"
            alt=""
            className="h-16 aspect-auto"
          />
          <div className="absolute top-3 text-center w-full -translate-x-[2px] text-xs font-bold text-red-600">
            1000
          </div>
        </div>
        <p>Rank</p>
      </div>
    </div>
  );
}
