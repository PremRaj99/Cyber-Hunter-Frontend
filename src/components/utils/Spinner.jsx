/* eslint-disable react/prop-types */
// import React from "react";

export default function Spinner({ size = "md" }) {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-4",
  };

  const sizeClass = sizes[size] || sizes.md;

  return (
    <div className={`${sizeClass} border-t-transparent border-cyan-400 rounded-full animate-spin`}></div>
  );
}
