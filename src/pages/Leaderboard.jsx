// import React from 'react';
import Leaderboardmain from "../components/leaderboard/Leaderboardmain";
import { useEffect } from "react";

export default function Leaderboard() {

  useEffect(() => {
    document.title = "Cyber Hunter | Leaderboard";
  }
  , []);

  return (
    <div>
      <Leaderboardmain />
    </div>
  );
}
