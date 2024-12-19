// import React from 'react';

export default function Button({ type, onClick, children, disabled, rounded, width,background }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-${width} rounded-${rounded} bg-${background} bg-cyan-400 py-2 px-4 text-black font-semibold hover:bg-black transition duration-300 hover:border-2 hover:border-brandPrimary hover:text-brandPrimary`}
    >
      {children}
    </button>
  );
}
