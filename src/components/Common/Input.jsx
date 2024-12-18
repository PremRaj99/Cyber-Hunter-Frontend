// import React from 'react';

export default function Input() {
  return (
    <input
      type="text" className="mt-1 block w-full rounded-md border border-cyan-400/50 bg-black/50 px-4 py-2 text-white shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition duration-300 hover:border-cyan-300"
      placeholder="Enter your Project Name"
      required
    />
  );
}
