// import React from "react";
import { useEffect } from "react";
import ProfileDash from "../components/Profile/ProfileDash";

export default function Profile() {

  useEffect(() => {
    document.title = `Cyber Hunter | Profile`;
  }, []);

  return (
    <div className="max-h-[calc(100vh-8rem)]">
      <ProfileDash />
    </div>
  );
}
